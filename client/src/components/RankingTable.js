import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import './rankingTable.css';

function createData(rank, account, grade, wager) {
    return { rank, account, grade, wager };
  }
  
  const rows = [
    createData( 1,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDc', 159, 6.0),
    createData( 2,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDb', 262, 16.0),
    createData( 3,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDd', 262, 16.0),
    createData( 4,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDf', 262, 16.0),
    createData( 5,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDn', 262, 16.0),
    createData( 6,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDa', 237, 9.0),
    createData( 7,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDs', 262, 16.0),
    createData( 8,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDe', 262, 16.0),
    createData( 9,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDp', 262, 16.0),
    createData( 10,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDl', 262, 16.0),
    createData( 11,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDk', 262, 16.0),
    createData( 12,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDh', 262, 16.0),
    createData( 13,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDv', 159, 6.0),
    createData( 14,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDx', 237, 9.0),
    createData( 15,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDz', 262, 16.0),
    createData( 16,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDy', 262, 16.0),
    createData( 17,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDt', 262, 16.0),
    createData( 18,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDo', 262, 16.0),
    createData( 19,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDi', 262, 16.0),
    createData( 20,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDu', 262, 16.0),
    createData( 21,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BD1', 262, 16.0),
    createData( 22,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BD2', 262, 16.0),
    createData( 23,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BD3', 159, 6.0),
    createData( 24,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BD4', 237, 9.0),
    createData( 25,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BD5', 262, 16.0),
    createData( 26,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BD6', 262, 16.0),
    createData( 27,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BD7', 262, 16.0),
    createData( 28,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BD8', 262, 16.0),
    createData( 29,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BD9', 262, 16.0),
    createData( 30,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDq', 262, 16.0),
    createData( 31,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDm', 262, 16.0),
    createData( 32,'0x617DA121aBf03D4c1AF572F5a4E313E26BeF7BDg', 262, 16.0),
  ];

export default function RannkingTable() {

    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    const handleClickOpen = (rowIndex) => {
        setOpen(true);
        setSelectedRow(rows[rowIndex]);
    };

    const handleClose = () => {
        setSelectedRow({});
        setOpen(false);
    };

    const openDispute = () => {
        console.log(selectedRow);
        setOpen(false);
    }

    return (
        <div className="rankingTableContainer">
            <h2>Current Ranking</h2>
            <TableContainer component={Paper} className="table">
                <Table size="small" stickyHeader aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" className="tableCell">Rank</TableCell>
                        <TableCell align="center" className="tableCell">Student</TableCell>
                        <TableCell align="center" className="tableCell">Grade</TableCell>
                        <TableCell align="center" className="tableCell">Wager</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index} hover onClick={() => handleClickOpen(index)} className="tableRow">
                        <TableCell align="center"> {row.rank} </TableCell>
                        <TableCell align="center"> {row.account} </TableCell>
                        <TableCell align="center"> {row.grade} </TableCell>
                        <TableCell align="center"> {row.wager} </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Something is wrong? Open a dispute!"}</DialogTitle>
                <DialogContent>
                    <h4>This person got scholarship unrightfully?</h4>
                    <div>
                        <p>Rank: {selectedRow.rank}</p>
                        <p>Account: {selectedRow.account}</p>
                        <p>Grade: {selectedRow.grade}</p>
                        <p>Wager: {selectedRow.wager}</p>
                    </div>
                    <h4>You can open a dispute for reassessment of their rank.</h4>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                    Cancel
                </Button>
                <Button onClick={openDispute} color="primary" variant="contained">
                    Open dispute
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}