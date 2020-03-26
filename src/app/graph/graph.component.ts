import {Component, OnInit} from '@angular/core';
import * as echarts from 'src/assets/echarts.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  lifeScoreGraph;
  lifeScoreData = [['2020-01-01', 0.1], ['2020-02-01', 0.8]];
  happinessData = [['2020-01-01', 0.2], ['2020-02-01', 0.5]];
  loveData = [['2020-01-01', 0.4], ['2020-02-01', 0.6]];

  constructor() {
  }

  ngOnInit() {
    this.generateGraph();
  }

  private generateGraph() {
    this.lifeScoreGraph = echarts.init(document.getElementById('life-score-graph'));
    const option = {
      legend: {
        data: ['Life Score', 'Happiness', 'Love']
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '30%']
      },
      visualMap: {
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: [{
          gt: 1,
          lt: 3,
          color: 'rgba(0, 180, 0, 0.5)'
        }, {
          gt: 5,
          lt: 7,
          color: 'rgba(0, 180, 0, 0.5)'
        }]
      },
      series: [
        {
          name: 'Life Score',
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          lineStyle: {
            color: 'green',
            width: 5
          },
          data: this.lifeScoreData
        },
        {
          name: 'Happiness',
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          lineStyle: {
            color: 'blue',
            width: 5
          },
          data: this.happinessData
        },
        {
          name: 'Love',
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          lineStyle: {
            color: 'red',
            width: 5
          },
          data: this.loveData
        }
      ]
    };
    this.lifeScoreGraph.setOption(option);
  }

  private filter(jsonData) {
    const data = JSON.parse(jsonData);
    this.lifeScoreData = [];
    this.happinessData = [];
    this.loveData = [];
    data.forEach(entry => {
      this.lifeScoreData.push([entry.creation_time.slice(0, 10), entry.life_score]);
      this.happinessData.push([entry.creation_time.slice(0, 10), entry.happiness]);
      this.loveData.push([entry.creation_time.slice(0, 10), entry.love]);
    });
    this.generateGraph();
  }
}
