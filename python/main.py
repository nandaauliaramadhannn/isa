import sys
import json
from bs4 import BeautifulSoup
import requests

def crawl_twitter(keyword, limit=1000):
    url = f"https://nitter.net/search?f=tweets&q={keyword.replace(' ', '+')}"
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return []
    soup = BeautifulSoup(response.text, 'html.parser')
    tweets = []
    for item in soup.select('.timeline-item')[:limit]:
        tweets.append({
            'platform': 'twitter',
            'text': item.select_one('.tweet-content').text.strip(),
            'author': item.select_one('.username').text.strip(),
            'created_at': item.select_one('span.tweet-date > a').get('title'),
            'external_id': item.select_one('.tweet-link').get('href'),
            'url': "https://nitter.net" + item.select_one('.tweet-link').get('href')
        })
    return tweets

def run_all(keywords, limit=3):
    all_results = []
    for keyword in keywords:
        all_results.extend(crawl_twitter(keyword, limit))
        # Bisa tambah crawl platform lain nanti
    return all_results

def main():
    try:
        input_data = sys.stdin.read()
        keywords = json.loads(input_data)
        results = run_all(keywords)
        # Output JSON valid tanpa print lain
        print(json.dumps(results, ensure_ascii=False))
    except Exception as e:
        # Kalau error, keluarkan JSON error agar PHP bisa baca
        err = {'error': str(e)}
        print(json.dumps(err, ensure_ascii=False))
        sys.exit(1)

if __name__ == "__main__":
    main()
