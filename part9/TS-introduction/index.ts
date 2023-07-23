import express from "express";
const app = express();
app.use(express.json());

import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.send({ weight: weight, height: height, bmi: bmi });
  } else {
    res.send({ error: "malformatted parameters" });
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateArray = (list: Array<any>) => {
  for (let i = 0; i < list.length; i++) {
    if (isNaN(Number(list[i]))) {
      return true;
    }
  }
  return false;
};

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(404).send({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (isNaN(Number(target)) || validateArray(daily_exercises as Array<any>)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(
    daily_exercises as Array<number>,
    Number(target)
  );
  return res.send({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
