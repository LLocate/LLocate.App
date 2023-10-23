import { Component, Input, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {
  @Input() dataSource: any[];
  @Input() title: string = '';
  // view: any[] = [700, 400];
  view = undefined;


  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  roundDomains: boolean = true;
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  timeline: boolean = true;
  legendPositionBelow: LegendPosition = LegendPosition.Below;
  legendPositionRight: LegendPosition = LegendPosition.Right;

  colorScheme : Color  = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f69434', '#eb3438', '#3a2d2f', '#27ae60']
  };

  constructor(public _global: Globals) { 
    this.showYAxisLabel = this.yAxisLabel.length > 0;
    this.showXAxisLabel = this.xAxisLabel.length > 0;
  }

  ngOnInit(): void {
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
