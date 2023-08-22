<script setup lang="ts">
import { StockDataObject, StockDataType } from "@/types/StockData"
const AllStockData = ref<StockDataObject<StockDataType> | {}>({})//AllData
const AllStockType = ref<{}>({})//AllStockType
const CurrentStockType = ref<any>({
  Type: null,
  IndustryType: [],
})//CurrentStockCode
onMounted(async () => {
  //get data
  AllStockData.value = await fetch(`${process.env.NODE_ENV == 'development' ? "" : "/StockEchart"}/records.json`)
    .then(res => res.json())
  // console.log(AllStockData.value)
  AllStockType.value = await fetch(`${process.env.NODE_ENV == 'development' ? "" : "/StockEchart"}/stocks_info.json`)
    .then(res => res.json())
  // console.log(AllStockType.value)
  //set init chart
})
const StockData = computed((): StockDataObject<StockDataType> => {//process current stockcode
  let Data = {}
  if (CurrentStockType.value.Type && CurrentStockType.value.IndustryType) {
    CurrentStockType.value.IndustryType.map((StockType: string) => {
      AllStockType.value[CurrentStockType.value.Type][StockType].map((StockCode: string) => {
        Data[`${StockCode}.csv`] = AllStockData.value[`${StockCode}.csv`]
      })
    })
    // AllStockType.value[CurrentStockType.value.Type][CurrentStockType.value.IndustryType].map((item: string) => {
    //   Data[`${item}.csv`] = AllStockData.value[`${item}.csv`]
    // })
    return Data
  }
  return {}
})


</script>

<template>
  <el-select v-model="CurrentStockType.Type" class="m-2" placeholder="請選擇上市上櫃類型"
    @change="CurrentStockType.IndustryType = ''">
    <el-option v-for="(_, idx) in AllStockType" :key="idx" :label="idx" :value="idx" />
  </el-select>
  <el-select v-model="CurrentStockType.IndustryType" class="m-2" placeholder="請選擇產業類型" multiple style="width: 240px">
    <el-option v-for="(_, idx) in AllStockType[CurrentStockType.Type]" :label="idx" :value="idx" />
  </el-select>
  <SingleDataChart :AllStockData="StockData" />
  <hr>
  <SelectDataChart :AllStockData="StockData" />
</template>

<style lang='scss' scoped></style>
