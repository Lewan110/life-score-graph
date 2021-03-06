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

  fetchData(jsonData) {
    const data = JSON.parse(jsonData);
    this.lifeScoreValues = [];
    this.loveValues = [];
    this.happinessValues = [];
    this.dates = [];
    data.forEach(entry => {
      this.dates.push(entry.creation_time.slice(0, 10));
      this.lifeScoreValues.push(entry.life_score);
      this.loveValues.push(entry.love);
      this.happinessValues.push(entry.happiness);
    });

    this.generateGraph();
    this.generateMixedGraph();
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
          data: this.happinessValues,
          color: 'dodgerBlue'
        },
        {
          name: 'Love',
          type: 'bar',
          data: this.loveValues
        },
        {
          name: 'Life Score',
          type: 'line',
          data: this.lifeScoreValues,
          lineStyle: {
            width: 5
          },
        }
      ]
    };
    this.mixedGraph.setOption(option);
  }

  private generateGraph() {
    this.lifeScoreGraph = echarts.init(document.getElementById('life-score-graph'));
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
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '30%']
      },
      series: [
        {
          min: 0,
          max: 1,
          name: 'Life Score',
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          color: 'dimGray',
          lineStyle: {
            color: 'dimGray',
            width: 5
          },
          data: this.updateValuesWithDates(this.lifeScoreValues)
        },
        {
          min: 0,
          max: 1,
          name: 'Happiness',
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          color: 'dodgerBlue',
          lineStyle: {
            color: 'dodgerBlue',
            width: 5
          },
          data: this.updateValuesWithDates(this.happinessValues)
        },
        {
          min: 0,
          max: 1,
          name: 'Love',
          type: 'line',
          smooth: 0.6,
          color: 'red',
          symbol: 'none',
          lineStyle: {
            color: 'red',
            width: 5
          },
          data: this.updateValuesWithDates(this.loveValues)
        }
      ]
    };
    this.lifeScoreGraph.setOption(option);
  }

  private updateValuesWithDates(values): object[] {
    const resultArray = [];
    values.forEach((value, i) => {
      resultArray.push([this.dates[i], value]);
    });
    return resultArray;
  }

}
