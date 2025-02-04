const main = async () => {
    const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
    const productChain = await hre.ethers.getContractFactory("ProductChainTracking")

    const transactionsContract = await transactionsFactory.deploy();
    
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    // await transactionsContract.deployed();
  
    console.log("Transactions address: ", transactionsContract.address);
    console.log("Product chain trackin address: ",productChain.address)
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