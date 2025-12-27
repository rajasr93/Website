import os
from google import genai
import traceback

def test_models():
    try:
        # Load .env manually
        env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
        if os.path.exists(env_path):
            print(f"Loading .env from {env_path}")
            with open(env_path, 'r') as f:
                for line in f:
                    if line.strip() and not line.startswith('#'):
                        key, value = line.strip().split('=', 1)
                        os.environ[key] = value
        
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print("❌ GEMINI_API_KEY not found in environment")
            return

        print(f"✅ Found API Key: {api_key[:4]}...{api_key[-4:]}")
        
        # Try with v1alpha API version instead of v1beta
        print("\n🔧 Trying with v1alpha API version...")
        client_alpha = genai.Client(
            api_key=api_key,
            http_options={'api_version': 'v1alpha'}
        )
        
        # Best models from your list to try
        priority_models = [
            'models/gemini-2.5-flash',           # Latest flash model
            'models/gemini-2.0-flash',           # Stable 2.0
            'models/gemini-flash-latest',        # Latest alias
            'models/gemini-2.5-pro',             # More capable
            'models/gemini-pro-latest',          # Pro alias
            'models/gemini-2.0-flash-lite',      # Lighter option
        ]
        
        print("\n🧪 Testing models with v1alpha API...\n")
        
        for model_name in priority_models:
            try:
                print(f"Testing: {model_name}")
                response = client_alpha.models.generate_content(
                    model=model_name,
                    contents='Reply with "OK" if you can read this.'
                )
                print(f"✅ SUCCESS! Model works: {model_name}")
                print(f"   Response: {response.text.strip()}")
                print(f"\n{'='*60}")
                print(f"🎉 WORKING MODEL FOUND: {model_name}")
                print(f"{'='*60}")
                print(f"\nUpdate your generate_blog.py:")
                print(f"1. Change the model to: '{model_name}'")
                print(f"2. Add http_options to your client initialization:")
                print(f"\n   client = genai.Client(")
                print(f"       api_key=api_key,")
                print(f"       http_options={{'api_version': 'v1alpha'}}")
                print(f"   )")
                return
            except Exception as e:
                print(f"❌ Failed: {str(e)[:80]}")
                continue
        
        print("\n" + "="*60)
        print("⚠️  All v1alpha attempts failed. Trying v1 (stable)...")
        print("="*60)
        
        # Try with v1 (stable) API
        client_v1 = genai.Client(
            api_key=api_key,
            http_options={'api_version': 'v1'}
        )
        
        for model_name in priority_models:
            try:
                print(f"\nTesting with v1: {model_name}")
                response = client_v1.models.generate_content(
                    model=model_name,
                    contents='Reply with "OK"'
                )
                print(f"✅ SUCCESS with v1! Model: {model_name}")
                print(f"   Response: {response.text.strip()}")
                print(f"\n{'='*60}")
                print(f"🎉 WORKING MODEL FOUND: {model_name}")
                print(f"{'='*60}")
                print(f"\nUpdate your generate_blog.py:")
                print(f"1. Change the model to: '{model_name}'")
                print(f"2. Add http_options to your client initialization:")
                print(f"\n   client = genai.Client(")
                print(f"       api_key=api_key,")
                print(f"       http_options={{'api_version': 'v1'}}")
                print(f"   )")
                return
            except Exception as e:
                print(f"❌ Failed: {str(e)[:80]}")
                continue
                
        print("\n❌ No working models found with any API version.")
        print("\n🔍 Possible issues:")
        print("   1. API key might need additional permissions")
        print("   2. Billing might not be set up")
        print("   3. You might have hit your quota (wait 24 hours)")
        print("   4. Try creating a new API key at: https://aistudio.google.com/apikey")
            
    except Exception as e:
        print(f"\n❌ Script Failed:")
        traceback.print_exc()

if __name__ == "__main__":
    test_models()