const hre = require("hardhat");

async function main() {
  const StoneAgeLand = await hre.ethers.getContractFactory("StoneAgeLand");
  const stoneAgeLand = await StoneAgeLand.deploy();

  await stoneAgeLand.waitForDeployment();

  console.log(`StoneAgeLand deployed to: ${stoneAgeLand.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
