print("DEBUG: Start of file", flush=True)
import os
import json
import feedparser
from google import genai
from google.genai.errors import ClientError
from datetime import datetime
import time
import random
import traceback
import re
from urllib.parse import urlparse
import requests
import overseer

# Configuration
RSS_FEEDS = [
    "https://feeds.feedburner.com/TheHackersNews",
    "https://www.bleepingcomputer.com/feed/",
    "https://krebsonsecurity.com/feed/"
]
BLOG_DATA_PATH = "../src/data/blog_posts.json"
TOPICS_DATA_PATH = "../src/data/topics.json"

# Educational Topics for "Blog" days
BLOG_TOPICS = [
    "The Importance of Zero Trust Architecture",
    "How Phishing Attacks Are Evolving in 2025",
    "Understanding SQL Injection (and How to Fix It)",
    "Why Multi-Factor Authentication (MFA) is Non-Negotiable",
    "The Role of AI in Modern Cybersecurity",
    "Top 5 Privacy Tips for Remote Workers",
    "What is Ransomware and How to Prevent It",
    "Secure Coding Best Practices for Web Developers",
    "Understanding the OWASP Top 10",
    "The Basics of Cryptography: Symmetric vs Asymmetric"
]

# MODEL CONFIGURATION
MODELS_TO_TRY = [
    'models/gemini-2.5-flash',
    'models/gemini-2.0-flash',
    'models/gemini-flash-latest',
]

API_RETRY_DELAY = 15  # seconds between API calls to avoid rate limits

def load_env():
    """Load .env file manually"""
    try:
        env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
        if os.path.exists(env_path):
            with open(env_path, 'r') as f:
                for line in f:
                    if line.strip() and not line.startswith('#'):
                        if '=' in line:
                            key, value = line.strip().split('=', 1)
                            os.environ[key] = value
    except Exception as e:
        print(f"Warning: Could not load .env file: {e}")

def setup_gemini():
    """Setup Gemini client and find working model"""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ Error: GEMINI_API_KEY environment variable not set.")
        return None, None
    
    print("🔧 Setting up Gemini API client...")
    
    # Try different API versions and models
    for api_version in ['v1alpha', 'v1']:
        try:
            client = genai.Client(
                api_key=api_key, 
                http_options={'api_version': api_version}
            )
            
            # Test each model
            for model in MODELS_TO_TRY:
                try:
                    print(f"   Testing {api_version} with {model}...")
                    test_response = client.models.generate_content(
                        model=model,
                        contents='Reply OK'
                    )
                    print(f"✅ Successfully connected: API={api_version}, Model={model}")
                    return client, model
                except ClientError as e:
                    if e.status_code == 429:
                        print(f"⚠️  Rate limited or quota exceeded. Try again later.")
                        return None, None
                    print(f"   {model} failed: {str(e)[:50]}")
                except Exception as e:
                    print(f"   {model} failed: {str(e)[:50]}")
        except Exception as e:
            print(f"   API version {api_version} failed: {str(e)[:50]}")
    
    print("❌ Could not initialize Gemini client with any configuration")
    return None, None

def get_blog_data():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, BLOG_DATA_PATH)
        
        with open(file_path, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Warning: Could not load blog data: {e}")
        return []

def save_blog_data(data):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, BLOG_DATA_PATH)
    
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"💾 Saved data to {file_path}")

def get_topics():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, TOPICS_DATA_PATH)
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"⚠️ Could not load topics: {e}")
        return []

def save_topics(topics):
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, TOPICS_DATA_PATH)
        with open(file_path, 'w') as f:
            json.dump(topics, f, indent=2)
        print(f"💾 Updated topics list ({len(topics)} remaining)")
    except Exception as e:
        print(f"❌ Error saving topics: {e}")

def refill_topics(client, model):
    print("🔄 Refilling topics list via AI...")
    prompt = """Generate 15 NEW, unique, and engaging cybersecurity blog topics for a technical audience.
    Topics should cover: AI Security, Cloud Security, Ethical Hacking, Privacy, and Blue Team defense.
    Return ONLY a raw JSON list of strings. No markdown."""
    
    content, error = safe_api_call(client, model, prompt, "refill topics")
    if error:
        return []
        
    try:
        content = content.replace('```json', '').replace('```', '').strip()
        new_topics = json.loads(content)
        return new_topics
    except Exception as e:
        print(f"❌ Error parsing generated topics: {e}")
        return []

