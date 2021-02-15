import React, { useState, useEffect } from 'react';
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

export default function RannkingTable({contract, accounts}) {

    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [candidates, setCandidates] = useState(null);

    const [classationDate, setClassationDate] = useState(null);
    const [isClassationOpen, setIsClassationOpen] = useState(false);

    const loadCandidates = async () => {
        const candidatesNum = await contract.methods.getCandidatesNum().call();
        let candidates = [];
        for (let i = 0; i < candidatesNum; i++) {
            let item = await contract.methods.candidates(i).call()
            candidates.push(item);
        }
        console.log(candidates)
        setCandidates(candidates);
        console.log(window.location.pathname);
    };

    const loadClasationDate = async () => {
    
        var startDate = parseInt(await contract.methods.startDate().call());
        
        var clasationDate = parseInt(await contract.methods.clasationPeriod().call());

        startDate += clasationDate*86400 // seconds in one day
        var t = new Date(1970, 0, 1); 
        t.setSeconds(startDate);
        setClassationDate(t.toDateString()); 

        const today = new Date();
        setIsClassationOpen(today >= t);
    };

    const addNewDispute = async () => {
        await contract.methods.opendDispute(selectedRow.id, accounts[0]).send({ from: accounts[0] });
        setOpen(false);
    };

    useEffect(() => {
        if(contract) {
            console.log(contract);
            loadCandidates();
            if(classationDate == null){
                loadClasationDate();
            }
        }
    }, [contract]);

    const handleClickOpen = (rowIndex) => {
        setOpen(true);
        let selectedRow = candidates[rowIndex];
        selectedRow.id = rowIndex;
        setSelectedRow(selectedRow);
    };

    const handleClose = () => {
        setSelectedRow({});
        setOpen(false);
    };
    
    const createClassation = () => {
        contract.methods.createClasation().send({ from: accounts[0] })
    }

    return (
        <div className="rankingTableContainer">
            <h2>Current Ranking</h2>
            {/* TODO Make button avaible when the candidate period is over*/}
            <Button onClick={createClassation} variant="contained" disabled={!isClassationOpen} className={isClassationOpen ? 'classationButtonActive' : 'classationButtonInactive'} color={isClassationOpen ? 'primary' : ''}>Ranking will be avaible in {classationDate}</Button>


            <TableContainer component={Paper} className="table">
                <Table size="small" stickyHeader aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" className="tableCell">Rank</TableCell>
                        <TableCell align="center" className="tableCell">Student</TableCell>
                        <TableCell align="center" className="tableCell">Faculty Number</TableCell>
                        <TableCell align="center" className="tableCell">Grade</TableCell>
                        <TableCell align="center" className="tableCell">Valid</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {candidates ? candidates.map((candidate, index) => (
                        <TableRow key={index} hover onClick={() => handleClickOpen(index)} className="tableRow">
                        <TableCell align="center"> {index + 1} </TableCell>
                        <TableCell align="center"> {candidate.Address} </TableCell>
                        <TableCell align="center"> {candidate.FacultyNumber} </TableCell>
                        <TableCell align="center"> {candidate.Grade} </TableCell>
                        <TableCell align="center"> {candidate.Valid? "Yes": "No"} </TableCell>
                        </TableRow>
                    )): null}
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
                        <p>Rank: {selectedRow.id + 1}</p>
                        <p>Address: {selectedRow.Address}</p>
                        <p>Faculty Number: {selectedRow.FaculcyNumber}</p>
                        <p>Grade: {selectedRow.Grade}</p>
                    </div>
                    <h4>You can open a dispute for reassessment of their rank.</h4>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                    Cancel
                </Button>
                <Button onClick={addNewDispute} color="primary" variant="contained">
                    Open dispute
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}