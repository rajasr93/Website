import os
import json
import datetime
from google import genai
from google.genai.errors import ClientError

# --- Configuration ---
BLOG_DATA_PATH = "../src/data/blog_posts.json"
RUN_LOG_PATH = "scripts/daily_run.log"
AUDIT_LOG_PATH = "scripts/audit.log"

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
    except Exception:
        pass

load_env()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def log_audit(message, status="INFO"):
    """Logs to audit file and prints to console."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"[{timestamp}] [{status}] {message}"
    print(entry)
    with open(AUDIT_LOG_PATH, "a") as f:
        f.write(entry + "\n")

# --- Module 1: System Health ---
def check_system_health():
    log_audit("Starting System Health Check...", "START")
    issues = []

    # 1. JSON Integrity
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, BLOG_DATA_PATH)
        with open(file_path, 'r') as f:
            data = json.load(f)
        log_audit(f"JSON Integrity Check: PASS ({len(data)} posts loaded)")
    except Exception as e:
        msg = f"JSON Integrity Check: FAIL - {str(e)}"
        log_audit(msg, "CRITICAL")
        issues.append(msg)
        return issues, None

    # 2. Log Analysis (Scan for CRITICAL errors)
    try:
        log_path = os.path.join(current_dir, "../", RUN_LOG_PATH)
        if os.path.exists(log_path):
            with open(log_path, 'r') as f:
                logs = f.read()
                if "CRASH" in logs or "CRITICAL" in logs:
                   # Check if it happened today
                   today = datetime.datetime.now().strftime("%Y-%m-%d")
                   if today in logs: 
                       msg = "Log Analysis: WARN - Critical errors detected in today's logs."
                       log_audit(msg, "WARN")
                       issues.append(msg)
    except Exception:
        pass # Log file might not exist yet

    return issues, data[-1] if data else None

# --- Module 2: Content QA ---
def check_content_quality(latest_post):
    if not latest_post:
        return
    
    log_audit(f"Starting Content QA for: '{latest_post.get('title')}'...", "START")

    if not GEMINI_API_KEY:
        log_audit("Skipping AI QA: GEMINI_API_KEY not set.", "WARN")
        return

    try:
        client = genai.Client(api_key=GEMINI_API_KEY, http_options={'api_version': 'v1alpha'})
        
        prompt = f"""
        Act as a strict Quality Assurance Editor for a cybersecurity blog.
        Your goal is to ensure content is "Raw, Authentic, and Industry-Specific" but accessible.
        
        Title: {latest_post.get('title')}
        Content: {latest_post.get('content')}
        Source: {latest_post.get('source', 'N/A')}

        CRITICAL CHECKS:
        1. **Authenticity**: Does it sound like a real person/hacker? Reject "corporate fluff" or generic AI buzzwords.
        2. **Terminology**: Does it use specific industry tools (e.g., 'nmap', 'Burp Suite', 'Metasploit') and CVE IDs where relevant? Reject generic terms like "cyber tools".
        3. **Style**: Simple, direct, no-nonsense. No "In the ever-evolving landscape..." intros.
        4. **Accuracy**: No hallucinations.

        Reply STRICTLY in JSON:
        {{
            "status": "PASS" | "WARN" | "FAIL",
            "reason": "Specific feedback on why it failed (e.g. 'Too corporate', 'Missing tool names') or 'Looks good'"
        }}
        """

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config={'response_mime_type': 'application/json'}
        )
        
        result = json.loads(response.text)
        status = result.get("status", "UNKNOWN")
        reason = result.get("reason", "No reason provided")

        log_audit(f"AI QA Result: {status} - {reason}", status)
        return status in ["PASS", "WARN"], result

    except Exception as e:
        log_audit(f"AI QA Failed: {str(e)}", "ERROR")
        return False, {"status": "ERROR", "reason": str(e)}

# --- Main Overseer Loop ---
if __name__ == "__main__":
    log_audit("Overseer Agent Awakened", "INIT")
    
    health_issues, latest_post = check_system_health()
    
    if not health_issues and latest_post:
        success, _ = check_content_quality(latest_post)
        if not success:
            exit(1)
    
    if health_issues:
        print("\n!!! OVERSEER ALERT !!!")
        for issue in health_issues:
            print(f"- {issue}")
        exit(1)
    
    log_audit("Overseer Sleep Sequence Initiated", "END")
