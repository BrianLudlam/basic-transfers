// This is an exmaple test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = hre;
const { BigNumber, utils } = ethers;

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` recieves the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Contract Testing", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Token;
  let token;

  let BasicTransfers;
  let basicTransfers;

  let developer;
  let treasury;
  let alice;
  let bob;
  let members;

  let _tx;
  let _receipt;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {

    [developer, treasury, alice, bob, ...members] = await ethers.getSigners();

    Token = await ethers.getContractFactory("GMToken");
    token = await Token.connect(developer).deploy();
    await token.deployed();

    let _tx = await token.connect(developer).setMinter(treasury.address, true);
    let _receipt = await _tx.wait();

    _tx = await token.connect(developer).allocate(treasury.address, ethers.utils.parseEther('10000'));
    _receipt = await _tx.wait();

    expect(await token.balanceOf(alice.address)).to.equal('0');

    _tx = await token.connect(treasury).mint(alice.address, ethers.utils.parseEther('1000'));
    _receipt = await _tx.wait();

    expect(await token.balanceOf(alice.address)).to.equal(ethers.utils.parseEther('1000'));

    BasicTransfers = await ethers.getContractFactory("BasicTransfers");
    basicTransfers = await BasicTransfers.connect(developer).deploy();
    await basicTransfers.deployed();

  });

  describe("Basic Transfers Test", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    it("Should transfer ETH", async function () {
      expect(await ethers.provider.getBalance(alice.address)).to.equal(ethers.utils.parseEther('10000'));
      expect(await ethers.provider.getBalance(bob.address)).to.equal(ethers.utils.parseEther('10000'));

      _tx = await basicTransfers.connect(alice).transferEth(bob.address, { value: ethers.utils.parseEther('1000') });
      _receipt = await _tx.wait();

      expect(await ethers.provider.getBalance(bob.address)).to.equal(ethers.utils.parseEther('11000'));
    });

    it("Should transfer tokens", async function () {
      expect(await token.balanceOf(alice.address)).to.equal(ethers.utils.parseEther('1000'));
      expect(await token.balanceOf(bob.address)).to.equal(ethers.utils.parseEther('0'));

      _tx = await token.connect(alice).approve(basicTransfers.address, ethers.utils.parseEther('1'));
      _receipt = await _tx.wait();

      _tx = await basicTransfers.connect(alice).transferToken(token.address, bob.address, ethers.utils.parseEther('1'));
      _receipt = await _tx.wait();

      expect(await token.balanceOf(alice.address)).to.equal(ethers.utils.parseEther('999'));
      expect(await token.balanceOf(bob.address)).to.equal(ethers.utils.parseEther('1'));
    });

  });

});
