# fmi-blockchain

Setup
1. Install [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
2. Install truffle `npm install -g truffle` 
3. In terminal 
` cd fmi-blockchain`

  `truffle develop ` this will print 10 addresses copy the first address and paste it in ./migrations/2_deploy_contracts.js deployer.deploy(_,"0x....",_,_)

  `> compile`
  
  `> migrate`

4. In other terminal run the client with
    `npm start`
5. Import in Metamsk your account from truffle develop copy the private key of the first account and paste it in Metamask

6. Play around

If you have unexpected transaction problems and see in the console `nonce` go to Metamask click on the circle Icon>Setting>Advanced>Reset Account