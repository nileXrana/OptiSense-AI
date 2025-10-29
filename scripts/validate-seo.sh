#!/bin/bash

# OptiSense AI - SEO Validation Script
# Run this script after deploying to verify all SEO enhancements are working

echo "🚀 OptiSense AI - SEO Validation"
echo "================================="
echo ""

DOMAIN="https://optisense.nileshrana.me"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test function
test_url() {
  local url=$1
  local name=$2
  
  echo -n "Testing $name... "
  
  status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  
  if [ "$status_code" -eq 200 ]; then
    echo -e "${GREEN}✓ OK${NC} (Status: $status_code)"
    return 0
  else
    echo -e "${RED}✗ FAIL${NC} (Status: $status_code)"
    return 1
  fi
}

# Test content function
test_content() {
  local url=$1
  local pattern=$2
  local name=$3
  
  echo -n "Checking $name... "
  
  if curl -s "$url" | grep -q "$pattern"; then
    echo -e "${GREEN}✓ Found${NC}"
    return 0
  else
    echo -e "${RED}✗ Not Found${NC}"
    return 1
  fi
}

echo "1. Testing Core Pages"
echo "--------------------"
test_url "$DOMAIN" "Homepage"
test_url "$DOMAIN/signin" "Sign In Page"
test_url "$DOMAIN/ai-assistants" "AI Assistants Page"
test_url "$DOMAIN/dashboard" "Dashboard"
echo ""

echo "2. Testing SEO Files"
echo "-------------------"
test_url "$DOMAIN/sitemap.xml" "Sitemap"
test_url "$DOMAIN/robots.txt" "Robots.txt"
test_url "$DOMAIN/site.webmanifest" "Web Manifest"
test_url "$DOMAIN/favicon.ico" "Favicon"
echo ""

echo "3. Testing Meta Tags"
echo "-------------------"
test_content "$DOMAIN" "og:title" "OpenGraph Title"
test_content "$DOMAIN" "og:description" "OpenGraph Description"
test_content "$DOMAIN" "og:image" "OpenGraph Image"
test_content "$DOMAIN" "twitter:card" "Twitter Card"
test_content "$DOMAIN" "application/ld\+json" "Structured Data (JSON-LD)"
test_content "$DOMAIN" "canonical" "Canonical Link"
echo ""

echo "4. Testing Sitemap Content"
echo "-------------------------"
test_content "$DOMAIN/sitemap.xml" "<urlset" "Sitemap XML Format"
test_content "$DOMAIN/sitemap.xml" "$DOMAIN" "Sitemap Contains Domain"
echo ""

echo "5. Testing Robots.txt Content"
echo "-----------------------------"
test_content "$DOMAIN/robots.txt" "User-agent" "Robots User-agent"
test_content "$DOMAIN/robots.txt" "Sitemap" "Robots Sitemap Link"
echo ""

echo "6. Performance Check"
echo "-------------------"
echo -n "Measuring homepage load time... "
time_total=$(curl -o /dev/null -s -w '%{time_total}' "$DOMAIN")
echo -e "${YELLOW}${time_total}s${NC}"

if (( $(echo "$time_total < 2.0" | bc -l) )); then
  echo -e "${GREEN}✓ Good${NC} (< 2s)"
else
  echo -e "${YELLOW}⚠ Slow${NC} (> 2s)"
fi
echo ""

echo "================================="
echo "✅ SEO Validation Complete!"
echo ""
echo "Next Steps:"
echo "----------"
echo "1. Submit sitemap to Google Search Console:"
echo "   https://search.google.com/search-console"
echo ""
echo "2. Test structured data:"
echo "   https://search.google.com/test/rich-results?url=$DOMAIN"
echo ""
echo "3. Debug OpenGraph tags:"
echo "   https://developers.facebook.com/tools/debug/?q=$DOMAIN"
echo ""
echo "4. Test Twitter Card:"
echo "   https://cards-dev.twitter.com/validator"
echo ""
echo "5. Check mobile-friendliness:"
echo "   https://search.google.com/test/mobile-friendly?url=$DOMAIN"
echo ""
echo "6. Test PageSpeed:"
echo "   https://pagespeed.web.dev/analysis?url=$DOMAIN"
echo ""
