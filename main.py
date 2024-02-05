import keys
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# connect to database (mongodb or json?)
f = open('reviews.json')
reviews = json.load(f)
reviews_arr = json.loads(reviews)
restaurant_info = ""

# Endpoint 1
@app.route('/restaurant', methods=['POST'])
def get_restaurant_info():
    try:
        # name = request.args.get('name')
        #data = request.get_json()
        #name = data.get('restaurant')
        name = request.get_data()

        global restaurant_info
        for element in reviews_arr:
            if element["name"].lower() == name.lower():
                restaurant_info = str(element["reviews"]) + "serves vegetarian food:" + element["serves_vegetarian_food"]
                break
        else:
            restaurant_info = "not available"
        
        print("name:", name, restaurant_info)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    
@app.route('/ask', methods=['POST'])
def get_answer():  

    try:  
        # question = request.args.get('question')
        #question = data.get('query')
        question = request.get_data()
        if question is None:
            question = "Summarise the reviews"
        
        #print("restaurant info", restaurant_info)
        
        info = {
        "messages": [
            {
            "role": "user",
            "content": f"You are given the following information about a restaurant:{restaurant_info}. Based on it, answer this question:{question}"
            }
        ]
        }

        response = requests.post(
        'https://api.chat.jina.ai/v1/chat/completions',
        headers={
            "authorization": f"Bearer {keys.llm_api_key}",
            "content-type": "application/json"
        },
        json=info
        )

        result = response.json()
        print(result['choices'][0]['message']['content'])
        return result['choices'][0]['message']['content']

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=4000, debug=True)