def check_daily_limit(data):
    """Returns True if a post has already been generated today."""
    today = datetime.now().strftime("%Y-%m-%d")
    for post in data:
        if post.get('date') == today:
            return True
    return False

def is_news_streak(data):
    """Checks if the last 2 posts were of type 'News'."""
    if len(data) < 2:
        return False
    
    last_1 = data[-1]
    last_2 = data[-2]
    
    return last_1.get('type') == 'News' and last_2.get('type') == 'News'

def sanitize_text(text):
    """Remove HTML tags and potential control characters."""
    if not text:
        return ""
    # Remove HTML tags
    clean = re.sub('<.*?>', '', text)
    # Remove non-printable characters (basic check)
    clean = "".join(ch for ch in clean if ch.isprintable())
    return clean.strip()

def validate_url(url):
    """Ensure URL is valid, uses http/https, and is reachable (200 OK)."""
    if not url or url == '#':
        return "#"
    
    try:
        # 1. Syntax Check
        parsed = urlparse(url)
        if not (parsed.scheme in ['http', 'https'] and parsed.netloc):
            return "#"

        # 2. Reachability Check (HEAD request first, then GET)
        print(f"      🔎 Verifying link: {url[:50]}...", end='', flush=True)
        headers = {'User-Agent': 'Mozilla/5.0 (compatible; SecurityBlogBot/1.0)'}
        
        try:
            resp = requests.head(url, headers=headers, timeout=5, allow_redirects=True)
            if resp.status_code < 400:
                print(" OK")
                return url
        except requests.RequestException:
            pass # Fallback to GET
            
        # Fallback to GET if HEAD fails (some servers block HEAD)
        resp = requests.get(url, headers=headers, timeout=5, stream=True)
        if resp.status_code < 400:
            print(" OK")
            return url
            
        print(f" ❌ Dead link ({resp.status_code})")
        return "#"

    except Exception as e:
        print(f" ❌ Error: {str(e)[:20]}")
        return "#"

def fetch_rss_items():
    items = []
    print("\n📰 Fetching news from feeds...")
    for url in RSS_FEEDS:
        try:
            feed = feedparser.parse(url)
            if feed.entries:
                for entry in feed.entries[:2]:
                    title = sanitize_text(entry.title)
                    link = validate_url(entry.link)
                    summary = sanitize_text(entry.summary if 'summary' in entry else entry.get('description', ''))
                    source = sanitize_text(feed.feed.title if 'title' in feed.feed else url)
                    
                    if link != "#": # Only add if link is valid
                        items.append({
                            "title": title,
                            "link": link,
                            "summary": summary,
                            "source": source
                        })
                print(f"   ✓ Fetched {len(feed.entries[:2])} items from {feed.feed.get('title', url)}")
        except Exception as e:
            print(f"   ✗ Error fetching {url}: {e}")
    print(f"📊 Total items fetched: {len(items)}")
    return items

def safe_api_call(client, model, prompt, operation_name):
    """Make an API call with error handling"""
    try:
        response = client.models.generate_content(
            model=model,
            contents=prompt
        )
        return response.text.strip(), None
    except ClientError as e:
        if e.status_code == 429:
            error_msg = f"Rate limit/quota exceeded for {operation_name}"
            print(f"⚠️  {error_msg}")
            return None, error_msg
        error_msg = f"API error in {operation_name}: {str(e)[:100]}"
        print(f"❌ {error_msg}")
        return None, error_msg
    except Exception as e:
        error_msg = f"Unexpected error in {operation_name}: {str(e)[:100]}"
        print(f"❌ {error_msg}")
        return None, error_msg

def analyze_criticality(client, model, news_item):
    """Returns (is_critical, reason)"""
    prompt = f"""Analyze if this security news is "CRITICAL".
CRITICAL means: Zero-day exploitation, massive breach (>1M users), or critical infrastructure attack.

Title: {news_item['title']}
Summary: {news_item['summary'][:500]}

Reply: YES/NO because <Reason>"""
    
    result, error = safe_api_call(client, model, prompt, "criticality analysis")
    if error:
        return False, error
    
    is_critical = result.upper().startswith("YES")
    return is_critical, result

