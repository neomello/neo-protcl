// Web3 Context - Estado global para conexão Web3
export const web3State = {
  connected: false,
  address: null,
  chainId: null,
}

export function setWeb3State(state) {
  Object.assign(web3State, state)
  return web3State
}

export function getWeb3State() {
  return web3State
}
