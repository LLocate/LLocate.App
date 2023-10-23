import { Component, Input, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-chart-advanced-pie',
  templateUrl: './chart-advanced-pie.component.html',
  styleUrls: ['./chart-advanced-pie.component.scss']
})
export class ChartAdvancedPieComponent implements OnInit {
  _dataSource : any[];
  @Input() set dataSource(value: any[]){
    if(value){
      this._dataSource = value;
    }
  }
  @Input() title: string = '';
  @Input() isLoading: Boolean;
  
  viewXL: [number, number] = [600, 300];
  viewXS: [number, number] = [300, 200];


  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme : Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ["#27ae60", "#c0392b", "#fdcb6e", "#0984e3", "#fdcb6e", "#8854d0", "#3867d6", "#fa8231", "#0fb9b1", "#26de81", "#130f40"]
  };


  constructor(public global: Globals) {
    
  }

  ngOnInit(): void{

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
