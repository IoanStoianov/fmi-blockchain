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
    const [disputes, setDisputes] = useState(null);
    const [canResolve, setCanResolve] = useState(false);
    const [resolvePeriod, setResolvePeriod] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    const loadDisputes = async () => {
        const disputesNum = await contract.methods.getDisputeNum().call();
        let disputes = [];
        for (let i = 0; i < disputesNum; i++) {
            let item = await contract.methods.disputes(i).call()
            let candidate = await contract.methods.candidates(item.CandidateId).call()
            
            disputes.push({...item, ...candidate});
        }

        setDisputes(disputes);
        console.log('disputes: ', disputes);
    }

    const loadResolvePeriod = async () => {
    
        var startDate = parseInt(await contract.methods.startDate().call());
        
        var clasationDate = parseInt(await contract.methods.clasationPeriod().call());

        var disputePeriod = parseInt(await contract.methods.disputePeriod().call());

        startDate += clasationDate*86400 // seconds in one day
        startDate += disputePeriod*86400 
        var t = new Date(1970, 0, 1); 
        t.setSeconds(startDate);
        setResolvePeriod(t.toDateString()); 
    
    };

    const loadKeeperAddress = async () => {
        const keeper = await contract.methods.keeper().call();
        console.log(keeper);
        if(keeper === accounts[0]){
            setCanResolve(true);
        }
    }

    useEffect(() => {
        if(contract) {
            loadDisputes();
            if(resolvePeriod == null){
                loadResolvePeriod();
                loadKeeperAddress();
            }
        }
    }, [contract]);

    const handleClickOpen = (rowIndex) => {
        setOpen(true);
        let selectedRow = disputes[rowIndex];
        selectedRow.id = rowIndex;
        setSelectedRow(selectedRow);
    };

    const resolveDisputeNo = () => {
        contract.methods.resolveDisput(selectedRow.id,true).send({ from: accounts[0]});
        setSelectedRow({});
        setOpen(false);
    };

    const resolveDisputeYes = () => {
        contract.methods.resolveDisput(selectedRow.id,true).send({ from: accounts[0]});
        setSelectedRow({});
        setOpen(false);
    };

    return (
        <div className="rankingTableContainer">
            <h2>Open Disputes</h2>
            <div className="message">Disputes can be resolved until {resolvePeriod}</div>

            <TableContainer component={Paper} className="table">
                <Table size="small" stickyHeader aria-label="a dense table">
                    <TableHead>
                    <TableRow>

                        <TableCell align="center" className="tableCell">Dispute Id</TableCell>
                        <TableCell align="center" className="tableCell">Candidate</TableCell>
                        <TableCell align="center" className="tableCell">Faculty Number</TableCell>
                        <TableCell align="center" className="tableCell">Grade</TableCell>
                        <TableCell align="center" className="tableCell">Opened By</TableCell>
                        <TableCell align="center" className="tableCell">Open</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {disputes ? disputes.map((dispute, index) => (
                        <TableRow key={index} hover onClick={() => handleClickOpen(index)} className={canResolve ? 'tableRow' : 'disableClick'}>
                            <TableCell align="center"> {index + 1} </TableCell>
                            <TableCell align="center"> {dispute.Name} </TableCell>
                            <TableCell align="center"> {dispute.FacultyNumber} </TableCell>
                            <TableCell align="center"> {dispute.Grade} </TableCell>
                            <TableCell align="center"> {dispute.OpenedBy} </TableCell>
                            <TableCell align="center"> {dispute.Open ? 'Yes' : 'No'} </TableCell>
                        </TableRow>
                    )): null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Close dispute."}</DialogTitle>
                <DialogContent>
                    <h4>Is this dispute correct?</h4>
                    <div>
                        <p>Rank: {selectedRow.id + 1}</p>
                        <p>Opened By: {selectedRow.OpenedBy}</p>
                    </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={resolveDisputeNo} color="secondary" variant="contained">
                    No
                </Button>
                <Button onClick={resolveDisputeYes} color="primary" variant="contained">
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}