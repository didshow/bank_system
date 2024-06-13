const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // 部署star合约
  const Star = await ethers.getContractFactory("Star");
  const star = await Star.deploy();
  await star.deployed();
  await star.mint(deployer.address, "1000000000000000000000000000");
  

  // 部署universe合约
  const Universe = await ethers.getContractFactory("Universe");
  const universe = await Universe.deploy(star.address);
 
  
  // 将项目方资金转入银行 ,为银行添加储备金
  await star.approve(universe.address, "1000000000000000000000000000");
  await universe.deposit(deployer.address, "1000000000000000000000000000");
 

  await universe.addReserves("800000000000000000000000000");
  

  // 部署sun合约
  const Sun = await ethers.getContractFactory("Sun");
  const sun = await Sun.deploy(universe.address);
  await sun.deployed();
  // 给sun添加银行权限
  await universe.rely(sun.address);

  // 为sun添加储备金
  await universe.moveResrves(sun.address, "500000000000000000000000000");
  console.log("Star deployed to:", star.address);
  console.log("Universe deployed to:", universe.address);
  console.log("Sun deployed to:", sun.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });