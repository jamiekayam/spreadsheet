// Table.jsx
import React, { useState } from 'react';
import RowFunctions from './RowFunctions';

const Table = () => {
    // Table data state (array of row objects)
    const [rows, setRows] = useState([
        { id: 1, position: 1, column2: "", column3: "", column4: "", column5: "", column6: "", column7: "" },
    ]);

    const {
        createNewRowAbove,
        createNewRowBelow,
        moveRowUp,
        moveRowDown,
        deleteRow
    } = RowFunctions({ rows, setRows });

    // Render the table
    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Row Position</th>
                        <th>Row ID</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Column A</th>
                        <th>Column B</th>
                        <th></th>
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
