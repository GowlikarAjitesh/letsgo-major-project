// index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // You can change the port if needed

app.use(bodyParser.json());

app.post('/plan', (req, res) => {
  const { days, budget, people, destination } = req.body;
  const plan = generateMockPlan(days, budget, people, destination);
  res.json(plan);
});

function generateMockPlan(days, budget, people, destination) {
  const plan = [];
  for (let i = 1; i <= days; i++) {
    plan.push({
      day: i,
      places: [`Attraction ${i}`, `Restaurant ${i}`, `Hotel ${i}`],
    });
  }
  return {
    days,
    budget,
    people,
    destination,
    plan,
  };
}

