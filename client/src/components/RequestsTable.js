import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './requestsTable.css';

export default function RequestsTable({candidates}) {

    return (
        <div className="mainContainer">
            <h2>Active requests</h2>
            <TableContainer component={Paper} className="tableContainer">
                <Table size="small" stickyHeader aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" className="tableCell">Student</TableCell>
                        <TableCell align="center" className="tableCell">Address</TableCell>
                        <TableCell align="center" className="tableCell">Faculty Number</TableCell>
                        <TableCell align="center" className="tableCell">Grade</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {candidates ? candidates.map((candidate, index) => (
                        <TableRow key={index} hover>
                            <TableCell align="center"> {candidate.Name} </TableCell>
                            <TableCell align="center"> {candidate.Address} </TableCell>
                            <TableCell align="center"> {candidate.FaculcyNumber} </TableCell>
                            <TableCell align="center"> {candidate.Grade} </TableCell>
                        </TableRow>
                    )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}