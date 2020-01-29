import { Component, Input } from '@angular/core';
import { area as d3_area, curveBasis } from 'd3-shape';

export interface AreaChartItem {
  width: number;
  height: number;
  barWidth: number;
  data: any[];
  selectedItem: any;
  mouseOver: any;
}

@Component({
  selector: '[app-area-chart]',
  templateUrl: './area-chart.component.html'
})
export class AreaChartComponent {
  @Input() item: AreaChartItem;

  getAreaPath(): string {
    const area = d3_area()
      .curve(curveBasis)
      .x(d => d.x)
      .y0(d => d.y0)
      .y1(d => d.y1);
    return area(this.item.data);
  }
}
