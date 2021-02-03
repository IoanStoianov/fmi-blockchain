var StipendCenter = artifacts.require("./StipendCenter.sol");

module.exports = function(deployer) {
  deployer.deploy(StipendCenter,10,"0x2cc99ddf18f45c4a9ef91de2880f31d9df6a9bfd",1,1);
};
