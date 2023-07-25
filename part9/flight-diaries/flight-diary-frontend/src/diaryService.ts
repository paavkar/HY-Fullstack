import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
    .then((response) => response.data);
};

export const createEntry = (object: NewDiaryEntry) => {
  try {
    return axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries", object)
      .then((response) => response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response.data);
      return error.response.data;
      // Do something with this error...
    } else {
      console.error(error);
    }
  }
};
