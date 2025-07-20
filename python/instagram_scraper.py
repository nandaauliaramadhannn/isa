def crawl_instagram_hashtag(hashtag, limit=5):
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    from bs4 import BeautifulSoup
    import time

    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)

    url = f"https://www.instagram.com/explore/tags/{hashtag}/"
    driver.get(url)
    time.sleep(5)

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    posts = []

    for item in soup.find_all('div', {'class': 'v1Nh3'})[:limit]:
        posts.append({
            'text': 'Post Instagram tanpa login',
            'author': 'Unknown',
            'created_at': None,
            'external_id': None,
            'url': url
        })

    driver.quit()
    return posts
