// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.4 <0.9.0;
pragma experimental ABIEncoderV2;

import "./DataTypes.sol";
import "./IClasify.sol";

contract SortedClasificator is IClasify{
    
    function createClasation(DataTypes.Candidate[] memory data) external override returns(DataTypes.Candidate[] memory) {
       quickSort(data, int(0), int(data.length - 1));
       return data;
    }
    
    function quickSort(DataTypes.Candidate[] memory arr, int left, int right) internal{
        int i = left;
        int j = right;
        if(i==j) return;
        DataTypes.Candidate memory pivot = arr[uint(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint(i)].Grade < pivot.Grade) i++;
            while (pivot.Grade < arr[uint(j)].Grade) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }
}

contract StipendCenter {
    
    DataTypes.Candidate[] public candidates;
    DataTypes.Dispute[] public disputes;
    uint public stake;
    address public owner;
    address public keeper;
    uint public startDate;
    uint public clasationPeriod;
    uint public disputePeriod;
    IClasify public clasificator;
    
    constructor(uint _stake, address _keeper, uint _clasationPeriod, uint _disputePeriod) {
        owner = msg.sender;
        stake = _stake;
        keeper = _keeper;
        startDate = block.timestamp;
        clasationPeriod = _clasationPeriod;
        disputePeriod = _disputePeriod;
        
        //hardcoded
        clasificator = new SortedClasificator();
    }
    
    modifier inClastaionState() {
        require(block.timestamp < startDate + clasationPeriod * 1 days, "Clasation period is over!");
        _;
    }
    
    modifier inDesputeState(){
        require(block.timestamp < startDate + clasationPeriod * 1 days + disputePeriod * 1 days, "Dispute period is over!");
        _;
    }
    
    modifier inFinalState(){
        require(block.timestamp >= startDate + clasationPeriod  * 1 days+ disputePeriod * 1 days, "Dispute period is over!");
        _;
    }
    
    
    function createClasation() external inDesputeState {
        DataTypes.Candidate[] memory x = clasificator.createClasation(candidates);

        for(uint i = 0; i < candidates.length; i++){
            candidates[i] = x[i];
        }
        
    }
    
    function receiveStipends(uint nStipends) external payable inFinalState{ //TODO edit return stake
        uint singleTransfer = msg.value / candidates.length;
        uint i = 0;
        for(uint j = 0; j < nStipends && i <  candidates.length; i++){
            if(candidates[i].Valid){
                candidates[i].Address.transfer(singleTransfer + stake);
                j++;
            }
        }
        
        while(i <  candidates.length){
            if(candidates[i].Valid){
                candidates[i].Address.transfer(stake);
            }
            i++;
        }
    }

    event NewCandidate();

    function addNewCandidate(string memory name, string memory faculcyNumber, uint grade, address payable studentAddress) external payable inClastaionState{
        require(studentAddress == msg.sender, "StudentAddress and sender must be the same address");
        require(msg.value == stake, "The send value is different than the required!");
        DataTypes.Candidate memory newCandidate = DataTypes.Candidate(name, faculcyNumber, grade, studentAddress, true);
        candidates.push(newCandidate);
        emit NewCandidate();
    }

    function getCandidatesNum() public view returns (uint) {
        return candidates.length;
    }
    
    event NewDispute();
    function opendDispute(uint id, address payable openBy) external inDesputeState{
        require(openBy == msg.sender, "OpenBy and sender must be the same address");
        DataTypes.Dispute memory newDispute = DataTypes.Dispute(id, openBy, true);
        disputes.push(newDispute);
        emit NewDispute();
    }
    
    function getDisputeNum() public view returns (uint) {
        return disputes.length;
    }
    
    function resolveDisput(uint disputeId, bool isValid) external inDesputeState{
        require(disputes[disputeId].Open, "This dispute is already closed!");
        require(msg.sender == keeper, "Only the keeper can resolve Disputes!");
        if(!isValid){
            candidates[disputes[disputeId].CandidateId].Valid = false;
            disputes[disputeId].OpenedBy.transfer(stake);
        }
        disputes[disputeId].Open = false;
    }
}




