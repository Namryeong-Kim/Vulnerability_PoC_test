const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");
const info = require("./info.js");

const exec = async () => {
  const user = info.user;
  const provider = new Web3.providers.HttpProvider(info.rpc);
  Web3.providers.HttpProvider.prototype.sendAsync =
    Web3.providers.HttpProvider.prototype.send;
  const localProvider = new Provider({
    privateKeys: [user],
    providerOrUrl: provider,
  });

  const web3 = new Web3(localProvider);
  const accounts = await web3.eth.accounts.privateKeyToAccount(user);

  console.log(info.EtherStore);
  const EtherStore = new web3.eth.Contract(
    info.storeABI,
    info.EtherStore
  );

  try {
    //before deposit -> user balance
    await web3.eth.getBalance(accounts.address).then(function (balance) {
      console.log(
        "user balances: ",
        web3.utils.fromWei(balance, "ether"),
        "ether"
      );
    });

    //before deposit -> EtherStore balance
    const balance_ether = await EtherStore.methods.getBalance().call();
    console.log(
      "EtherStore contract's balances: ",
      web3.utils.fromWei(balance_ether, "ether"),
      "ether"
    );

    //deposit
    const tx = await EtherStore.methods.deposit().send({
      from: accounts.address,
      value: 2000000000000000000,
    });
    console.log(tx);

    //after deposit -> user balance
    await web3.eth.getBalance(accounts.address).then(function (balance) {
      console.log(
        "user balances: ",
        web3.utils.fromWei(balance, "ether"),
        "ether"
      );
    });

    //after deposit -> EtherStore balance
    const balance = await EtherStore.methods.getBalance().call();
    console.log(
      "EtherStore contract's balances: ",
      web3.utils.fromWei(balance, "ether"),
      "ether"
    );
  } catch (error) {
    console.log(error);
  }
};

exec();




