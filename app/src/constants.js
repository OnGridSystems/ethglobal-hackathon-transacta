import networks from './networks.json';

export const supportedChainIds = Object.keys(networks).map((id) => Number(id));

export const networksLogos = {
  280: '/img/networks/zkSync.svg',
  534353: '/img/networks/Scroll.svg',
  1442: '/img/networks/polygon.svg',
  5: '/img/networks/mainnet.svg',
};
