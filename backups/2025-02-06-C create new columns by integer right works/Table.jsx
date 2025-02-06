//Table.jsx
import React, { useState } from 'react';

const Table = () => {
    // State to manage rows
    const [rows, setRows] = useState([{ id: 1, position: 1 }]);

    // State to manage columns
    const [columns, setColumns] = useState([{ id: 1, position: 1, name: '' }]);

    // Function to handle creating a new column on the right
    const createNewColumnRight = (columnId) => {
        // Get the maximum column ID before updating state
        const maxColumnId = Math.max(...columns.map(col => col.id), 0);

        setColumns((prevColumns) => {
            // Find the clicked column and its position
            const clickedColumn = prevColumns.find(col => col.id === columnId);
            if (!clickedColumn) return prevColumns;

            const newColumn = {
                id: maxColumnId + 1,
                position: clickedColumn.position + 1,
                name: ''
            };

            // Shift positions of all columns to the right of the clicked column
            const updatedColumns = prevColumns.map(col =>
                col.position > clickedColumn.position
                    ? { ...col, position: col.position + 1 }
                    : col
            );

            // Insert new column and sort
            updatedColumns.push(newColumn);
            updatedColumns.sort((a, b) => a.position - b.position);

            return updatedColumns;
        });

        // Ensure new column is added to all rows
        setRows((prevRows) =>
            prevRows.map(row => ({
                ...row,
                [`column${maxColumnId + 1}`]: '' // Use maxColumnId safely
            }))
        );
    };
    // Function to handle creating a new row above a given row
    const createNewRowAbove = (rowId) => {
        const maxId = Math.max(...rows.map(row => row.id));

        const newRow = {
            id: maxId + 1,
            position: 1,

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
            position: 1
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

    // Render the table
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
                            <th key={col.id}>
                                Column ID: {col.id}<br />
                                Column Position: {col.position}<br />
                                Column Name:<br />

                                <button type="button" id={`buttonCreateColumnRight-${col.id}`} onClick={() => createNewColumnRight(col.id)}>
                                    CREATE New Column on RIGHT
                                </button>





                                <button type="button" id="buttonCreateColumnLeft">CREATE New Column on Left</button><br />

                                <button type="button" id="buttonMoveColumnLeft">MOVE this Column LEFT</button><br />
                                <button type="button" id="buttonMoveColumnRight">MOVE this Column RIGHT</button><br />

                                <button type="button" id="buttonDeleteColumn">DELETE This Column</button>

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
                                <td key={`col-${col.id}-row-${row.id}`}>
                                    <input
                                        type="text"
                                        name={`column${col.id}-${row.id}`}
                                        value={row[`column${col.id}`] || ''}
                                        onChange={(e) => {
                                            const updatedRows = rows.map(r =>
                                                r.id === row.id ? { ...r, [`column${col.id}`]: e.target.value } : r
                                            );
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