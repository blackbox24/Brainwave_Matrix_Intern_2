import hre from "hardhat";

const main = async () => {
  const productChainFactory = await hre.ethers.getContractFactory("ProductChainTracking");
  const productChainContract = await productChainFactory.deploy();

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  await productChainContract.deployed();
  console.log("Product chain tracking address: ", productChainContract.address);
};

const runMain = async () => {
  try {
      await main();
      process.exit(0);
  } catch (error) {
      console.error(error);
      process.exit(1);
  }
};

runMain();