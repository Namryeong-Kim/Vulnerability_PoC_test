const storeABI =
  require("../artifacts/contracts/reentrancy.sol/EtherStore.json").abi;
const attackABI = require("../artifacts/contracts/attack.sol/Attack.json").abi;

const rpc = "http://127.0.0.1:7545";
const user =
  "0xa48bdef060a2bc8830e0c4d59128c513990667ca553176c5282a602102f50ae0";
const attacker =
  "0x59665966d7326a7f84c5625b1a8db816fb35f508887e606ebf76e29b2a38f75a";
const owner =
  "0x64dac5e1618c4af13e7a985e1c2f52011efb742c49c0c3ce424af21c9c029bf7";
const EtherStore = "0x70e5fB09c180D6033013b03503b0e8e57eC5f8ad";
const Attack = "0xD876d12EAb6085e7F14dB136191788fbd8D9842E";

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
