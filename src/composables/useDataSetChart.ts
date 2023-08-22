import * as echarts from 'echarts/core';
import {
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);
interface Data {
    "orderId": number,
    "datetime": string,
    "incomeRate": number
}
export default () => {
    let chart, ChartTitle
    const setElement = (element: HTMLElement, title: string = "收益率圖表") => {
        chart = echarts.init(element)
        ChartTitle = title
        InitOption()
    }
    // const DataValue = (Data) => {
    //     if (Data.length) {
    //         let AllData = []
    //         Data.map((DataArr) => {
    //             Object.keys(DataArr).map((key: string) => {
    //                 let temp = {
    //                     name: key,
    //                     type: 'line',
    //                     stack: 'Total',
    //                     data: []
    //                 }
    //                 Object.values(DataArr[key]).map((item: Data) => {
    //                     temp.data.push([item.datetime, item.incomeRate])
    //                 })
    //                 AllData.push(temp)
    //             })
    //         })
    //         return AllData
    //     }
    //     return []
    // }
    const SeriesLength = () => {
        let item = []
        for (let i = 0; i < 10; i++) {
            item.push({ type: 'bar' })
        }
        return item
    }
    const InitOption = () => {
        const option = {
            title: {
                text: ChartTitle,
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
            },
            legend: {
                type: 'scroll',
                top: '10%'
            },
            dataset: {
                dimensions: [
                    "StockCode",
                    "total_trading_count",
                    "win_count",
                    "win_rate",
                    "total_profit",
                    "average_profit_per_trading",
                    "average_profit",
                    "average_loss",
                    "max_drawdown",
                    "odds",
                    "expectation_of_net_profit"
                ],
                source: []
            },
            xAxis: {
                type: "category",
            },
            yAxis: {
                //type: 'value',
            },
            series: SeriesLength()
        }
        chart.setOption(option)
    }
    const setOption = (Data) => {
        const option = {
            dataset: {
                source: Data
            }
        }
        chart.setOption(option)
    }
    const resize = (() => chart.resize())
    // const clear = (() => chart.clear())

    return { setElement, setOption, resize, /*clear*/ }
}

