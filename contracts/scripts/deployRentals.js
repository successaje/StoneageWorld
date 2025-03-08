const hre = require("hardhat");

async function main() {
  const StoneAgeRentals = await hre.ethers.getContractFactory("StoneAgeRentals");
  const stoneAgeRentals = await StoneAgeRentals.deploy();

  await stoneAgeRentals.waitForDeployment();

  console.log(`StoneAgeRentals deployed to: ${stoneAgeRentals.address}`);
  console.log(`StoneAge contract deployed to ${await stoneAgeRentals.getAddress()}`);
  console.log(`Stoneage NFT contract deployed to: ${stoneAgeRentals.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
