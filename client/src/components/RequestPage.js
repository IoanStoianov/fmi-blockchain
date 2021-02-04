import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RequestsTable from './RequestsTable.js';

import './requestPage.css';

export default function RequestPage() {

    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [facultyNumber, setFacultyNumber] = useState('');

    const handleSubmit = () => {
        console.log({name, facultyNumber, grade});
        setName('');
        setGrade('');
        setFacultyNumber('');
    };

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
            <Button variant="contained" color="primary" className="submitButton" onClick={handleSubmit}>Submit</Button>
        </form>
        <RequestsTable></RequestsTable>
      </section>
    )
  }