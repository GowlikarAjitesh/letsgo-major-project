# backend.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/plan')
def generate_plan():
    # return "Hello"
    # input_data = request.json
    plan = ["drama", "koma", "mama"]
    # plan = generate_mock_plan(input_data['days'], input_data['budget'], input_data['people'], input_data['destination'])
    return "jsonify(plan)"

def generate_mock_plan(days, budget, people, destination):
    plan = []
    for i in range(1, days+1):
        plan.append({'day': i, 'places': [f'Attraction {i}', f'Restaurant {i}', f'Hotel {i}']})
    return "hello"

if __name__ == '__main__':
    app.run(debug=True)
