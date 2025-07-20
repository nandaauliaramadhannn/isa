from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

def crawl_facebook(keyword, limit=5):
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)

    url = f"https://www.facebook.com/search/posts?q={keyword}"
    driver.get(url)
    time.sleep(5)  # tunggu render

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    posts = []

    for post in soup.find_all('div', {'data-ad-preview': 'message'})[:limit]:
        posts.append({
            'text': post.get_text(),
            'author': 'Unknown',
            'created_at': None,
            'external_id': None,
            'url': url
        })

    driver.quit()
    return posts
