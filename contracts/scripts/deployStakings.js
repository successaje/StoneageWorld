const hre = require("hardhat");

async function main() {
  const StoneAgeStaking = await hre.ethers.getContractFactory("StoneAgeStaking");
  const stoneAgeStaking = await StoneAgeStaking.deploy();

  await stoneAgeStaking.waitForDeployment();

  console.log(`StoneAgeStaking deployed to: ${stoneAgeStaking.address}`);
  console.log(`StoneAge contract deployed to ${await stoneAgeStaking.getAddress()}`);
  console.log(`Stoneage NFT contract deployed to: ${stoneAgeStaking.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
