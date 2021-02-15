import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './requestPage.css';

export default function TransferStipend({contract, accounts}) {

    const [stipendNum, setStipendNum] = useState('');
    const [stipendValue, setStipendValue] = useState('');

    const transfer = async () => {
        var num = Number(stipendNum);
        var val = Number(stipendValue);
        val *= 1000000000000000000;
        await contract.methods.receiveStipends(num).send({ from: accounts[0], value : val});
        setStipendNum('');
        setStipendValue('');
    };

    return(
        <section className="container">
        <form className="form">
            <h2>Make transfer</h2>
            <TextField
                value={stipendNum}
                id="stipendNum"
                label="Stipend Number"
                variant="outlined"
                className="inputField"
                type="number"
                onChange={(e) => setStipendNum(e.target.value)}
            />
            <TextField
                value={stipendValue}
                id="stipendValue"
                label="Stipend Value"
                variant="outlined"
                className="inputField"
                onChange={(e) => setStipendValue(e.target.value)}
            />
            <Button variant="contained" color="primary" className="submitButton" onClick={transfer}>Transfer</Button>
        </form>
      </section>
    )
}