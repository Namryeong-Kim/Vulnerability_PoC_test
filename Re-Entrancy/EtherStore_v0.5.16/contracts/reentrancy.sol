pragma solidity ^0.5.16;

contract EtherStore {
    // Withdrawal limit = 1 ether / week
    uint constant public WITHDRAWAL_LIMIT = 1 ether;
    mapping(address => uint) public lastWithdrawTime;
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount);
        require(_amount <= WITHDRAWAL_LIMIT);
        require(now >= lastWithdrawTime[msg.sender] + 1 weeks);

        (bool sent, ) = msg.sender.call.value(_amount)("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] -= _amount;
        lastWithdrawTime[msg.sender] = now;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}