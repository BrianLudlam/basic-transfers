// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const [deployer] = await ethers.getSigners();
  console.log("deployer address:", (await deployer.getAddress()).toString());
  console.log("deployer balance:", (await deployer.getBalance()).toString());

  //const Token = await ethers.getContractFactory("GMToken");
  //const token = await Token.deploy();
  //console.log("Token deploying.. tx:", token);
  //await token.deployed();
  //console.log("Token deployed to address:", token.address);

  //const Token_ADDY = '';

  //const token = new ethers.Contract(Token_ADDY, Token.interface, deployer);
  //console.log("Found Token at address:", token.address);

  const BasicTransfers = await ethers.getContractFactory("BasicTransfers");
  //const basicTransfers = await BasicTransfers.deploy();
  //console.log("BasicTransfers deploying.. tx:", basicTransfers);
  //await basicTransfers.deployed();
  //console.log("BasicTransfers deployed to address:", basicTransfers.address);

  const BasicTransfers_ADDY = '0xe40d881cf66e1f6d19979a5ff6c830c6af65d278';

  const basicTransfers = new ethers.Contract(BasicTransfers_ADDY, BasicTransfers.interface, deployer);
  console.log("Found BasicTransfers at address:", basicTransfers.address);

  //await token.setRecycler(nft.address, true);
  //console.log("Token added NFT minter at address:", nft.address);

  //await token.allocate(nft.address, ethers.utils.parseEther('7500000'));
  //console.log("Token allocated NFT 7500000 BULL");

  //await nft.setTreasury(deployer.address);
  //console.log("NFT setTreasury to ", deployer.address);

  //await nft.setHarvestToken(token.address);
  //console.log("NFT setHarvestToken to ", token.address);

  //saveFrontendFiles();

}

function saveFrontendFiles() {
  const fs = require("fs");
  const contractsDir = __dirname + "/../abi";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const GMTokenArtifact = artifacts.readArtifactSync("GMToken");
  const BasicTransfersArtifact = artifacts.readArtifactSync("BasicTransfers");

  fs.writeFileSync(
    contractsDir + "/GMToken.json",
    JSON.stringify(GMTokenArtifact, null, 2)
  );

  fs.writeFileSync(
    contractsDir + "/BasicTransfers.json",
    JSON.stringify(BasicTransfersArtifact, null, 2)
  );


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
