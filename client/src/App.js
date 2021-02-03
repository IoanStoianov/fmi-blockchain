import React, { Component } from "react";
import StipendCenter from "./contracts/StipendCenter.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, candidatesList: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log(web3)

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = StipendCenter.networks[networkId];
      const instance = new web3.eth.Contract(
        StipendCenter.abi,
        deployedNetwork && deployedNetwork.address,
      );

      //TODO remove when unmount
      let subscription = web3.eth.subscribe('logs', {
        address: deployedNetwork.address,
        topics: [web3.utils.sha3("NewCandidate()")]
      }, (error, result) => {
        console.log("//////////")
        if (!error) {
          console.log(result)
          this.loadCandidates()
        }
      })

      let subscription2 = web3.eth.subscribe('logs', {
        address: deployedNetwork.address,
        topics: [web3.utils.sha3("NewDispute()")]
      }, (error, result) => {
        console.log("//////////")
        if (!error) {
          console.log(result)
          this.loadCandidates()
        }
      })

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance })
      this.loadCandidates();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  loadCandidates = async () => {
    const { contract } = this.state
    const candidatesNum = await contract.methods.getCandidatesNum().call();
    let candidates = [];
    for (let i = 0; i < candidatesNum; i++) {
      let item = await contract.methods.candidates(i).call()
      candidates.push(item);
    }

    this.setState({ candidatesList: candidates });
  }

  addNewCandidate = async () => {
    console.log("add");
    const { accounts, contract } = this.state;
    const price = await contract.methods.stake().call();
    console.log(price)
    await contract.methods.addNewCandidate("Ioan Stoianov", "81596", 550, accounts[0]).send({ from: accounts[0], value: price })
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    console.log(this.state.candidatesList)
    const list = this.state.candidatesList.map((item, index) =>
      <tr key={index}>
        <td>{item.Name}</td>
        <td>{item.FaculcyNumer}</td>
        <td>{item.Grade}</td>
        <td>{item.Address}</td>
      </tr>
    )
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <table><tbody>{list}</tbody></table>

        <button onClick={this.addNewCandidate}>Add Candidate</button>
      </div>
    );
  }
}

export default App;
