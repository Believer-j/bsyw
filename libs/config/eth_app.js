
export default {
	updateInterval: 60 * 1000, // 数据更新间隔 ms
	// network: '0x38', // 默认网络
	network: '0x13e31', // 默认网络
	wallet: 'metamask', // 默认钱包
	wallets: ['metamask', 'tokenpocket', 'FoxWallet'],
	networks: [
		// 网络配置
		{
			chainId: '0x13e31', // network.chainId.toString(16)
			chainName: 'Blast',
			nativeCurrency: {
				name: 'Blast',
				symbol: 'ETH', // 2-6 characters long
				decimals: 18,
			},
			blockExplorerUrls: ['https://blastscan.io/'],
			rpcUrls: [
				'https://blast.blockpi.network/v1/rpc/38fdc5e22ad9d4874a4aaf56da996a6aba7aa9ef',
				'https://rpc.envelop.is/blast',
				'https://blast-rpc.publicnode.com',
			],
			iconUrls: [''],
		},
	],
	// 主网
	roraContractAddr: '0xd4c354da10C919aD0b5e238bea3a5A9c7856667b', // rora 合约地址 0x17094cd0c8766cfC3D9bAb1C0998F0653D2c73F1 0xD4e1cea6A357b20d98A4dB8865B9c3fbE68b3777
	usdtContractAddr: '0x382bb369d343125bfb2117af9c149795c6c65c50', // usdt 代币地址 0x32Cc4474B9843cD86cb66aC915e9ec646874B390
	lpContractAddr: '0xE215acc499AbbB6B7E792a974e1D47d63bcb3433', // lp 合约地址 0x74428DE96c8aAD4Ea72E0dc2BE18872F1638C5BC 0x9A102aB48358b99437EDCFe8E9E52e754913e172
	batteryContractAddr: '0x56bb9e4E0857f81de82E26b86D2ade5773C92697', // 0x56bb9e4E0857f81de82E26b86D2ade5773C92697 电池合约地址  0x9d6C03Ef7b2eAFd1ab32765cf287a43a8418D91D
	roraProContractAddr: '0xd4c354da10C919aD0b5e238bea3a5A9c7856667b', // 0xd4c354da10C919aD0b5e238bea3a5A9c7856667b rorapro 代币地址  0xec0B5E85F1F544D5efCf594211d57C8218E5a802
	rpfmContractAddr: '0x6Acb951B8fdbe0AE1595083344da28bFEfB5EbD3', // Farm 正式合约地址
	boxContractAddr: '0x565fe5868f93e08dafb0356c9f4b228fb4107810', // 盲盒 正式合约地址
	abi: [
		// erc 20
		'function name() public view returns (string memory)', //  name
		'function symbol() public view returns (string memory)', // 代币
		'function decimals() external view returns (uint8)', // 单位
		'function initialSupply() external view returns (uint256)', // 初始发行量
		'function totalSupply() external view returns (uint256)', // 总供给
		'function balanceOf(address account) external view returns (uint256)', // 获取余额
		'event Transfer(address indexed from, address indexed to, uint256 value)', // 转账事件
		'function approve(address spender, uint256 amount) public returns (bool)', // 授权
		'function liquidityMint() public returns (bool)', // LP提取
		'function getLpClaim(address account) public view returns (uint256)', // 查询 LP 可提取余额
		'function buyNFTCard(uint256 amountRora, uint256 amountUsd, uint256 random) public returns (bool)', // 购买
		'function mintBattery(uint256 amount,uint256 random) public returns (bool)',
		'function buyBattery(address seller,uint256 amount,uint256 random) public returns (bool)',
		'function operateLands(uint256 operate,uint256 amount,uint256 random) public returns (bool)',
		'function exchangeSunshine(uint256 amount,uint256 random) public returns (bool)',
		'function buyTicket(uint256 amount,uint256 random) public returns (bool)',
		'function rechargeUSD(uint256 amount,uint256 random) public returns (bool)',
	],
};