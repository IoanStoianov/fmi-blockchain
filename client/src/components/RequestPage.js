import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RequestsTable from './RequestsTable.js';

import './requestPage.css';

export default function RequestPage({web3, deployedNetwork, contract, accounts}) {

    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [facultyNumber, setFacultyNumber] = useState('');
    const [candidates, setCandidates] = useState(null);

    const loadCandidates = async () => {
        const candidatesNum = await contract.methods.getCandidatesNum().call();
        let candidates = [];
        for (let i = 0; i < candidatesNum; i++) {
            let item = await contract.methods.candidates(i).call()
            candidates.push(item);
        }
    
        setCandidates(candidates);
        console.log('candidates: ', candidates);
    }

    const addNewCandidate = async () => {
        console.log("add");
        const price = await contract.methods.stake().call();
        console.log('gas price: ', price);
        await contract.methods.addNewCandidate(name, facultyNumber, grade, accounts[0]).send({ from: accounts[0], value: price });
        setName('');
        setGrade('');
        setFacultyNumber('');
    };

    useEffect(() => {
        if(contract) {
            loadCandidates();
        }
    }, [contract]);

    useEffect(() => {
        if(deployedNetwork && web3) {
            let subscription = web3.eth.subscribe('logs', {
                address: deployedNetwork.address,
                topics: [web3.utils.sha3("NewCandidate()")]
                }, (error, result) => {
                console.log("//////////")
                if (!error) {
                    console.log(result);
                    loadCandidates();
                }
            });
        }
    }, [deployedNetwork, web3]);

    return (
      <section className="container">
        <form className="form">
            <h2>Submit scholarship request</h2>
            <TextField
                value={name}
                id="name"
                label="Name"
                variant="outlined"
                className="inputField"
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                value={facultyNumber}
                id="facultyNumber"
                label="Faculty Number"
                variant="outlined"
                className="inputField"
                onChange={(e) => setFacultyNumber(e.target.value)}
            />
            <TextField
                value={grade}
                id="grade"
                label="Grade"
                variant="outlined"
                className="inputField"
                onChange={(e) => setGrade(e.target.value)}
            />
            <Button variant="contained" color="primary" className="submitButton" onClick={addNewCandidate}>Submit</Button>
        </form>
        <RequestsTable candidates={candidates}></RequestsTable>
      </section>
    )
  }