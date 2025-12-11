import os
import sys
import importlib.util
import requests

# Configuration matching your main.py
OLLAMA_URL = "http://localhost:11434"
REQUIRED_MODEL = "qwen2.5-coder:7b"
REQUIRED_PACKAGES = ["crewai", "langchain_openai"]
mVRAM_LIMIT_WARNING = True

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    RESET = '\033[0m'

def print_status(step, status, message):
    if status == "wk":
        print(f"[{Colors.GREEN}OK{Colors.RESET}] {step}: {message}")
    elif status == "err":
        print(f"[{Colors.RED}FAIL{Colors.RESET}] {step}: {message}")
    elif status == "warn":
        print(f"[{Colors.YELLOW}WARN{Colors.RESET}] {step}: {message}")

def check_libraries():
    print(f"\n--- 1. Checking Python Libraries ---")
    all_installed = True
    for package in REQUIRED_PACKAGES:
        if importlib.util.find_spec(package) is not None:
            print_status(package, "wk", "Installed")
        else:
            print_status(package, "err", "Not found. Run: pip install crewai langchain-openai")
            all_installed = False
    return all_installed

def check_files():
    print(f"\n--- 2. Checking Project Structure ---")
    
    # Check for main.py
    if os.path.isfile("agent.py"):
        print_status("main.py", "wk", "Found in current directory")
    else:
        print_status("main.py", "err", "Not found. Make sure you saved the previous code as 'main.py'")
        return False

    # Check for src directory (Crucial for the Manager Agent)
    if os.path.isdir("src"):
        print_status("src/", "wk", "Source directory found")
    else:
        print_status("src/", "warn", "Directory 'src' not found. Agent won't find any files to edit!")
    
    return True

def check_ollama():
    print(f"\n--- 3. Checking Ollama Server ---")
    
    # 3a. Check Connection
    try:
        response = requests.get(OLLAMA_URL)
        if response.status_code == 200:
            print_status("Connection", "wk", "Ollama is running")
        else:
            print_status("Connection", "err", f"Ollama reachable but returned {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print_status("Connection", "err", "Could not connect to localhost:11434. Is Ollama running?")
        return False

    # 3b. Check Model Availability
    try:
        response = requests.get(f"{OLLAMA_URL}/api/tags")
        if response.status_code == 200:
            models = response.json().get('models', [])
            model_names = [m['name'] for m in models]
            
            # Fuzzy match or exact match
            found = any(REQUIRED_MODEL in name for name in model_names)
            
            if found:
                print_status("Model", "wk", f"Found '{REQUIRED_MODEL}'")
            else:
                print_status("Model", "err", f"Model '{REQUIRED_MODEL}' not found.")
                print(f"      Available models: {', '.join(model_names)}")
                print(f"      Fix: Run 'ollama pull {REQUIRED_MODEL}'")
                return False
        else:
            print_status("Model API", "err", "Could not list models")
            return False
    except Exception as e:
        print_status("Model Check", "err", f"Failed to check models: {e}")
        return False

    return True

if __name__ == "__main__":
    print(f"Diagnostic Tool for Local SDLC (RTX 3080 Setup)")
    
    libs_ok = check_libraries()
    files_ok = check_files()
    ollama_ok = check_ollama()

    print(f"\n--- SUMMARY ---")
    if libs_ok and files_ok and ollama_ok:
        print(f"{Colors.GREEN}SUCCESS: System is ready. You can run 'python main.py'{Colors.RESET}")
    else:
        print(f"{Colors.RED}FAILURE: Please fix the errors above before running main.py{Colors.RESET}")