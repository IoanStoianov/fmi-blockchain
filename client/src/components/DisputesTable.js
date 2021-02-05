import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './rankingTable.css';

export default function RannkingTable({contract}) {
    const [disputes, setDisputes] = useState(null);

    const loadDisputes = async () => {
        const disputesNum = await contract.methods.getDisputeNum().call();
        let disputes = [];
        for (let i = 0; i < disputesNum; i++) {
            let item = await contract.methods.disputes(i).call()
            disputes.push(item);
        }

        setDisputes(disputes);
        console.log('disputes: ', disputes);
    }

    useEffect(() => {
        if(contract) {
            loadDisputes();
        }
    }, [contract]);

    return (
        <div className="rankingTableContainer">
            <h2>Open Disputes</h2>
            <TableContainer component={Paper} className="table">
                <Table size="small" stickyHeader aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" className="tableCell">Dispute Id</TableCell>
                        <TableCell align="center" className="tableCell">Opened By</TableCell>
                        <TableCell align="center" className="tableCell">Open</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {disputes ? disputes.map((dispute, index) => (
                        <TableRow key={index} hover>
                            <TableCell align="center"> {index + 1} </TableCell>
                            <TableCell align="center"> {dispute.OpenedBy} </TableCell>
                            <TableCell align="center"> {dispute.Open ? 'Yes' : 'No'} </TableCell>
                        </TableRow>
                    )): null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}