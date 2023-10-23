import { Component, Input, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-chart-bar-vertical-grouped',
  templateUrl: './chart-bar-vertical-grouped.component.html',
  styleUrls: ['./chart-bar-vertical-grouped.component.scss']
})
export class ChartBarVerticalGroupedComponent implements OnInit {
  @Input() dataSource: any[];
  // view: any[] = [700, 400];
  view = undefined;

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  noBarWhenZero: boolean = true;
  groupPadding: number = 5;
  barPadding: number = 0;
  @Input() showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  @Input() colorArray: string[] = [];
  legendTitle: string = 'Legend';
  legendPositionBelow: LegendPosition = LegendPosition.Below;
  legendPositionRight: LegendPosition = LegendPosition.Right;


  colorScheme : Color = {
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
    this.colorScheme.domain = this.colorArray.length > 0 ? this.colorArray : this.colorScheme.domain
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
