// RowFunctions.jsx
import React from 'react';

const RowFunctions = ({ rows, setRows }) => {
    // Function to handle creating a new row above a given row
    const createNewRowAbove = (rowId) => {
        const maxId = Math.max(...rows.map(row => row.id));

        const newRow = {
            id: maxId + 1,
            position: 1,
            column2: "",
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

    return {
        createNewRowAbove,
        createNewRowBelow,
        moveRowUp,
        moveRowDown,
        deleteRow
    };
};

export default RowFunctions;
