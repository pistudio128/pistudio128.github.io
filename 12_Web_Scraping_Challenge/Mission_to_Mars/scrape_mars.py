# Declare dependencies
from bs4 import BeautifulSoup
from splinter import Browser
from splinter.exceptions import ElementDoesNotExist
import pandas as pd
import requests as r
import time
import os
import sys
os.path.dirname(sys.executable)


# Initialize browser
def scrape():
    # Choose executeable path to driver for Mac
    executeable_path = {"executeable_path" : "/Applications/anaconda3/envs/PythonData/bin"}
    browser = Browser("chrome", executeable_path, headless=False)
    browser.visit('http://www.google.com')
    
    # Scrape the [NASA Mars News Site](https://mars.nasa.gov/news/) 
    news_title, news_p = scrape_mars_news(browser)
    featured_image_url = scrape_mars_image(browser)
    mars_weather ="" #weather(browser)
    html_table1 = mars_facts(browser)
    marsdict = mars_hemispheres(browser)
    data = {
            "Title" : news_title,
            "Paragraph" : news_p,
            "Image_Url" : featured_image_url,
            "Mars Weather" : mars_weather,
            "Mars_Facts" : html_table1,
            "Mars_Hemispheres" : marsdict
            }

    browser.quit()
    return data
    
    
# NASA Mars News
def scrape_mars_news(browser):
    url1 = "https://mars.nasa.gov/news"
    browser.visit(url1)
    time.sleep(4)
    # Define html object
    html1 = browser.html 
    
    # Launch Beautiful Soup to parse html
    soup = BeautifulSoup(html1, 'html.parser')

    # Retrieve the latest news title and assign to a variable
    article = soup.select_one('ul.item_list  li.slide')
    news_title = article.find('div', class_='content_title').text
    
    # Retrieve the latest news paragraph and assign to a variable
    news_p = soup.find('div', class_='article_teaser_body').text

    
    return news_title, news_p

    


### JPL Mars Space Images - Featured Image
def scrape_mars_image(browser):
        image_url2 = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
        browser.visit(image_url2)

        # Define html object
        html_img = browser.html

        # Deploy Beautiful Soup to parse html
        soup = BeautifulSoup(html_img, 'html.parser')

        # Scrape background image
        featured_image_url = soup.find('article')['style'].replace('background-image: url(','').replace(');', '')[1:-1]

        # Define initial url
        initial_url = 'https://www.jpl.nasa.gov'

        # Connect main website with image
        featured_image_url = initial_url + featured_image_url

        # Display full link to featured image
        featured_image_url


        return featured_image_url


        browser.quit()


### Mars Weather via Twitter
def weather(browser):
        url3 = 'https://twitter.com/marswxreport?lang=en'
        browser.visit(url3)
        time.sleep(5)      

        # Define html object
        html = browser.html

        # Tells browser to scroll down and execute in Javascript
        browser.execute_script("window.scrollTo(300, document.body.scrollHeight);")

        time.sleep(5)
        soup = BeautifulSoup(html, 'html.parser')
        tweeterpage = soup.find_all('span', class_='css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0')
        mars_weather = []
        for t in tweeterpage:
            if t.text.startswith("InSight"):
                mars_weather.append(t.text)
        mars_weather[0].replace('\n', ' ')
        
        browser.quit()

### Mars Facts
def mars_facts(browser):

        # Visit the Mars Facts webpage
        facts_url = 'https://space-facts.com/mars/'
        table1 = pd.read_html(facts_url)
        table1 = table1[0]
        html_table1 = table1.to_html(index=False)
        return html_table1

### Mars Hemispheres
def mars_hemispheres(browser):
    
    # # Visit the USGS Astrogeology site [here](https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars) 
    url4 = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url4)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    mars = soup.find_all('div', class_='item')
    main_url = 'https://astrogeology.usgs.gov'
    fullurl = ""
    mars_dict = []

    for Mar in mars:
        # Error handling
        try:
            # Identify and return title of listing
            title = Mar.find('h3').text   
            link = Mar.a['href']
            combinedurl = main_url+link
            browser.visit(combinedurl)
            html = browser.html
            soup = BeautifulSoup(html, 'html.parser')
            Hemiurl = soup.find('img', class_='wide-image')['src']
            fullurl = main_url + Hemiurl
        # Print results and append to dictionary only if title and link are available
        #if (title and link and image):
            if (title and fullurl):
                #print('-------------')
                #print(title)
                print(fullurl)
                mars_dict.append({"Title" : title, "Image_URL" : fullurl}) 
        except AttributeError as e:
            print(e)  
    return mars_dict

  
#* Save both the image url string for the full resolution hemisphere image, a
    #nd the Hemisphere title containing the hemisphere name. Use a Python dictionary to store the data using the keys `img_url` and `title`.

#```python
# Example:
#hemisphere_image_urls = [
#    {"title": "Valles Marineris Hemisphere", "img_url": "..."},
#    {"title": "Cerberus Hemisphere", "img_url": "..."},
#    {"title": "Schiaparelli Hemisphere", "img_url": "..."},
#    {"title": "Syrtis Major Hemisphere", "img_url": "..."},
#]
#```

#- - -






