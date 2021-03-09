from flask import Flask, render_template, redirect 
from flask_pymongo import PyMongo
from pymongo import MongoClient
import scrape_mars  
import os

# Define Flask app
app = Flask(__name__)

#Use flask_pymongo to set up connection through mLab
app.config["MONGO_URI"] = 'mongodb://localhost:27017/mars_app'
mongo = PyMongo(app)

# Create route that renders index.html template and finds documents from mongo
@app.route("/")
def index(): 
    # Find data - logic in background goes to mongodb
    mars_info = mongo.db.mars_info.find_one()

    # Return template and data
    return render_template("index.html", mars_info=mars_info)

# Route that will trigger scrape function
@app.route("/scrape")
def scrape(): 

    # Run scraped functions
    mars_info = mongo.db.mars_info
    mars_data = scrape_mars.scrape()
    mars_info.replace_one({}, mars_data, upsert=True) 
    return redirect("/", code=302)

if __name__ == "__main__": 
    app.run(debug= True)


# Tutor ---> data = scrape_mars.init_browser()
# Tutor ---> db.update({},data, upsert =True)