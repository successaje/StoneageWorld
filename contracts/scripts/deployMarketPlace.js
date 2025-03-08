const hre = require("hardhat");

async function main() {
  const StoneAgeMarketplace = await hre.ethers.getContractFactory("StoneAgeMarketplace");
  const stoneAgeMarketplace = await StoneAgeMarketplace.deploy();

  await stoneAgeMarketplace.waitForDeployment();

  console.log(`StoneAgeMarketplace deployed to: ${stoneAgeMarketplace.address}`);
  console.log(`StoneAge contract deployed to ${await stoneAgeMarketplace.getAddress()}`);
  console.log(`Stoneage NFT contract deployed to: ${stoneAgeMarketplace.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
