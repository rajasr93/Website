import os
import json
import feedparser
import google.generativeai as genai
from datetime import datetime

# Configuration
RSS_FEED_URL = "https://feeds.feedburner.com/TheHackersNews"  # Example feed
BLOG_DATA_PATH = "../src/data/blog_posts.json"  # Relative to scripts/ directory

def setup_gemini():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set.")
        return None
    genai.configure(api_key=api_key)
    return genai.GenerativeModel('gemini-pro')

def fetch_latest_news():
    print(f"Fetching news from {RSS_FEED_URL}...")
    feed = feedparser.parse(RSS_FEED_URL)
    if not feed.entries:
        print("No entries found in feed.")
        return None
    
    # Get the latest entry
    latest_entry = feed.entries[0]
    return {
        "title": latest_entry.title,
        "link": latest_entry.link,
        "summary": latest_entry.summary if 'summary' in latest_entry else latest_entry.description
    }

def generate_analysis(model, news_item):
    print(f"Generating analysis for: {news_item['title']}")
    
    prompt = f"""
    You are a cybersecurity expert writing for a simple, general audience.
    Write a short blog post (approx. 200-300 words) analysing the following security news item.
    
    Title: {news_item['title']}
    Original Summary: {news_item['summary']}
    
    Guidelines:
    1. Title the post catchy but accurate.
    2. Explain WHAT happened simply.
    3. Explain WHY it matters or what the impact is.
    4. Do not use complex jargon without explaining it.
    5. Keep it "raw" and direct, like a security researcher talking to a friend.
    
    Output format: Just the body text. Do not include a "Title:" prefix in the body.
    """
    
    response = model.generate_content(prompt)
    return response.text

def update_blog_json(new_post):
    try:
        with open(BLOG_DATA_PATH, 'r') as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    # Check if post with same title already exists (simple de-duplication)
    if any(post['title'] == new_post['title'] for post in data):
        print("Post already exists. Skipping.")
        return

    # Add new post
    new_post['id'] = len(data) + 1
    data.append(new_post)
    
    with open(BLOG_DATA_PATH, 'w') as f:
        json.dump(data, f, indent=2)
    print("Blog data updated successfully.")

def main():
    model = setup_gemini()
    if not model:
        return

    news_item = fetch_latest_news()
    if not news_item:
        return

    analysis = generate_analysis(model, news_item)
    
    new_post = {
        "title": news_item['title'], # Use original title or ask Gemini for one
        "date": datetime.now().strftime("%Y-%m-%d"),
        "type": "News", # Could successfully detect correct type if expanded
        "content": analysis
    }

    update_blog_json(new_post)

if __name__ == "__main__":
    main()
