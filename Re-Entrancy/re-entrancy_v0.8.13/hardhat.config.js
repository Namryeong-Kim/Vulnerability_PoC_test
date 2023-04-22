require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.13",
  networks: {
    localganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x64dac5e1618c4af13e7a985e1c2f52011efb742c49c0c3ce424af21c9c029bf7", //owner
        "0x59665966d7326a7f84c5625b1a8db816fb35f508887e606ebf76e29b2a38f75a", //attacker
        "0xa48bdef060a2bc8830e0c4d59128c513990667ca553176c5282a602102f50ae0", //user
      ],
    },
  },
};
