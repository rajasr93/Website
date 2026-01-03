
import sys
import os

# Add scripts directory to path to import generate_blog
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from generate_blog import validate_url, is_private_ip

def test_ssrf_protection():
    print("🧪 Testing SSRF Protection Mechanics...")
    
    test_cases = [
        ("http://127.0.0.1", True, "Loopback IP"),
        ("http://localhost", True, "Localhost"),
        ("http://192.168.1.50", True, "Private Class C"),
        ("http://10.0.0.5", True, "Private Class A"),
        ("http://169.254.169.254/latest/meta-data/", True, "AWS Metadata"),
        ("https://google.com", False, "Public URL"), 
        ("https://example.com", False, "Public URL 2")
    ]
    
    failed = 0
    
    for url, should_block, desc in test_cases:
        print(f"\nTarget: {url} ({desc})")
        print(f"Expect Block: {should_block}")
        
        result = validate_url(url)
        is_blocked = (result == "#")
        
        if is_blocked == should_block:
            print(f"✅ PASS: Blocked={is_blocked}")
        else:
            print(f"❌ FAIL: Blocked={is_blocked}, Expected={should_block}")
            failed += 1
            
    if failed == 0:
        print("\n✨ All Security Tests Passed!")
        sys.exit(0)
    else:
        print(f"\n💥 {failed} Tests Failed!")
        sys.exit(1)

if __name__ == "__main__":
    test_ssrf_protection()
