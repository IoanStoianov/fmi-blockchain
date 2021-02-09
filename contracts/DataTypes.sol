// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.4 <0.9.0;

library DataTypes {
    struct Candidate {
        string Name;
        string FacultyNumber;
        uint Grade;
        address payable Address;
        bool Valid;
    }

    struct Dispute{
        uint CandidateId;
        address payable OpenedBy;
        bool Open;
    }
}