def generate_news_post(client, model, news_item):
    """Generate news post content"""
    print(f"📝 Generating NEWS post for: {news_item['title'][:50]}...")
    
    prompt = f"""You are a cybersecurity expert writing for a technical audience.
Write a short update (approx 200 words) about this event.

Event: {news_item['title']}
Context: {news_item['summary'][:500]}
Source: {news_item['source']}

Requirements:
- No markdown formatting (no bold/headers).
- Concisely explain the impact.
- Professional, "raw" tone."""
    
    content, error = safe_api_call(client, model, prompt, "news post generation")
    return content if content else f"Error generating content: {error}"

def filter_unique_topics(client, model, candidates, existing_posts):
    """
    Uses LLM to filter out candidates that are semantically similar to existing posts.
    Returns a list of unique candidates.
    """
    if not candidates:
        return []

    # Get last 20 titles for context
    recent_titles = [p['title'] for p in existing_posts[-20:]]
    candidate_titles = [c['title'] for c in candidates]

    print(f"🧠 Checking {len(candidates)} candidates against {len(recent_titles)} recent posts for similarity...")

    prompt = f"""You are a content curator. I have a list of 'Candidate Topics' and a list of 'Recent Existing Topics'.
Identify which Candidate Topics are NEW and NOT semantically similar to the Recent Existing Topics.

- "Phishing via AI" IS similar to "AI-driven Social Engineering" (Reject).
- "SQL Injection" is NOT similar to "XSS Attacks" (Keep).

Recent Existing Topics:
{json.dumps(recent_titles, indent=1)}

Candidate Topics:
{json.dumps(candidate_titles, indent=1)}

Return a JSON list of the titles from 'Candidate Topics' that are unique enough to likely be interesting.
Example Output: ["Title 1", "Title 3"]
"""

    result, error = safe_api_call(client, model, prompt, "topic deduping")
    if error:
        print("⚠️ Deduping failed, proceeding with all candidates.")
        return candidates

    try:
        # cleanup markdown json
        result = result.replace('```json', '').replace('```', '').strip()
        unique_titles = json.loads(result)
        
        # Filter the original objects
        unique_candidates = [c for c in candidates if c['title'] in unique_titles]
        print(f"📉 Filtered duplicates: {len(candidates)} -> {len(unique_candidates)}")
        return unique_candidates
    except Exception as e:
        print(f"⚠️ JSON parse error in deduping: {e}")
        return candidates

def generate_educational_blog(client, model, existing_posts):
    """Generate educational blog post using dynamic topics list"""
    
    # 1. Load Topics
    topics = get_topics()
    
    # 2. Refill if low
    if len(topics) < 3:
        print("⚠️ Topics running low. Generating more...")
        new_topics = refill_topics(client, model)
        if new_topics:
            topics.extend(new_topics)
            save_topics(topics)
            
    # 3. Filter against existing posts (Double check)
    # Even if we pull from the list, we want to make sure we haven't written about it recently
    # (in case the topic list has overlaps with old posts)
    unique_topics_subset = filter_unique_topics(client, model, [{'title': t} for t in topics[:10]], existing_posts)
    
    if unique_topics_subset:
        topic_title = unique_topics_subset[0]['title']
    elif topics:
        topic_title = topics[0] # Fallback to first available
    else:
         topic_title = "The Future of Cybersecurity AI" # Ultimate fallback
         
    print(f"📚 Generating EDUCATIONAL BLOG post about: {topic_title}")
    
    prompt = f"""Write a short educational blog post (250 words) about: {topic_title}.
Audience: General tech users.
Tone: Informative, helpful.
Requirements: No markdown headers."""
    
    content, error = safe_api_call(client, model, prompt, "blog post generation")
    
    # 4. Remove used topic from list (Consumption)
    # We remove the exact string or close match
    if topic_title in topics:
        topics.remove(topic_title)
        save_topics(topics)
    
    return {
        "title": topic_title,
        "content": content if content else f"Error generating content: {error}",
        "type": "Blog"
    }

