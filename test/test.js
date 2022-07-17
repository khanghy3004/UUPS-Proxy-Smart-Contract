const hre = require('hardhat');
it("Test Proxy", async function () {
    const [owner, addr1, addr2] = await hre.ethers.getSigners();

    const RunTogetherBoxNFT = await hre.ethers.getContractFactory("RunTogetherBoxNFT");
    const HeroesTdProxy = await hre.ethers.getContractFactory("HeroesTdProxy");
    const HeroesTdProxyV2 = await hre.ethers.getContractFactory("HeroesTdProxyV2");
    const instanceRunTogetherBoxNFT = await RunTogetherBoxNFT.deploy();
    const instanceHeroesTdProxy = await hre.upgrades.deployProxy(HeroesTdProxy, [instanceRunTogetherBoxNFT.address]);
    const instanceHeroesTdProxyV2 = await hre.upgrades.upgradeProxy(instanceHeroesTdProxy, HeroesTdProxyV2);

    console.log("HeroesTdProxy", instanceHeroesTdProxy.address);
    console.log("HeroesTdProxyV2", instanceHeroesTdProxyV2.address);
    // mint nft
    await instanceRunTogetherBoxNFT.safeMint(owner.address);
    await instanceRunTogetherBoxNFT.safeMint(owner.address);
    await instanceRunTogetherBoxNFT.safeMint(owner.address);


    // approveforall
    await instanceRunTogetherBoxNFT.setApprovalForAll(instanceHeroesTdProxy.address, true);
    await instanceRunTogetherBoxNFT.setApprovalForAll(instanceHeroesTdProxyV2.address, true);

    // transfer
    await instanceHeroesTdProxyV2.multiTransferV2(addr1.address, 0);

    console.log(await instanceRunTogetherBoxNFT.balanceOf(addr1.address));
});
