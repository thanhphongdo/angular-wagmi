import { Component } from '@angular/core';
import { WagmiService } from 'src/app/shared/services/wagmi.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  constructor(private wagmiService: WagmiService) { }

  connect() {
    this.wagmiService.connect();
  }
  disconnect() {
    this.wagmiService.disconnect();
  }
}
