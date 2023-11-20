// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    mapping(address => bool) public hasVoted;
    uint256 public candidate1Votes;
    uint256 public candidate2Votes;

    function vote(uint256 _candidate) external {
        require(!hasVoted[msg.sender], "Already voted.");
        require(_candidate == 1 || _candidate == 2, "Invalid candidate.");
        
        if (_candidate == 1) {
            candidate1Votes++;
        } else {
            candidate2Votes++;
        }
        
        hasVoted[msg.sender] = true;
    }
}