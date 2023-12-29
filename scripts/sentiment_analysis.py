# import nltk
# print(nltk.data.path)
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
# Download VADER lexicon for sentiment analysis
# nltk.download('vader_lexicon')
# nltk.data.path.append("C:\\nltk_data")
# Connect to mongoDB
mongodb_connection_string = os.getenv("MONGO_URL")

client = MongoClient(mongodb_connection_string)
db = client.cntmgm
collection = db.reviews

# Initialize VADER Sentiment Analyzer
sid = SentimentIntensityAnalyzer()


def get_sentiment_score(text):
    return sid.polarity_scores(text)['compound']

# Update each document in collection with sentiment score

for document in collection.find():
    if "sentiment_score" not in document:
        sentiment_score = get_sentiment_score(document["body"])

        collection.update_one(
            {"_id":document["_id"]},
            {"$set": {"sentiment_score": sentiment_score}}
        )