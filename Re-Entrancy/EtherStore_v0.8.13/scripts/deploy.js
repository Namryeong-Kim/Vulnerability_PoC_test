const hre = require("hardhat");

async function main() {
  const [owner, attacker] = await hre.ethers.getSigners();
  const EtherStore = await hre.ethers.getContractFactory("EtherStore");
  const etherStore = await EtherStore.deploy();
  await etherStore.deployed();
  console.log("owner address: ", owner.address);
  console.log(`deployed to ${etherStore.address}`);

  const Attack = await hre.ethers.getContractFactory("Attack", attacker);
  const attack = await Attack.deploy(etherStore.address);
  await attack.deployed(etherStore.address);
  console.log("attacker address: ", attacker.address);
  console.log(`deployed to ${attack.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
