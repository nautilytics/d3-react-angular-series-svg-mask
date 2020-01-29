import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { AxesItem } from './axes/axes.component';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max, range } from 'd3-array';
import { AreaChartItem } from './area-chart/area-chart.component';
import * as moment from 'moment';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html'
})
export class VisualizationComponent implements OnInit, OnChanges {
  @Input() incrementCount: number;
  xScale = scaleTime();
  yScale = scaleLinear();
  width = 960;
  height = 500;
  margin = {
    left: 20,
    right: 20,
    bottom: 20,
    top: 20
  };
  n = 150;
  increment: moment.unitOfTime.DurationConstructor = 'days';
  data: any[];
  selectedItem = null;

  constructor(protected cdr: ChangeDetectorRef) {
  }

  get innerHeight(): number {
    return this.height - this.margin.top - this.margin.bottom;
  }

  get innerWidth(): number {
    return this.width - this.margin.left - this.margin.right;
  }

  ngOnInit(): void {
    this.data = range(this.n / this.incrementCount)
      .map(i => {
        return {
          y: innerHeight / 2 + 150 * Math.sin(i / 5),
          x: moment().subtract(this.incrementCount * i, this.increment)
        };
      });
    this.setAxisScales();
  }

  setAxisScales() {
    // Set up an x- and y-scales
    this.xScale = this.xScale
      .range([0, this.innerWidth])
      .domain(extent(this.data, d => d.x));
    this.yScale = this.yScale
      .range([this.innerHeight, 0])
      .domain([0, max(this.data, d => d.y)]);
  }

  get gTransform(): string {
    return `translate(${this.margin.left},${this.margin.top})`;
  }

  formatAxes(): AxesItem {
    return {
      xScale: this.xScale,
      yScale: this.yScale,
      height: this.innerHeight
    };
  }

  formatAreaChartItem(): AreaChartItem {
    return {
      width: this.innerWidth,
      height: this.innerHeight,
      barWidth: this.innerWidth - this.xScale(moment(this.xScale.domain()[1]).subtract(this.incrementCount, this.increment)),
      data: this.data.map(f => {
        return {
          x: this.xScale(f.x),
          y0: this.yScale(0),
          y1: this.yScale(f.y)
        };
      }),
      selectedItem: this.selectedItem,
      mouseOver: row => {
        this.selectedItem = row;
      }
    };
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.selectedItem = null;
      this.setAxisScales();
      this.cdr.detectChanges();
    }, 1);
  }
}
