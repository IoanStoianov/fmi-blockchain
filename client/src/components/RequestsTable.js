import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './requestsTable.css';

function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  
  const rows = [
    createData('0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDc', 159, 6.0),
    createData('0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDa', 237, 9.0),
    createData('0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDb', 262, 16.0),
    createData('0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDn', 262, 16.0),
    createData('0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDs', 262, 16.0),
    createData('0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDe', 262, 16.0),
    createData('0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDp', 262, 16.0),
    createData('0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDl', 262, 16.0),
    createData('0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDk', 262, 16.0),
    createData('0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDh', 262, 16.0),
  ];

export default function RequestsTable() {
    return (
        <div className="mainContainer">
            <h2>Active requests</h2>
            <TableContainer component={Paper} className="tableContainer">
                <Table size="small" stickyHeader aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" className="tableCell">Student</TableCell>
                        <TableCell align="center" className="tableCell">Grade</TableCell>
                        <TableCell align="center" className="tableCell">Wager</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} hover>
                        <TableCell align="center"> {row.name} </TableCell>
                        <TableCell align="center"> {row.calories} </TableCell>
                        <TableCell align="center"> {row.fat} </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}