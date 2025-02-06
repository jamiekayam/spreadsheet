import './App.css';
import Table from './Table';

function App() {
  return (
    <div className="App">
      <h3>
        Data Table Spreadsheet
      </h3>
      <h4>
        Web Application Concept
      </h4>
      <p>
        Created by Jamie Kayam, February 2025
      </p>
      <p>
        This is a React javascript application that demonstrates dynamic functionality applied to a data table with a basic "spreadsheet" styled user interface.<br />
        You can create, move, and delete rows and columns within the table while maintaining unique ID and position integers for them.<br />
        This design is intended as a starter template with core functionality to be used to develop more complex functionality.
      </p>
      <p>
        The codebase for this application is open source and free for anyone to use.
      </p>
      <Table />
    </div >
  );
}

export default App;
