import { Component, Input, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {
  @Input() dataSource: any[];
  @Input() title: string = '';
  @Input() isLoading: Boolean;
  // view: any[] = [700, 400];
  view = undefined;

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPositionBelow: LegendPosition = LegendPosition.Below;
  legendPositionRight: LegendPosition = LegendPosition.Right;

  colorScheme : Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ["#0984e3","#6c5ce7","#d63031", "#00b894", "#fdcb6e", "#8854d0", "#3867d6", "#fa8231", "#0fb9b1", "#26de81", "#130f40"]
  };
  
  constructor(public _global: Globals) { }

  ngOnInit(): void {
    console.log('hello')
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
