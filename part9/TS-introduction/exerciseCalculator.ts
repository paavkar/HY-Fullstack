interface Exercisevalues {
  target: number;
  exerciseHours: Array<number>
}

export const parseArguments = (args: string[]): Exercisevalues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const exerciseHours: Array<number> = []
  for (var i = 3; i < args.length; i++) {
    exerciseHours.push(Number(args[i]))
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      target: Number(args[2]),
      exerciseHours: exerciseHours
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): Result => {
  const periodLength = exerciseHours.length;
  let ratingDescription: string = "";
  let trainDays: number = 0;
  let trainingTime: number = 0;
  let rating: number = 0;
  for (var i = 0; i < exerciseHours.length; i++) {
    if (exerciseHours[i] > 0) {
      trainDays += 1;
      trainingTime += exerciseHours[i];
    }
  }
  const average: number = trainingTime / periodLength;

  switch (true) {
    case average - target > 0:
      rating = 3;
      break;

    case average - target < 0 && average - target > -0.5:
      rating = 2;
      break;

    default:
      rating = 1;
      break;
  }

  switch (true) {
    case rating === 1:
      ratingDescription = "need to do better";
      break;

    case rating === 2:
      ratingDescription = "not too bad but could be better";
      break;

    case rating === 3:
      ratingDescription = "better than the target";
      break;

    default:
      break;
  }

  return {
    periodLength: periodLength,
    trainingDays: trainDays,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
try {
  const { target, exerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
