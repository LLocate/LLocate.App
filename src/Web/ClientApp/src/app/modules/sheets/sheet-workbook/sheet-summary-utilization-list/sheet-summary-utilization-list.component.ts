import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-sheet-summary-utilization-list',
  templateUrl: './sheet-summary-utilization-list.component.html',
  styleUrls: ['./sheet-summary-utilization-list.component.css']
})
export class SheetSummaryUtilizationListComponent {
  @Input() items: { name: string, amount: number }[];
  @Input() title: string;
  @Input() description: string;
  @Input() total: number;

  constructor(public _global: Globals){}
}
