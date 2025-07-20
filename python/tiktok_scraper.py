def crawl_tiktok(keyword, limit=5):
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    from bs4 import BeautifulSoup
    import time

    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)

    url = f"https://www.tiktok.com/search?q={keyword}"
    driver.get(url)
    time.sleep(6)

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    posts = []

    for item in soup.find_all('div', class_='tiktok-x6y88p-DivItemContainerV2')[:limit]:
        posts.append({
            'text': 'Konten TikTok scraping',
            'author': 'Unknown',
            'created_at': None,
            'external_id': None,
            'url': url
        })

    driver.quit()
    return posts
