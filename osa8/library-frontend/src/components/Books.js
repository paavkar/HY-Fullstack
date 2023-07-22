import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const allBooksResult = useQuery(ALL_BOOKS);
  const { data, loading, refetch } = useQuery(ALL_BOOKS);
  const bookGenres = [];

  if (!props.show) {
    return null;
  }

  if (loading || allBooksResult.loading) {
    return <div>loading...</div>;
  }

  const allBooks = allBooksResult.data.allBooks;
  const books = data.allBooks;

  allBooks.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!bookGenres.includes(genre)) {
        bookGenres.push(genre);
      }
    });
  });

  const filterBooks = (genre) => {
    setSelectedGenre(genre);
    refetch({ genre: genre });
  };

  const noFilter = () => {
    setSelectedGenre("");
    refetch();
  };

  if (!selectedGenre) {
    return (
      <div>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {bookGenres.map((genre) => (
            <button key={genre} onClick={() => filterBooks(genre)}>
              {genre}
            </button>
          ))}
          <button onClick={() => noFilter()}>all genres</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>books</h2>
      in genre <b>{selectedGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {bookGenres.map((genre) => (
          <button key={genre} onClick={() => filterBooks(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => noFilter()}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
