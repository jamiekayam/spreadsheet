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
    // Function to handle creating a new column on the left
    const createNewColumnLeft = (columnId) => {
        // Get the maximum column ID before updating state
        const maxColumnId = Math.max(...columns.map(col => col.id), 0);

        setColumns((prevColumns) => {
            // Find the clicked column and its position
            const clickedColumn = prevColumns.find(col => col.id === columnId);
            if (!clickedColumn) return prevColumns;

            const newColumn = {
                id: maxColumnId + 1,
                position: clickedColumn.position,
                name: ''
            };

            // Shift positions of all columns that are at or to the right of the clicked column
            const updatedColumns = prevColumns.map(col =>
                col.position >= clickedColumn.position
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
    // Function to move a column to the right
    const moveColumnRight = (columnId) => {
        setColumns((prevColumns) => {
            // Find the clicked column and its position
            const clickedColumn = prevColumns.find(col => col.id === columnId);
            if (!clickedColumn) return prevColumns;

            // Check if this column is already the last one, no need to move
            if (clickedColumn.position === prevColumns.length) return prevColumns;

            // Find the next column
            const nextColumn = prevColumns.find(col => col.position === clickedColumn.position + 1);
            if (!nextColumn) return prevColumns;

            // Swap positions between the clicked column and the next column
            const updatedColumns = prevColumns.map(col =>
                col.id === clickedColumn.id
                    ? { ...col, position: clickedColumn.position + 1 }
                    : col.id === nextColumn.id
                        ? { ...col, position: clickedColumn.position }
                        : col
            );

            // Sort columns by position to ensure correct order
            updatedColumns.sort((a, b) => a.position - b.position);

            return updatedColumns;
        });
    };
    // Function to move a column left
    const moveColumnLeft = (columnId) => {
        setColumns((prevColumns) => {
            // Find the clicked column and its position
            const clickedColumn = prevColumns.find(col => col.id === columnId);
            if (!clickedColumn) return prevColumns;

            // Find the column to the left of the clicked column
            const leftColumn = prevColumns.find(col => col.position === clickedColumn.position - 1);
            if (!leftColumn) return prevColumns; // If there's no column to the left, do nothing

            // Swap the positions of the clicked column and the left column
            const updatedColumns = prevColumns.map(col => {
                if (col.id === clickedColumn.id) {
                    return { ...col, position: col.position - 1 }; // Move clicked column left
                }
                if (col.id === leftColumn.id) {
                    return { ...col, position: col.position + 1 }; // Move left column right
                }
                return col;
            });

            // Sort columns by position
            updatedColumns.sort((a, b) => a.position - b.position);

            return updatedColumns;
        });
    };
    // Function to delete a column and update positions
    const deleteColumn = (columnId) => {
        setColumns((prevColumns) => {
            // Find the column to be deleted
            const columnToDelete = prevColumns.find(col => col.id === columnId);
            if (!columnToDelete) return prevColumns;

            // Remove the column from the array
            const updatedColumns = prevColumns.filter(col => col.id !== columnId);

            // Reassign positions for all columns after deletion
            const reIndexedColumns = updatedColumns.map((col, index) => ({
                ...col,
                position: index + 1 // Re-index columns starting from position 1
            }));

            return reIndexedColumns;
        });

        // Update rows to reflect the column deletion
        setRows((prevRows) =>
            prevRows.map(row => {
                const updatedRow = { ...row };
                // Remove the key for the deleted column
                delete updatedRow[`column${columnId}`];
                return updatedRow;
            })
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
                        <th>
                        </th>

                        {columns.map(col => (
                            <th key={col.id}>
                                Column ID: {col.id}<br />
                                Column Position: {col.position}<br />
                                Column Name:<br />
                                <button type="button" id={`buttonCreateColumnRight-${col.id}`} onClick={() => createNewColumnRight(col.id)}>
                                    CREATE New Column on RIGHT
                                </button>
                                <br />
                                <button type="button" id={`buttonCreateColumnLeft-${col.id}`} onClick={() => createNewColumnLeft(col.id)}>
                                    CREATE New Column on LEFT
                                </button>
                                <br />
                                <button type="button" id="buttonMoveColumnLeft" onClick={() => moveColumnLeft(col.id)}>MOVE this Column LEFT</button><br />
                                <button type="button" id="buttonMoveColumnRight" onClick={() => moveColumnRight(col.id)}>MOVE this Column RIGHT</button><br />
                                <button type="button" id="buttonDeleteColumn" onClick={() => deleteColumn(col.id)}>
                                    DELETE this Column
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.id}>
                            <td>Row Position: {row.position}<br />Row ID: {row.id}<br />
                                <button type="button" onClick={() => createNewRowAbove(row.id)} id={`buttonCreateRowAboveRow-${row.id}`}>
                                    Create New Row ABOVE
                                </button>
                                <br />
                                <button type="button" onClick={() => createNewRowBelow(row.id)} id={`buttonCreateRowBelowRow-${row.id}`}>
                                    Create New Row BELOW
                                </button>
                                <br />
                                <button type="button" onClick={() => moveRowUp(row.id)} id={`buttonMoveRowUp-${row.id}`}>
                                    Move this Row UP
                                </button>
                                <br />
                                <button type="button" onClick={() => moveRowDown(row.id)} id={`buttonMoveRowDown-${row.id}`}>
                                    Move this Row DOWN
                                </button>
                                <br />
                                <button type="button" onClick={() => deleteRow(row.id)} id={`buttonDeleteRow-${row.id}`}>
                                    DELETE this Row
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