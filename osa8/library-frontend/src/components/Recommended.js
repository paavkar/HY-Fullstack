import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommended = (props) => {
  const userResult = useQuery(ME);
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (userResult.loading) {
    return <div>loading...</div>;
  }
  const user = userResult.data.me;

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  result.refetch({ genre: user.favoriteGenre});

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{user.favoriteGenre}</b>
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
    </div>
  );
};

export default Recommended;