def main():
    print("DEBUG: Inside main", flush=True)
    print("=" * 60)
    print("🚀 Blog Post Generator Starting")
    print("=" * 60)
    
    # Load environment
    load_env()
    
    # Load existing data
    data = get_blog_data()
    print(f"\n📊 Loaded {len(data)} existing posts")

    # Check daily limit
    if check_daily_limit(data):
        print("✋ Daily limit reached. A post was already generated today.")
        return

    # Setup API client
    client, model = setup_gemini()
    if not client or not model:
        print("\n❌ Cannot proceed without API client. Exiting.")
        print("💡 Possible solutions:")
        print("   1. Wait 24 hours if you hit your quota")
        print("   2. Check your API key at https://aistudio.google.com/apikey")
        print("   3. Verify billing is set up")
        return

    # Fetch news candidates
    candidates = fetch_rss_items()
    
    candidate_titles = [item['title'] for item in candidates]
    existing_titles = {post['title'] for post in data}
    
    # 1. Exact Match Filter
    new_candidates = [item for item in candidates if item['title'] not in existing_titles]
    
    # 2. Semantic Filter (Deduping)
    if new_candidates:
         new_candidates = filter_unique_topics(client, model, new_candidates, data)
    
    if len(new_candidates) < len(candidates):
        print(f"ℹ️  Skipped {len(candidates) - len(new_candidates)} duplicate/similar news items")
    
    candidates = new_candidates
    
    # Check for CRITICAL news
    critical_item = None
    if candidates:
        print("\n🔍 Analyzing for critical news...")
        for i, item in enumerate(candidates[:3], 1):  # Only check first 3 to save quota
            print(f"   Analyzing item {i}/{min(3, len(candidates))}: {item['title'][:50]}...")
            is_crit, reason = analyze_criticality(client, model, item)
            
            if is_crit:
                print(f"🚨 CRITICAL NEWS FOUND: {item['title']}")
                critical_item = item
                break
            
            # Rate limiting between calls
            if i < min(3, len(candidates)):
                print(f"   ⏳ Waiting {API_RETRY_DELAY}s to respect rate limits...")
                time.sleep(API_RETRY_DELAY)

    # Generate new post based on priority
    new_post = None

    if critical_item:
        # Priority 1: Critical News
        print("\n🚨 Priority: CRITICAL NEWS")
        content = generate_news_post(client, model, critical_item)
        new_post = {
            "title": critical_item['title'],
            "date": datetime.now().strftime("%Y-%m-%d"),
            "type": "News",
            "content": content,
            "source": critical_item.get('link', '#')
        }
    else:
        # Priority 2: Check streak
        is_streak = is_news_streak(data)
        if is_streak:
            print("\n📚 Priority: EDUCATIONAL BLOG (breaking news streak)")
            new_post_data = generate_educational_blog(client, model, data)
            new_post = {
                "title": new_post_data['title'],
                "date": datetime.now().strftime("%Y-%m-%d"),
                "type": "Blog",
                "content": new_post_data['content']
            }
        elif candidates:
            # Priority 3: Regular news
            print("\n📰 Priority: REGULAR NEWS")
            item = candidates[0]
            content = generate_news_post(client, model, item)
            new_post = {
                "title": item['title'],
                "date": datetime.now().strftime("%Y-%m-%d"),
                "type": "News",
                "content": content,
                "source": item.get('link', '#')
            }
        else:
            # Fallback: Educational blog
            print("\n📚 Priority: EDUCATIONAL BLOG (no news available)")
            new_post_data = generate_educational_blog(client, model, data)
            new_post = {
                "title": new_post_data['title'],
                "date": datetime.now().strftime("%Y-%m-%d"),
                "type": "Blog",
                "content": new_post_data['content']
            }

    # Save new post
    if new_post:
        # Perform QA Check via Overseer
        print("\n🕵️  Running QA Check via Overseer...")
        qa_passed, qa_result = overseer.check_content_quality(new_post)
        
        if not qa_passed:
            print(f"❌ QA Check Failed: {qa_result.get('reason', 'Unknown error')}")
            print(f"⚠️  Post discarded due to QA failure. (Strict Style Enforcement)")
            # Log failure to audit log explicitly if needed or rely on overseer's internal logging
            return

        print(f"✅ QA Check Passed: {qa_result.get('status')} - {qa_result.get('reason')}")

        new_post['id'] = len(data) + 1
        data.append(new_post)
        save_blog_data(data)
        print("\n✅ Successfully generated and saved new post!")
        print(f"   Title: {new_post['title']}")
        print(f"   Type: {new_post['type']}")
        print(f"   Date: {new_post['date']}")
    else:
        print("\n⚠️  No post generated")

    print("\n" + "=" * 60)
    print("🏁 Blog Post Generator Finished")
    print("=" * 60)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Script interrupted by user")
    except Exception as e:
        print(f"\n\n💥 CRASH: {e}")
        traceback.print_exc()