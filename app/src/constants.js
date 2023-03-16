import networks from './networks.json';

export const supportedChainIds = Object.keys(networks).map((id) => Number(id));

export const networksLogos = {
  42: '/img/networks/mainnet.svg',
  97: '/img/networks/BSC.svg',
  80001: '/img/networks/polygon.svg',
};
