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
  getContract,
  readContract,
  writeContract
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

  currentNetwork() {
    return polygonMumbai;
  }

  async connect() {
    try {
      this.wagmiProvider = await connect({
        connector: new InjectedConnector({
          chains: [this.currentNetwork()]
        }),
      });
      localStorage.setItem('CONNECTED_ACCOUNT', this.wagmiProvider.account);
    }
    catch (err: any) {
      console.log(err);
      if (err.message !== 'Connector already connected') {
        alert('Error!!!');
      }
    }
  }

  async disconnect() {
    await disconnect();
    localStorage.removeItem('CONNECTED_ACCOUNT');
  }

  getConnectedAccount() {
    return localStorage.getItem('CONNECTED_ACCOUNT');
  }

  async getContract(address: string, abi: Array<any>) {
    return getContract({
      address: address as any,
      abi: abi,
    })
  }
  async readContract(address: string, abi: Array<any>, functionName: string, args: Array<any>) {
    await this.connect();
    return readContract({
      address: address as any,
      chainId: this.currentNetwork().id,
      abi: abi,
      args,
      functionName
    })
  }
  async writeContract(address: string, abi: Array<any>, functionName: string, args: Array<any>) {
    await this.connect();
    return writeContract({
      address: address as any,
      chainId: this.currentNetwork().id,
      abi: abi,
      args,
      functionName
    })
  }
}
