import React from 'react';

import Button from '@material-ui/core/Button';

import './rankingTable.css';

 

export default function TransferStipend({contract, accounts}) {

    const transfer = async () => {
        var num = document.getElementById("stipend-num").value;
        var val = document.getElementById("stipend-value").value;
        val *= 1000000000000000000
        await contract.methods.receiveStipends(num).send({ from: accounts[0], value : val});
        
    };

    return(<div>
        <label>Stipend Num</label>
        <input type="number" id="stipend-num" />
        <div>   </div>
        <label>Stipend Value</label>
        <input type="number" id="stipend-value" />
        <Button onClick={transfer}>Transfer</Button>
    </div>)
}