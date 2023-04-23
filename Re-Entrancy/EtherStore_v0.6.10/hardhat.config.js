require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.6.10",
  networks: {
    localganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x64dac5e1618c4af13e7a985e1c2f52011efb742c49c0c3ce424af21c9c029bf7", //owner
        "0xce248eb5dca33de7e240d48319d3f39aefb46f5a9e0fbfdf6ca7dd4efee99ff1", // user
        "0xd60efc981bcf26648341e3183b4d6479a9494f092e2ed3c2fbe32be5ac1b0904", //attacker
      ],
    },
  },
};
