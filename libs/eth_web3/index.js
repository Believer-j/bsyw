import {
	BigNumber,
	FixedNumber,
	utils,
	getDefaultProvider,
	providers,
	Contract,
	ContractFactory
} from 'ethers';
import {
	getWallet,
	wallets
} from './wallet'; // 钱包
/**
 * 获取网络 id0
 * @param {*} network
 * @returns
 */
function getNetworkVersion(chainId) {
	return chainId && typeof chainId.toString().includes('0x') ? parseInt(chainId, 16) : chainId;
}

class Web3 {

	BigNumber = BigNumber;
	FixedNumber = FixedNumber;
	utils = utils; // 工具函数
	wallets = wallets; // 所有钱包名字

	provider = null; // 供应商
	signer = null; // 签名者
	wallet = null; // 钱包
	config = null; // 配置 {rpcs,keys}
	network = null; // 网络
	walletProvider = null; // 钱包 prover

	constructor(config = {}) {
		this.config = config;
	}

	/**
	 * 初始化 web3
	 * @param {*} network
	 */
	initNetwork(network) {
		if (network) {
			this.setNetwork(network);
		}
	}

	/**
	 * 初始化钱包
	 * @param {string} wallet name
	 */
	initWallet(wallet) {
		if (wallet && this.wallets.includes(wallet)) {
			const walleter = getWallet(wallet); // 设置钱包
			this.wallet = walleter; // 设置钱包
		} else {
			throw new Error(`${wallet} Wallet is not supported !`);
		}
	}

	/**
	 * 设置网络
	 * @param {object} network
	 */
	setNetwork(network = this.network) {
		this.network = network;
	}

	/**
	 * 获取 provider
	 * @param {string,object} options
	 * @returns
	 */
	getProvider(network = this.network, config = this.config) {
		let provider = null;
		const networkId = getNetworkVersion(network.chainId || network);
		const {
			keys,
			rpcs
		} = config;
		const fallbackConfig = [];
		if (this.Web3Provider) {
			fallbackConfig.push({
				stallTimeout: 1 * 500,
				weight: 1,
				priority: 1,
				provider: new providers.Web3Provider(this.Web3Provider),
			});
		}
		if (keys.etherscan) {
			fallbackConfig.push({
				stallTimeout: 1 * 500,
				weight: 1,
				priority: 1,
				provider: new providers.EtherscanProvider(networkId, keys.etherscan),
			});
		}
		if (keys.infura) {
			fallbackConfig.push({
				stallTimeout: 1 * 500,
				weight: 1,
				priority: 1,
				provider: new providers.InfuraWebSocketProvider(networkId, keys.infura),
			});
		}
		if (keys.alchemy) {
			fallbackConfig.push({
				stallTimeout: 1 * 500,
				weight: 1,
				priority: 1,
				provider: new providers.AlchemyWebSocketProvider(networkId, keys.alchemy),
			});
		}
		if (keys.pocket) {
			fallbackConfig.push({
				stallTimeout: 1 * 500,
				weight: 1,
				priority: 1,
				provider: new providers.PocketProvider(networkId, keys.pocket),
			});
		}
		if (keys.ankr) {
			fallbackConfig.push({
				stallTimeout: 1 * 500,
				weight: 1,
				priority: 1,
				provider: new providers.AnkrProvider(networkId, keys.ankr),
			});
		}
		if (rpcs) {
			rpcs.forEach((item) => {
				if (item.networks) {
					if (item.networks.includes(networkId) || item.networks.includes(network)) {
						fallbackConfig.push({
							stallTimeout: 1 * 500,
							weight: 2,
							priority: 1,
							provider: getDefaultProvider(item.url, networkId),
						});
					}
				} else {
					fallbackConfig.push({
						stallTimeout: 1 * 500,
						weight: 2,
						priority: 1,
						provider: getDefaultProvider(item, networkId),
					});
				}
			});
		}
		provider = new providers.FallbackProvider(fallbackConfig, 1);
		return provider;
	}

	/**
	 * 初始化 wallet provder
	 */
	initWalletProvider() {
		this.walletProvider = new providers.Web3Provider(this.wallet.provider()); // 钱包 prover
	}

	/**
	 * 初始化 singer
	 */
	initSinger() {
		this.signer = this.walletProvider.getSigner(); // 签名者
	}

	/**
	 * 检测 wallet provider
	 */
	async checkWallet() {
		if (!this.wallet) {
			return Promise.reject(new Error('not connect wallet!'));
		} else {
			await this.wallet.connect(); // 连接
		}
	}

	/**
	 * 检测 wallet provider
	 */
	async checkWalletProvider() {
		if (!this.wallet) {
			return Promise.reject(new Error('not connect wallet!'));
		} else if (!this.walletProvider && this.wallet) {
			await this.initWalletProvider();
		}
		await this.walletProvider.ready;
	}

	/**
	 * 检测 singer
	 */
	async checkSinger() {
		if (!this.wallet || !this.walletProvider) {
			return Promise.reject(new Error('not connect wallet!'));
		} else if (!this.signer && this.wallet) {
			await this.initSinger();
		}
		await this.signer.ready;
	}

	/**
	 * 检测网络
	 */
	async checkNetwork() {
		const networkVersion = getNetworkVersion(this.network.chainId || this.network);
		if (this.wallet && this.wallet.provider().chainId) {
			const chainId = await this.wallet.provider().chainId;
			if (networkVersion !== getNetworkVersion(chainId)) {
				await this.wallet.setNetwork(this.network);
			}
		}
		if (this.walletProvider) {
			await this.checkWalletProvider();
			const network = await this.walletProvider.getNetwork();
			if (networkVersion !== getNetworkVersion(network.chainId)) {
				await this.wallet.setNetwork(this.network);
			}
		}
		if (this.signer) {
			await this.checkSinger();
			const id = await this.signer.getChainId();
			if (networkVersion !== getNetworkVersion(id)) {
				await this.initSinger();
			}
		}
	}

	/**
	 * 连接钱包
	 * @param {string} wallet
	 */
	async connectWallet(wallet = 'injected') {
		this.initWallet(wallet);
		await this.checkNetwork(); // 检测网络
		await this.checkWallet(); // 连接
		await this.checkWalletProvider(); // 检测 provider
		await this.checkSinger(); // 检测 singer
	}

	/**
	 * 断开钱包
	 */
	async disconnectWallet() {
		this.wallet = null;
		if (this.walletProvider) await this.walletProvider.ready;
		if (this.signer) await this.signer.ready;
		this.walletProvider = null;
		this.signer = null;
	}

	/**
	 * 获取合约
	 * @param {address} addr
	 * @param {Abi} abi
	 * @returns
	 */
	async getContract(addr, abi) {
		await this.checkNetwork();
		if (this.wallet) await this.checkWalletProvider();
		return new Contract(addr, abi, this.Web3Provider); // 获取合约
	}

	/**
	 * 获取 Singer 合约
	 * @param {address} addr
	 * @param {Abi} abi
	 * @returns
	 */
	async getSingerContract(addr, abi) {
		await this.checkNetwork();
		await this.checkWalletProvider();
		await this.checkSinger();
		return new Contract(addr, abi, this.signer); // 新建合约
	}

	/**
	 * 创建一个合约
	 * @param {Abi} abi
	 * @param {bytecode} bytecode
	 * @returns
	 */
	async createContract(abi, bytecode) {
		await this.checkNetwork();
		await this.checkSinger();
		return new ContractFactory(abi, bytecode, this.signer); // 创建一个合约
	}
}

export default Web3;