import { useEffect, useState } from "react";
import Select from 'react-select';

import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";

const Authors = (props) => {
  const authors = props.authors;
  const [author, setAuthor] = useState(null);
  const [birthyear, setBirthyear] = useState("");
  const [options, setOptions] = useState([])
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    setOptions(authors.map((author) => { return { value: author.name, label: author.name }}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authors])

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: author.value, setBornTo: parseInt(birthyear) } });
    setBirthyear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <Select onChange={setAuthor} options={options} placeholder="Select an author">
      </Select>
      <form onSubmit={submit}>
        <div>
          born
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
