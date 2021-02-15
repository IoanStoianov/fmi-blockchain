import React, { Component } from "react";
import StipendCenter from "./contracts/StipendCenter.json";
import getWeb3 from "./getWeb3";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RequestPage from './components/RequestPage.js';
import NavBar from './components/NavBar.js';
import RankingTable from './components/RankingTable.js';
import DisputesTable from './components/DisputesTable.js';

import "./App.css";
import TransferStipend from "./components/TransferStipend";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { web3: null, deployedNetwork: null, accounts: null, contract: null};
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = StipendCenter.networks[networkId];
      const instance = new web3.eth.Contract(
        StipendCenter.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, deployedNetwork, accounts, contract: instance});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    return (
      <Router>
        <div className="mainContent">
          <NavBar></NavBar>
          <Switch>
            <Route exact path="/" 
              component={ () => 
                <RequestPage 
                  web3={this.state.web3}
                  deployedNetwork={this.state.deployedNetwork} 
                  contract={this.state.contract} 
                  accounts={this.state.accounts}
                />
              }
            />
            <Route path="/ranking" 
              component={ () => 
                <RankingTable 
                  web3={this.state.web3}
                  deployedNetwork={this.state.deployedNetwork} 
                  contract={this.state.contract} 
                  accounts={this.state.accounts}
                />
              }
            />
            <Route path="/disputes" 
              component={ () => 
                <DisputesTable 
                  web3={this.state.web3}
                  deployedNetwork={this.state.deployedNetwork} 
                  contract={this.state.contract} 
                  accounts={this.state.accounts}
                />
              } 
            />
            <Route path="/transfer"
              component={ () => 
                <TransferStipend 
                  web3={this.state.web3}
                  deployedNetwork={this.state.deployedNetwork} 
                  contract={this.state.contract} 
                  accounts={this.state.accounts}
                />
              } 
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

//       let subscription2 = web3.eth.subscribe('logs', {
//         address: deployedNetwork.address,
//         topics: [web3.utils.sha3("NewDispute()")]
//       }, (error, result) => {
//         console.log("//////////")
//         if (!error) {
//           console.log(result)
//           this.loadDisputes()
//         }
//       })

export default App;
