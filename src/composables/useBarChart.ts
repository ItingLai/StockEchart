import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);
export default () => {
    let chart, ChartTitle
    const setElement = (element: HTMLElement, title: string = "收益率圖表") => {
        chart = echarts.init(element)
        ChartTitle = title
        InitOption()
    }
    const DataValue = (Data) => {
        if (Data.length) {
            let data = Data.map((item) => {
                return item.incomeRate
            })
            return data
        }
        return []
    }
    const DataName = (Data) => {
        if (Data.length) {
            let data = Data.map((item) => {
                return item.datetime
            })
            return data
        }
        return []
    }
    const InitOption = () => {
        const option = {
            title: {
                text: ChartTitle,
                left: "center"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                // formatter: '</br>{c}%'
                formatter: function (params) {
                    return `
                    <div style='margin-bottom:5px;padding:0 12px;width:100%;height:24px;line-height:24px'>
                        <p>
                            ${params[0]['axisValue']}
                        </p>
                    </div>
                    <div style="color: #000;font-size: 14px; padding:0 12px;line-height: 24px">
                        <span style="display:inline-block;margin-right:5px;border-radius:2px;width:10px;height:10px;background-color:#2f89cf"></span>
                        ${[params[0]['data']]}%
                    </div>`
                }
            },
            xAxis: {
                type: "category",
                data: []
            },
            yAxis: {
                type: 'value',
            },
            series: {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                },
                itemStyle: {
                    color: '#2f89cf'
                }
            }
        }
        chart.setOption(option)
    }
    const setOption = (Data) => {
        const option = {
            xAxis: {
                data: DataName(Data)
            },
            series: {
                data: DataValue(Data)
            }
        }
        chart.setOption(option)
    }
    const resize = (() => chart.resize())
    //const clear = (() => chart.clear())

    return { setElement, setOption, resize }
}

