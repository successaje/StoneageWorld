const hre = require("hardhat");

async function main() {
  const StoneAgeEquipment = await hre.ethers.getContractFactory("StoneAgeEquipment");
  const stoneAgeEquipment = await StoneAgeEquipment.deploy();

  await stoneAgeEquipment.waitForDeployment();

  console.log(`StoneAgeEquipment deployed to: ${stoneAgeEquipment.address}`);
  console.log(`StoneAge contract deployed to ${await stoneAgeEquipment.getAddress()}`);
  console.log(`Stoneage NFT contract deployed to: ${stoneAgeEquipment.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
