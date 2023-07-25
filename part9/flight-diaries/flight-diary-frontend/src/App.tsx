import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries } from "./diaryService";

const Notify = ({ errorMessage }: { errorMessage: string }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<DiaryEntry>("http://localhost:3000/api/diaries", {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
      });
      const entry = response.data;
      setEntries(entries.concat(entry));
      /*
    createEntry({ date: date, visibility: visibility, weather: weather, comment: comment }).then(
      (data) => {
        setEntries(entries.concat(data));
      }
    );*/
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response.data);
        setTimeout(() => {
          setErrorMessage("");
        }, 10000);
      } else {
        console.error(error);
      }
    }

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <div>
        <Notify errorMessage={errorMessage} />
      </div>
      <form onSubmit={entryCreation}>
        <div>
          date
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>

        <div>
          visibility <label htmlFor="great">great</label>
          <input
            name="visibility"
            type="radio"
            id="great"
            value="great"
            checked={visibility === "great"}
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="good">good</label>
          <input
            name="visibility"
            type="radio"
            id="good"
            value="good"
            checked={visibility === "good"}
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="ok">ok</label>
          <input
            name="visibility"
            type="radio"
            id="ok"
            value="ok"
            checked={visibility === "ok"}
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="poor">poor</label>
          <input
            name="visibility"
            type="radio"
            id="poor"
            value="poor"
            checked={visibility === "poor"}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>

        <div>
          weather <label htmlFor="sunny">sunny</label>
          <input
            name="weather"
            type="radio"
            id="sunny"
            value="sunny"
            checked={weather === "sunny"}
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="rainy">rainy</label>
          <input
            name="weather"
            type="radio"
            id="rainy"
            value="rainy"
            checked={weather === "rainy"}
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            name="weather"
            type="radio"
            id="cloudy"
            value="cloudy"
            checked={weather === "cloudy"}
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="stormy">stormy</label>
          <input
            name="weather"
            type="radio"
            id="stormy"
            value="stormy"
            checked={weather === "stormy"}
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="windy">windy</label>
          <input
            name="weather"
            type="radio"
            id="windy"
            value="windy"
            checked={weather === "windy"}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>

        <div>
          comment
          <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>

        <button type="submit">add</button>
      </form>

      <div>
        <h3>Diary Entries</h3>
        {entries.map((entry) => {
          return (
            <div key={entry.id}>
              <h4>{entry.date}</h4>
              <div>visibility: {entry.visibility}</div>
              <div>weather: {entry.weather}</div>
              <div>comment: {entry.comment}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

