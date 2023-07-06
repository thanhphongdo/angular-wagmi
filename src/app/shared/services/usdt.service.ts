import { Injectable } from '@angular/core';
import { WagmiService } from './wagmi.service';
import { USDTABI } from '../../mocks/usdt-abi'

@Injectable({
  providedIn: 'root'
})
export class UsdtService {

  constructor(private wagmiService: WagmiService) { }

  connectUSDTContract() {
    return this.wagmiService.getContract('0xa56cb27bfcb2526626eb5eb3d121be5e6ff5575c', USDTABI);
  }

  async mint(value: any) {
    return await this.wagmiService.writeContract('0xa56cb27bfcb2526626eb5eb3d121be5e6ff5575c', USDTABI, 'mint', [
      this.wagmiService.getConnectedAccount(),
      value
    ]);
  }

  async getBalance() {
    return await this.wagmiService.readContract('0xa56cb27bfcb2526626eb5eb3d121be5e6ff5575c', USDTABI, 'balanceOf', [
      this.wagmiService.getConnectedAccount()
    ]);
  }
}
