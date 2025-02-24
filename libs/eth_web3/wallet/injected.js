export default {
  name: 'injected', // 钱包名字
  network: null,
  /**
   * 接口 rpc
   * @returns {josnrpc}
   */
  provider() {
    // 连代理
    let provider = null;
    if (typeof window.ethereum !== 'undefined') {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      throw new Error('no install !');
    }
    return provider;
  },
  /**
   * 是否连接
   * @returns {boolean}
   */
  isConnected() {
    return this.provider().isConnected();
  },
  /**
   * 连接钱包
   */
  async connect() {
    if (this.isConnected()) await this.request('wallet_requestPermissions', [{
      eth_accounts: {}
    }]);
    await this.request('eth_requestAccounts');
  },
  /**
   *  设置网络
   * @param {network} network
   * @returns {Promise}
   */
  async setNetwork(network) {
    let err = null;
    // 尝试切换
    try {
      await this.provider().request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: network.chainId
        }],
      });
    } catch (error) {
      err = error;
    }
    if (err && err.code === 4902) {
      // 尝试添加
      err = null;
      // console.warn(` is not find network ${network.chainName || network.chainId} `);
      try {
        const timeout = new Promise((resolve, reject) => {
          // 超时
          const timer = setTimeout(() => {
            reject(new Error('switch timeout 10s'));
          }, 10 * 1000);
          window.addEventListener('unload', () => {
            clearInterval(timer);
          });
        });
        await Promise.race([timeout, this.request('wallet_addEthereumChain', [{
          ...network
        }])]);
      } catch (error) {
        if (error) err = error;
      }
    }
    if (err) {
      // console.error(` is set network ${network} error: ${err}`);
      return Promise.reject(err);
    }
    this.network = network;
  },
  /**
   * 添加代币
   * @param {{ address, symbol, image, decimals = 18, type = 'ERC20' }} param
   */
  async watchAsset({
    address,
    symbol,
    image,
    decimals = 18,
    type = 'ERC20'
  }) {
    return await this.request('wallet_watchAsset', {
      type,
      options: {
        address,
        symbol,
        image,
        decimals,
      },
    });
  },
  /**
   * 账户地址
   * @returns {string}
   */
  address() {
    return this.provider().selectedAddress;
  },
  /**
   * 发送请求
   * @param {string} method
   * @param {any} params
   */
  async request(method, params) {
    return await this.provider().request({
      method,
      params
    });
  },
};