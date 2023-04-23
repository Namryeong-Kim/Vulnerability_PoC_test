const storeABI =
  require("../artifacts/contracts/reentrancy.sol/EtherStore.json").abi;
const attackABI = require("../artifacts/contracts/attack.sol/Attack.json").abi;

const rpc = "http://127.0.0.1:7545";
const user =
  "0xce248eb5dca33de7e240d48319d3f39aefb46f5a9e0fbfdf6ca7dd4efee99ff1";
const attacker =
  "0xd60efc981bcf26648341e3183b4d6479a9494f092e2ed3c2fbe32be5ac1b0904";
const owner =
  "0x64dac5e1618c4af13e7a985e1c2f52011efb742c49c0c3ce424af21c9c029bf7";
const EtherStore = "0x85D61768db65380e84a3DEbd1bA6552D0D61cB0b";
const Attack = "0x0a6Ac13353e50f6d8220B5B93665ecd7dF897BbC";

module.exports = {
  rpc,
  user,
  attacker,
  owner,
  EtherStore,
  storeABI,
  Attack,
  attackABI,
};
