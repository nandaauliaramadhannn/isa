from bs4 import BeautifulSoup
import requests

def crawl_twitter(keyword, limit=10):
    url = f"https://nitter.net/search?f=tweets&q={keyword.replace(' ', '+')}"
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    tweets = []
    for item in soup.select('.timeline-item')[:limit]:
        tweets.append({
            'text': item.select_one('.tweet-content').text.strip(),
            'author': item.select_one('.username').text.strip(),
            'created_at': item.select_one('span.tweet-date > a').get('title'),
            'external_id': item.select_one('.tweet-link').get('href'),
            'url': "https://nitter.net" + item.select_one('.tweet-link').get('href')
        })
    return tweets
