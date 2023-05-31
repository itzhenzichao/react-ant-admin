import Style from './index.module.scss'
import { useEffect } from 'react'

import * as echarts from 'echarts'

function Bar() {
  function init() {
    const chartDom = document.getElementById('statistics-pie');
    if(!chartDom) return
    const myChart = echarts.init(chartDom);
    
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };
    
    option && myChart.setOption(option);
  }
  useEffect(() => {
    return () => {
      init()
    }
  }, [])
  return <div id="statistics-pie" className={Style.pie}></div>
}

export default Bar
