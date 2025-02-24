import injected from './injected';

export const wallets = ['injected', 'metamask', 'tokenpocket', 'FoxWallet'];

export function getWallet(name) {
  return injected;
}
