import './App.css';
import Table from './Table';

function App() {
  return (
    <div className="App">
      <h3>
        Data Table Spreadsheet
      </h3>
      <h3>
        Web Application Concept by Jamie Kayam 2025-02-04
      </h3>
      <p>
        This is a React.js application that demonstrates a data table with basic functionality.
      </p>
      <p>
        You can create, move, and delete rows while maintaining unique ID and position integers for each row.
      </p>
      <p>
        This design is intended as a starter template for a more complex spreadsheet app.

      </p>
      <p>
        The codebase for this application is open source and free for anyone to use.
      </p>
      <Table />

    </div>
  );
}

export default App;
