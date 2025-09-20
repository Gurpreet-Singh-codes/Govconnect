from textblob import TextBlob
import re

def analyze_sentiment(text):
    """
    Analyze sentiment of text using TextBlob
    Returns: sentiment label and score
    """
    if not text or not isinstance(text, str):
        return {"label": "neutral", "score": 0.0}
    
    # Clean text
    text = re.sub(r'[^\w\s]', '', text)
    
    # Analyze sentiment
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    
    # Classify sentiment
    if polarity > 0.1:
        label = "positive"
    elif polarity < -0.1:
        label = "negative"
    else:
        label = "neutral"
    
    return {"label": label, "score": polarity}

def extract_feedback_insights(feedback_text):
    """
    Extract key insights from feedback text
    """
    blob = TextBlob(feedback_text)
    
    # Extract noun phrases as potential topics
    topics = blob.noun_phrases
    
    # Extract adjectives as sentiment indicators
    adjectives = []
    for word, pos in blob.tags:
        if pos.startswith('JJ'):  # Adjectives
            adjectives.append(word)
    
    return {
        "topics": list(set(topics))[:5],  # Unique topics
        "adjectives": list(set(adjectives))[:5],  # Unique adjectives
        "word_count": len(feedback_text.split())
    }