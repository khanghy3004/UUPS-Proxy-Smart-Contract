// migrations/2_deploy.js
const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const RunTogetherBoxNFT = artifacts.require('RunTogetherBoxNFT');
const HeroesTdProxy = artifacts.require('HeroesTdProxy');
const HeroesTdProxyV2 = artifacts.require('HeroesTdProxyV2');

module.exports = async function (deployer) {
  // const instanceRunTogetherBoxNFT = await deployer.deploy(RunTogetherBoxNFT);
  // console.log('instanceRunTogetherBoxNFT', instanceRunTogetherBoxNFT);
  // const instanceHeroesTdProxy = await deployProxy(HeroesTdProxy, ['0x081b75d5438e7e726c27297339cc1454e80bbe85'], {deployer});
  // console.log('instanceHeroesTdProxy', instanceHeroesTdProxy.address);
  const instanceHeroesTdProxyV2 = await upgradeProxy('0xD3da5faf36167199075e2Ae42F1c8844266D4096', HeroesTdProxyV2, {deployer});
  console.log('instanceHeroesTdProxyV2', instanceHeroesTdProxyV2.address);
}