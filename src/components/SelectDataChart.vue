<script setup lang="ts">
const props = defineProps({
    AllStockData: Object,
})
import useChart from "@/composables/useDataSetChart"
import { StockDataObject, StockSelectDataChart } from "@/types/StockData"
const { AllStockData } = toRefs(props)
const CurrentStockCode = ref<[]>([])
const Result = ref<StockDataObject<StockSelectDataChart> | {}>({})
const Chart = ref(null)
const SelectMenu = ref(false)
const { setElement, setOption, resize } = useChart()

onMounted(async () => {
    //set init chart
    Result.value = await fetch(`${process.env.NODE_ENV == 'development' ? "" : "/StockEchart"}/results_1691845402.json`)
        .then(res => res.json())
    setElement(Chart.value, "多股票收益率比較圖表")//set chart element
    //setOption([])//set init chart option
    window.addEventListener("resize", () => {
        resize()
    })
})
// const CurrentData = computed((): StockDataType[][] => {//process current stockcode
//     let Data = []
//     if (AllStockData.value && CurrentStockCode.value.length) {
//         Object.keys(AllStockData.value).filter((item) => {
//             if (CurrentStockCode.value.includes(item as never)) {
//                 Data.push(AllStockData.value[item])
//             }
//         })
//     } else {
//         Data = []
//     }
//     //舊寫法
//     // let Data = Object.values(AllStockData.value).filter((item: StockDataType[]) => {
//     //     if (item !== undefined) {
//     //         return CurrentStockCode.value.includes(item[0].symbol as never)
//     //     }
//     // }) as StockDataType[][]
//     if (Data.length === 0) {
//         return []
//     }
//     return Data
// })
// const AllOrderData = computed(() => {
//     if (CurrentData.value.length) {
//         let Data = CurrentData.value.reduce((acc1, item1) => {//process orderType is open
//             let item = item1.reduce((acc2, item2) => {
//                 acc2.push({ "orderId": item2.orderId, "orderType": item2.orderType, "datetime": item2.datetime, "income": item2.income, "incomeRate": item2.incomeRate })
//                 return acc2
//             }, [] as StockDataTable[])
//             acc1.push(...item)
//             return acc1
//         }, [] as StockDataTable[])
//         return Data
//     }
//     return []
// })
const ChartData = computed(() => {
    // if (CurrentStockCode.value.length && Result.value) {
    //     const idx = [
    //         "total_trading_count",
    //         "win_count",
    //         "win_rate",
    //         "total_profit",
    //         "average_profit_per_trading",
    //         "average_profit",
    //         "average_loss",
    //         "max_drawdown",
    //         "odds",
    //         "expectation_of_net_profit"
    //     ]
    //     let Data = [
    //         { InfoName: "total_trading_count" },
    //         { InfoName: "win_count" },
    //         { InfoName: "win_rate" },
    //         { InfoName: "total_profit" },
    //         { InfoName: "average_profit_per_trading" },
    //         { InfoName: "average_profit" },
    //         { InfoName: "average_loss" },
    //         { InfoName: "max_drawdown" },
    //         { nfoName: "odds" },
    //         { InfoName: "expectation_of_net_profit" }
    //     ]
    //     CurrentStockCode.value.map((item: string) => {
    //         let ItemName = item.replace('.csv', '')
    //         let temp = Result.value[ItemName] as StockDataChart
    //         delete temp.max_drawdown_date
    //         idx.map((item, index) => {
    //             Data[index][ItemName] = temp[item]
    //         })
    //     })
    //     console.log(Data)
    //     return Data
    // }
    if (CurrentStockCode.value.length && Result.value) {
        let Data = []
        CurrentStockCode.value.map((item: string) => {
            let ItemName = item.replace('.csv', '')
            let temp = Result.value[ItemName] as StockSelectDataChart
            delete temp.max_drawdown_date
            Data.push({ "StockCode": ItemName, ...temp })
        })
        console.log(Data)
        return Data
    }
    return []
})
// const DataName = computed(() => {
//     if (CurrentStockCode.value.length && Result.value) {
//         let Data = ['InfoName']
//         CurrentStockCode.value.map((item: string) => {
//             let ItemName = item.replace('.csv', '')
//             Data.push(ItemName)
//         })
//         return Data
//     }
//     return []
// })
watch(AllStockData, () => {
    CurrentStockCode.value = []
    setOption([])
})
</script>

<template>
    <div>
        <el-button @click="SelectMenu = true">選擇代碼</el-button>
        <!-- <el-button @click="clear()" type="danger">清除畫布</el-button> -->
        <el-dialog v-model="SelectMenu" title="代碼選擇" width="50%">
            <el-checkbox-group v-model="CurrentStockCode" @change="setOption(ChartData)">
                <el-checkbox v-for="(_, idx) in AllStockData" :key="idx" :label="idx" :value="idx" />
            </el-checkbox-group>
            <template #footer>
                <span>
                    <el-button @click="SelectMenu = false">關閉</el-button>
                </span>
            </template>
        </el-dialog>
        <div ref="Chart" style="height:750px;width: 100%;"></div>
        <!-- <el-table :data="AllOrderData" stripe height="250" style="width: 100%" v-if="CurrentData && CurrentData.length">
            <el-table-column prop="orderId" label="orderId" />
            <el-table-column prop="orderType" label="orderType" />
            <el-table-column prop="datetime" label="datetime" />
            <el-table-column prop="income" label="income" />
            <el-table-column prop="incomeRate" label="incomeRate" />
        </el-table> -->
    </div>
</template>

<style lang='scss' scoped></style>
