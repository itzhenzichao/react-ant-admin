import Style from './index.module.scss'
import { useEffect } from 'react'

import * as echarts from 'echarts'

function Bar() {
  function init() {
    const chartDom = document.getElementById('statistics-bar')
    if (!chartDom) return
    const myChart = echarts.init(chartDom)

    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    }

    option && myChart.setOption(option)
  }
  useEffect(() => {
    return () => {
      init()
    }
  }, [])
  return <div id="statistics-bar" className={Style.bar}></div>
}

export default Bar
