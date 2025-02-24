export const ABI = [
	// erc 20
	'function name() public view returns (string memory)', //  name
	'function symbol() public view returns (string memory)', // 代币
	'function decimals() external view returns (uint8)', // 单位
	'function initialSupply() external view returns (uint256)', // 初始发行量
	'function totalSupply() external view returns (uint256)', // 总供给
	'function balanceOf(address account) external view returns (uint256)', // 获取余额
	'function transfer(address _to, uint256 _value) public returns (bool success)',
	'event Transfer(address indexed from, address indexed to, uint256 value)', // 转账事件
	'function approve(address spender, uint256 amount) public returns (bool)', // 授权
	'function receive() external payable', // 授权

	// 业务 abi - pex
	'function lpBond(uint256 random, uint256 pexAmountMin, uint256 deadline) public payable',
	'function ethBond(uint256 random) public payable',
	'function stake(uint256 pexAmount, uint256 random) public',
	'function unStake(uint256 id) public',
	'function calculationProfit(uint256 id) public view returns (uint256)',
	'function claimProfit(uint256 id, uint256 random) public',
	'function accelerateProfit(uint256 id, uint256 day) public',
	'function getFreeRisk() public view returns (uint256) ',
	'function getEthUSDBNeeded(uint256 ethAmount) public view returns (uint256)',
	'function getPexUSDBNeeded(uint256 pexAmount) public view returns (uint256)',
	'function getPexUSDBPrice() public view returns (uint256)',
	'function getLpRewardRate() public view returns (uint256)',
	'function getProfitById(uint256 id) public view returns (uint256)',
	'function getNextRebase() public view returns (uint256)',
	'function calculationProfit(uint256 id) public view returns (uint256)',
	'function getClaimProfitById(uint256 id) public view returns (uint256)',

	// 业务 abi - win
	'function getPrice() public view returns (uint256)',
	'function redeem(uint256 win) public ',

	// 业务 abi - front
	'function getEthBalance(address user) public view returns (uint256)',
	'function getEthPrice() public view returns (uint256)',
	'function getLpBondParams(uint256 ethAmount) public view returns (address, uint256, uint256)',

	// 业务 abi - ido
	'function claimPex65() public',
	'function claimPex35() public',
	'function getPart65(address user) public view returns (uint256)',
	'function getPart35(address user) public view returns (uint256)',
	'function getClaimed35(address user) public view returns (uint256)',
	'function getCanClaim35(address user) public view returns (uint256)',
	'function getTotal() public view returns (uint256)',

	// 业务 abi - 国库多签
	'function joinDirector() public',
	'function createProposal(uint256 random) public',
	'function passProposal(uint256 random) public',
	'function getDirector() public view returns (bool)',
	'function getProposal(uint256 random) public view returns (bool)',
	'function getPass(uint256 random) public view returns (uint256)',
	'function recharge(address tokenAddr, uint256 random, uint256 amount) public',

]

export const USDB_CONTRACT_ADDR = '0x4300000000000000000000000000000000000003'
export const PHOENIX_CONTRACT_ADDR = '0xae57fe379494B30Ec1E085Fb8a87d9C2FdcbcA2a'
export const SPHOENIX_CONTRACT_ADDR = '0x4dDCf401D60C6A082c875E4210144Eac9c3d4C99'
export const WIN_CONTRACT_ADDR = '0x6dEc79E56F593D1E3224044C1a23Ae0a09C48344'
export const WIN1_CONTRACT_ADDR = '0x72386eC9e3835EeA595FF7fD1eE935CD7e0fCc92'
export const DAO_CONTRACT_ADDR = '0x01c05794a61df8B22A2f677F07F8B76777055d4F'
export const FRONT_CONTRACT_ADDR = '0x4EAdDF67Fe00df01c80E60dF51EC0389dD628417'
export const IDO_CONTRACT_ADDR = '0x601b2bAd02C3Ffc475cc9818b49664DCd6660C6C'
export const GAME_CONTRACT_ADDR = '0xc01fa097167f58951f2EDf568Eaaac5A0d8c18D9'