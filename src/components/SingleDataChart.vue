<script setup lang="ts">
const props = defineProps({
  AllStockData: Object,
})
import useChart from "@/composables/useBarChart"
import { StockDataType, StockDataTable, StockSingleDataChart } from "@/types/StockData"
const { AllStockData } = toRefs(props)
const CurrentStockCode = ref<string>('')
const TimeFilter = ref<string>('')
const Chart = ref(null)
const { setElement, setOption, resize } = useChart()
onMounted(async () => {
  //set init chart
  setElement(Chart.value, "單股票收益率圖表")//set chart element
  setOption([])//set init chart option
  window.addEventListener("resize", () => {
    resize()
  })
})
const CurrentData = computed((): StockDataType[] => {//process current stockcode
  let Data
  if (AllStockData.value && CurrentStockCode.value !== "") {
    Data = AllStockData.value[CurrentStockCode.value]
  } else {
    Data = []
  }
  //舊寫法
  // let Data = Object.values(AllStockData.value).filter((item: StockDataType[]) => {
  //   if (item !== undefined) {
  //     return item[0].symbol === CurrentStockCode.value
  //   }
  // }) as StockDataType[][]
  if (Data.length === 0) {
    return []
  }
  return Data
})
const AllOrderData = computed(() => {
  if (CurrentData.value.length) {
    if (TimeFilter.value && TimeFilter.value.length) {
      return CurrentData.value.reduce((acc, item) => {//process orderType is open
        if (TransFormDate(item.datetime) >= TransFormDate(TimeFilter.value[0]) && TransFormDate(item.datetime) <= TransFormDate(TimeFilter.value[1])) {
          acc.push({ "orderId": item.orderId, "orderType": item.orderType, "datetime": item.datetime, "income": item.income, "incomeRate": TransFormRate(item.incomeRate) + "%" })
        }
        return acc
      }, [] as StockDataTable[])
    }
    return CurrentData.value.reduce((acc, item) => {//process orderType is open
      acc.push({ "orderId": item.orderId, "orderType": item.orderType, "datetime": item.datetime, "income": item.income, "incomeRate": TransFormRate(item.incomeRate) + "%" })
      return acc
    }, [] as StockDataTable[])
  }
  return []
})
const ChartData = computed(() => {
  if (CurrentData.value.length) {
    if (TimeFilter.value && TimeFilter.value.length) {
      return CurrentData.value.reduce((acc, item) => {//process orderType is open
        if (item.orderType === "close") {
          if (TransFormDate(item.datetime) >= TransFormDate(TimeFilter.value[0]) && TransFormDate(item.datetime) <= TransFormDate(TimeFilter.value[1])) {
            acc.push({ "orderId": item.orderId, "datetime": item.datetime, "incomeRate": TransFormRate(item.incomeRate) })
          }
        }
        return acc
      }, [] as StockSingleDataChart[])
    }
    return CurrentData.value.reduce((acc, item) => {//process orderType is open
      if (item.orderType === "close") {
        acc.push({ "orderId": item.orderId, "datetime": item.datetime, "incomeRate": TransFormRate(item.incomeRate) })
      }
      return acc
    }, [] as StockSingleDataChart[])
  }
  return []
})
const TransFormRate = (val) => {
  return Math.round(val * 10000) / 100
}
const TransFormDate = (val) => {
  return new Date(val)
}
watch(AllStockData, () => {
  CurrentStockCode.value = ""
  setOption([])
})
</script>

<template>
  <div>
    <div style="display: flex;align-items: center;margin-top: 10px;">
      <el-select v-model="CurrentStockCode" class="m-2" placeholder="請選擇代碼" @change="setOption(ChartData)">
        <el-option v-for="(_, idx) in AllStockData" :key="idx" :label="idx" :value="idx" />
      </el-select>
      <el-date-picker v-model="TimeFilter" type="daterange" range-separator="到" start-placeholder="起始日"
        end-placeholder="結束日" style="width: 300px;flex-grow: 0;" @change="setOption(ChartData)" />
    </div>
    <div ref="Chart" style="height:500px;width: 100%;"></div>
    <el-table :data="AllOrderData" stripe height="250" style="width: 100%" v-if="CurrentData && CurrentData.length">
      <el-table-column prop="orderId" label="orderId" />
      <el-table-column prop="orderType" label="orderType" />
      <el-table-column prop="datetime" label="datetime" />
      <el-table-column prop="income" label="income" />
      <el-table-column prop="incomeRate" label="incomeRate" />
    </el-table>
  </div>
</template>

<style lang='scss' scoped></style>
