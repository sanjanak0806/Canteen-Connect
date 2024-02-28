from pymongo import MongoClient
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from textblob import TextBlob
from dotenv import load_dotenv
import os

# Initiate the analyser object
analyzer = SentimentIntensityAnalyzer()

load_dotenv()
# MongoDB connection string
mongo_uri = os.getenv("MONGO_URL")

# Connect to MongoDB
client = MongoClient(mongo_uri)

# Access the database and collections
db = client.get_database()
reviews_collection = db.get_collection("reviews")
products_collection = db.get_collection("products")

# Function to calculate star rating based on sentiment score
def calculate_star_rating(sentiment_score):
    # sentiment score to star rating (0-5)
    return round((sentiment_score + 1) * 2.5,1)

# Function to perform sentiment analysis and update star rating
def update_star_rating():
    for product in products_collection.find():
        reviews_ids = product['reviews']
        total_sentiment_score = 0
        total_reviews = 0
        
        # Calculate total sentiment score for reviews of this product
        for review_id in reviews_ids:
            review = reviews_collection.find_one({'_id': review_id})
            if review:
                text = review['body']
                sentiment_score = analyzer.polarity_scores(text)['compound']
                reviews_collection.update_one({'_id': review_id},
                                              {'$set':{'_v':calculate_star_rating(sentiment_score)}})
                total_sentiment_score += sentiment_score
                total_reviews += 1
        
        # Calculate average sentiment score
        if total_reviews > 0:
            average_sentiment_score = total_sentiment_score / total_reviews
        else:
            average_sentiment_score = 0
        
        # Calculate star rating
        star_rating = calculate_star_rating(average_sentiment_score)
        
        # Update star rating and __v in products collection
        products_collection.update_one({'_id': product['_id']},
                                       {'$set': {'__v': star_rating}})
        print(f"Updated star rating for {product['name']} to {star_rating} with {total_reviews} reviews.")

# Call the function to update star ratings
update_star_rating()

# Close MongoDB connection
client.close()
