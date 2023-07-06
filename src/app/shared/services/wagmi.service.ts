import { Injectable } from '@angular/core';
import {
  createConfig,
  configureChains,
  mainnet,
  disconnect,
  connect,
  fetchEnsName,
  ConnectResult,
  PublicClient,
  getContract
} from '@wagmi/core';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { publicProvider } from '@wagmi/core/providers/public';
import { polygonMumbai } from '@wagmi/chains';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

@Injectable({
  providedIn: 'root'
})
export class WagmiService {

  wagmiProvider!: ConnectResult<PublicClient>;

  constructor() { }

  async connect() {
    this.wagmiProvider = await connect({
      connector: new InjectedConnector(),
    });
  }
  async disconnect() {
    await disconnect();
  }

  async getContract() {
    const contract = getContract({
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      abi: [],
    })
  }
}
