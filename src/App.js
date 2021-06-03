import { useEffect, useState } from "react";
import { getAllEntries } from "./api";

const App = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getAllEntries.then(res => setEntries(res));
  }, []);

  console.log(entries);

  return (
    <div>
      {entries.map(entry => (
        <pre key={entry.ref.value.id}>{entry.data.text}</pre>
      ))}
    </div>
  );
};

export default App;
