import os
import json
import datetime
from google import genai
from google.genai.errors import ClientError
from dotenv import load_dotenv

# --- Configuration ---
BLOG_DATA_PATH = "../src/data/blog_posts.json"
RUN_LOG_PATH = "scripts/daily_run.log"
AUDIT_LOG_PATH = "scripts/audit.log"

# --- Shared Configuration using generate_blog logic if we could import, 
# but easier to duplicate safe logic or import it.
# Let's import the setup_gemini from generate_blog to be consistent!
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
try:
    from generate_blog import setup_gemini
except ImportError:
    # Fallback if import fails
    def setup_gemini():
         return None, None

def load_env_safe():
    env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
    load_dotenv(env_path)

load_env_safe()
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
        # Use shared setup logic to ensure we pick a working model/version
        client, model_name = setup_gemini()
        if not client or not model_name:
             log_audit("AI QA Failed: Could not setup Gemini client", "ERROR")
             return False, {"status": "ERROR", "reason": "Client Init Failed"}

        prompt = f"""
        You are a Quality Assurance bot for a cybersecurity blog.
        Review the following blog post.

        Title: {latest_post.get('title')}
        Content: {latest_post.get('content')}

        Criteria:
        1. Accuracy: Are the facts/dates plausible? (No future dates presented as past).
        2. Style: Is it raw, authentic, and direct? (No "In this digital age" fluff).
        3. Technicality: Does it use specific industry terminology (CVEs, tools, specific attack vectors)?
        
        Output JSON:
        {{
            "status": "PASS" or "FAIL",
            "reason": "Short explanation of failure or success"
        }}
        """

        response = client.models.generate_content(
            model=model_name,
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
