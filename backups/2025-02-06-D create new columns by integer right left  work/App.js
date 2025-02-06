import './App.css';
import Table from './Table';

function App() {
  return (
    <div className="App">
      <h3>
        Data Table Spreadsheet
      </h3>
      <h3>
        Web Application Concept - Created by Jamie Kayam, February 2025
      </h3>
      <p>
        This is a React.js application that demonstrates dynamic functionality applied to a data table with a basic "spreadsheet" styled user interface.
      </p>
      You can create, move, and delete table rows while maintaining unique ID and position integers for each row.<br />
      You can also create new table columns while maintaining unique ID and position integers for each column.
      <p>
        This design is intended as a starter template with core functionality, to be used to develop more complex functionality.

      </p>
      <p>
        The codebase for this application is open source and free for anyone to use.
      </p>
      <Table />

    </div>
  );
}

export default App;
