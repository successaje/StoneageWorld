const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();

  console.log(`Deploying contract with the account: ${deployer.address}`);



  const Stoneage = await hre.ethers.getContractFactory("StoneAge");
  const stoneage = await Stoneage.deploy(deployer.address);

  await stoneage.waitForDeployment();
//   await stoneage.deployed();

  console.log(`StoneAge contract deployed to ${await stoneage.getAddress()}`);
  console.log(`Stoneage NFT contract deployed to: ${stoneage.address}`);
  console.log(`Stoneage NFT contract deployed to: ${stoneage.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
