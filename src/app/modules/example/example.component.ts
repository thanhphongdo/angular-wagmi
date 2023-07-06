import { Component } from '@angular/core';
import { utils } from 'ethers';
import { UsdtService } from 'src/app/shared/services/usdt.service';
import { WagmiService } from 'src/app/shared/services/wagmi.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  balance: any = 0;
  constructor(
    private wagmiService: WagmiService,
    private usdtService: UsdtService
  ) { }

  connect() {
    this.wagmiService.connect();
  }
  disconnect() {
    this.wagmiService.disconnect();
  }
  mintUSDT() {
    this.usdtService.mint(1000000);
  }
  async balanceOfUSDT() {
    const balance: any = await this.usdtService.getBalance();
    this.balance = utils.formatUnits(balance, 6);
  }
}
