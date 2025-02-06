import React, { useState } from 'react';

const Table = () => {
    const [columns, setColumns] = useState(['A']);
    const [rows, setRows] = useState([
        { id: 1, position: 1, column2: "", columnC: "", column3: "", column4: "", column5: "", column6: "", column7: "" },
    ]);

    // COLUMN FUNCTIONS
    const generateNextColumnNameRight = (current) => {
        let result = '';
        let carry = true;

        // Loop through each character of the current column name from right to left
        for (let i = current.length - 1; i >= 0; i--) {
            let char = current.charCodeAt(i);
            if (carry) {
                if (char === 90) { // 'Z'
                    result = 'A' + result;
                } else {
                    result = String.fromCharCode(char + 1) + result;
                    carry = false;
                }
            } else {
                result = current[i] + result;
            }
        }

        return carry ? 'A' + result : result;
    };
    const generateNextColumnNameLeft = (current) => {
        let result = '';
        let carry = true;

        // Loop through each character of the current column name from left to right
        for (let i = 0; i < current.length; i++) {
            let char = current.charCodeAt(i);
            if (carry) {
                if (char === 65) { // 'A'
                    result = 'Z' + result;
                } else {
                    result = String.fromCharCode(char - 1) + result;
                    carry = false;
                }
            } else {
                result = current[i] + result;
            }
        }

        return carry ? current : result;
    };
    const createColumnRight = (colName) => {
        const colIndex = columns.indexOf(colName);
        if (colIndex === -1) return; // If the column doesn't exist, do nothing

        const newColumns = [...columns];
        const newColumnName = generateNextColumnNameRight(colName);

        // Insert the new column name right after the clicked column
        newColumns.splice(colIndex + 1, 0, newColumnName);

        // Adjust the column names of all columns to the right of the newly inserted column
        for (let i = colIndex + 2; i < newColumns.length; i++) {
            const previousColName = newColumns[i - 1];
            newColumns[i] = generateNextColumnNameRight(previousColName); // Update column name based on previous one
        }

        setColumns(newColumns); // Update state with the new columns array

        // Now, add an empty value for the new column for each row without resetting existing values
        const updatedRows = rows.map(row => ({
            ...row,
            [newColumnName]: row[newColumnName] || '',  // Ensure that the new column doesn't overwrite any existing data
        }));

        setRows(updatedRows); // Update the rows state with new columns
    };
    const createColumnLeft = (colName) => {
        const colIndex = columns.indexOf(colName);
        if (colIndex === -1) return; // If the column doesn't exist, do nothing

        const newColumns = [...columns];

        // The clicked column should shift one to the right, so we just increment its name
        const newColumnName = generateNextColumnNameLeft(colName);

        // Insert the new column name immediately to the left of the clicked column
        newColumns.splice(colIndex, 0, newColumnName); // Insert the clicked column again with the same name

        // Now rename all columns from the clicked position to the right
        for (let i = colIndex + 1; i < newColumns.length; i++) {
            const previousColName = newColumns[i - 1];
            newColumns[i] = generateNextColumnNameRight(previousColName); // Rename columns based on the previous one
        }

        setColumns(newColumns); // Update state with the new columns array

        // Now, add an empty value for the new column for each row without resetting existing values
        const updatedRows = rows.map(row => ({
            ...row,
            [newColumnName]: row[newColumnName] || '',  // Ensure that the new column doesn't overwrite any existing data
        }));

        setRows(updatedRows); // Update the rows state with new columns
    };


    //ROW FUNCTIONS
    // Function to handle creating a new row above a given row
    const createNewRowAbove = (rowId) => {
        const maxId = Math.max(...rows.map(row => row.id));

        const newRow = {
            id: maxId + 1,
            position: 1,
            column2: "",
            columnC: "",
            column3: "",
            column4: "",
            column5: "",
            column6: "",
            column7: ""
        };

        const rowIndex = rows.findIndex(row => row.id === rowId);
        const newRows = [
            ...rows.slice(0, rowIndex),
            newRow,
            ...rows.slice(rowIndex)
        ];

        const updatedRows = newRows.map((row, index) => ({
            ...row,
            position: index + 1
        }));

        setRows(updatedRows);
    };
    // Function to handle creating a new row below a given row
    const createNewRowBelow = (rowId) => {
        const maxId = Math.max(...rows.map(row => row.id));

        const newRow = {
            id: maxId + 1,
            position: 1,
            column2: "",
            columnC: "",
            column3: "",
            column4: "",
            column5: "",
            column6: "",
            column7: ""
        };

        const rowIndex = rows.findIndex(row => row.id === rowId);
        const newRows = [
            ...rows.slice(0, rowIndex + 1),
            newRow,
            ...rows.slice(rowIndex + 1)
        ];

        const updatedRows = newRows.map((row, index) => ({
            ...row,
            position: index + 1
        }));

        setRows(updatedRows);
    };
    // Function to handle moving a row up
    const moveRowUp = (rowId) => {
        const rowIndex = rows.findIndex(row => row.id === rowId);

        if (rowIndex === 0) return; // Row is already at the top

        const updatedRows = [...rows];
        const rowToMove = updatedRows[rowIndex];
        const rowAbove = updatedRows[rowIndex - 1];

        updatedRows[rowIndex] = { ...rowAbove, position: rowIndex + 1 };
        updatedRows[rowIndex - 1] = { ...rowToMove, position: rowIndex };

        setRows(updatedRows);
    };
    // Function to handle moving a row down
    const moveRowDown = (rowId) => {
        const rowIndex = rows.findIndex(row => row.id === rowId);

        if (rowIndex === rows.length - 1) return; // Row is already at the bottom

        const updatedRows = [...rows];
        const rowToMove = updatedRows[rowIndex];
        const rowBelow = updatedRows[rowIndex + 1];

        updatedRows[rowIndex] = { ...rowBelow, position: rowIndex + 1 };
        updatedRows[rowIndex + 1] = { ...rowToMove, position: rowIndex + 2 };

        setRows(updatedRows);
    };
    // Function to delete a row and update positions
    const deleteRow = (rowId) => {
        const updatedRows = rows.filter(row => row.id !== rowId);

        // Reassign positions after deletion
        const reIndexedRows = updatedRows.map((row, index) => ({
            ...row,
            position: index + 1
        }));

        setRows(reIndexedRows);
    };
    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Row Position</th>
                        <th>Row ID</th>
                        <th>Create Row Above Button</th>
                        <th>Create Row Below Button</th>
                        <th>Move Row Up Button</th>
                        <th>Move Row Down Button</th>
                        <th>Delete Row Button</th>
                        {columns.map(col => (
                            <th key={col}>
                                {col}
                                <button onClick={() => createColumnLeft(col)}>Create new column on left</button>
                                <button onClick={() => createColumnRight(col)}>Create new column on right</button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.id}>
                            <td>{row.position}</td>
                            <td>{row.id}</td>
                            <td>
                                <button type="button" onClick={() => createNewRowAbove(row.id)} id={`buttonCreateRowAboveRow-${row.id}`}>
                                    Create New Row ABOVE
                                </button>
                            </td>
                            <td>
                                <button type="button" onClick={() => createNewRowBelow(row.id)} id={`buttonCreateRowBelowRow-${row.id}`}>
                                    Create New Row BELOW
                                </button>
                            </td>
                            <td>
                                <button type="button" onClick={() => moveRowUp(row.id)} id={`buttonMoveRowUp-${row.id}`}>
                                    Move this Row UP
                                </button>
                            </td>
                            <td>
                                <button type="button" onClick={() => moveRowDown(row.id)} id={`buttonMoveRowDown-${row.id}`}>
                                    Move this Row DOWN
                                </button>
                            </td>

                            <td>
                                <button type="button" onClick={() => deleteRow(row.id)} id={`buttonDeleteRow-${row.id}`}>
                                    DELETE this row
                                </button>
                            </td>

                            {columns.map(col => (
                                <td key={col}>
                                    <input
                                        type="text"
                                        name={`${col}-${row.id}`}
                                        value={row[col]}
                                        onChange={(e) => {
                                            const updatedRows = rows.map(r => r.id === row.id ? { ...r, [col]: e.target.value } : r);
                                            setRows(updatedRows);
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;