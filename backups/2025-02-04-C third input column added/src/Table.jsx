import React, { useState } from 'react';

const Table = () => {
    // Table data state (array of row objects)
    const [rows, setRows] = useState([
        { id: 1, position: 1, column2: "", columnC: "", column3: "", column4: "", column5: "", column6: "", column7: "" },
    ]);

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
                        <th>Column A</th>
                        <th>Column B</th>
                        <th>Column C</th>
                        <th>Delete Row Button</th>
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
                                <input type="text" name={`column1-${row.id}`} value={row.column2} onChange={(e) => {
                                    const updatedRows = rows.map(r => r.id === row.id ? { ...r, column2: e.target.value } : r);
                                    setRows(updatedRows);
                                }} />
                            </td>
                            <td>
                                <input type="text" name={`column2-${row.id}`} value={row.column3} onChange={(e) => {
                                    const updatedRows = rows.map(r => r.id === row.id ? { ...r, column3: e.target.value } : r);
                                    setRows(updatedRows);
                                }} />
                            </td>
                            <td>
                                <input type="text" name={`columnC-${row.id}`} value={row.columnC} onChange={(e) => {
                                    const updatedRows = rows.map(r => r.id === row.id ? { ...r, columnC: e.target.value } : r);
                                    setRows(updatedRows);
                                }} />
                            </td>
                            <td>
                                <button type="button" onClick={() => deleteRow(row.id)} id={`buttonDeleteRow-${row.id}`}>
                                    DELETE this row
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
