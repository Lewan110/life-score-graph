import {Component, OnInit} from '@angular/core';
import * as echarts from 'src/assets/echarts.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  lifeScoreGraph;
  mixedGraph;
  lifeScoreData = [['2020-01-01', 0.1], ['2020-01-15', 0.4], ['2020-02-01', 0.8]];
  happinessData = [['2020-01-01', 0.2], ['2020-01-15', 0.9], ['2020-02-01', 0.5]];
  loveData = [['2020-01-01', 0.4], ['2020-01-15', 0.7], ['2020-02-01', 0.6]];
  dates = ['2020-01-01', '2020-01-15', '2020-02-01'];
  lifeScoreValues = [0.1, 0.4, 0.8];
  happinessValues = [0.2, 0.9, 0.5];
  loveValues = [0.4, 0.7, 0.6];

  constructor() {
  }

  ngOnInit() {
    this.generateGraph();
    this.generateMixedGraph();
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
          min: 0,
          max: 1,
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
          min: 0,
          max: 1,
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
          min: 0,
          max: 1,
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

  private generateMixedGraph() {
    this.mixedGraph = echarts.init(document.getElementById('mixed-graph'));
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        data: ['Happiness', 'Love', 'Life Score']
      },
      xAxis: {
        type: 'category',
        data: this.dates
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1,
        boundaryGap: [0, '30%']
      },
      series: [
        {
          name: 'Happiness',
          type: 'bar',
          data: this.happinessValues
        },
        {
          name: 'Love',
          type: 'bar',
          data: this.loveValues
        },
        {
          name: 'Life Score',
          type: 'line',
          data: this.lifeScoreValues
        }
      ]
    };
    this.mixedGraph.setOption(option);
  }

  private fetchData(jsonData) {
    const data = JSON.parse(jsonData);
    this.lifeScoreData = [];
    this.happinessData = [];
    this.loveData = [];
    this.dates = [];
    data.forEach(entry => {
      this.dates.push(entry.creation_time.slice(0, 10));
      this.lifeScoreData.push([entry.creation_time.slice(0, 10), entry.life_score]);
      this.happinessData.push([entry.creation_time.slice(0, 10), entry.happiness]);
      this.loveData.push([entry.creation_time.slice(0, 10), entry.love]);
      this.lifeScoreValues.push(entry.life_score);
      this.loveValues.push(entry.love);
      this.happinessValues.push(entry.happiness);
    });
    this.generateGraph();
    this.generateMixedGraph();
  }

}
