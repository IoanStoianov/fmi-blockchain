pragma solidity >=0.7.4 <0.9.0;
pragma experimental ABIEncoderV2;

import "./DataTypes.sol";

interface IClasify{
    function createClasation(DataTypes.Candidate[] memory c) external returns(DataTypes.Candidate[] memory x);
}