<template>
  <div
    ref="echarRef"
    class="h-full w-full"
  ></div>
</template>
<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, defineProps, defineEmits, ref, watchEffect } from "vue";
import { mapJson } from "./map";

const echarRef = ref<HTMLElement>();
const props = defineProps({
  id: String,
  data: Array,
  mapData: Array,
});
const clickEmit = defineEmits(["receiveClick"]);

const echartInit = () => {
  const myChart = echarts.init(echarRef.value);
  echarts.registerMap("js", mapJson);
  const mapData = props.mapData || [];
  // 指定图表的配置项和数据
  const option = {
    // visualMap: {
    //   show: false,
    //   max: 100,
    //   seriesIndex: [3],
    //   inRange: {
    //     color: ["#ffffff", "#000000"]
    //   }
    // },
    geo: [
      {
        map: "js",
        roam: false, // 是否允许缩放
        zoom: 1.1, // 默认显示级别
        label: {
          show: true,
          color: "#fff",
          fontWeight: "bold",
          fontSize: 12,
        },
        scaleLimit: {
          min: 0,
          max: 3,
        }, // 缩放级别
        itemStyle: {
          borderColor: "rgb(95,210,246)",
          borderWidth: 3,
          shadowBar: 4,
          areaColor: "#013C62",
          //   emphasis: {
          //     areaColor: "#184cff",
          //     shadowOffsetX: 0,
          //     shadowOffsetY: 0,
          //     shadowBlur: 5,
          //     borderWidth: 0,
          //     shadowColor: "rgba(0, 0, 0, 0.5)",
          //   },
        },
        select: {
          itemStyle: {
            areaColor: "#56afe1",
          },
          label: {
            color: "#fff",
          },
        },
        tooltip: {
          show: true,
        },
      },
    ],
    // tooltip: {
    //   trigger: "item",
    //   triggerOn: "mousemove",
    //   hideDelay: "10",
    //   formatter(params) {
    //     return format(params.data)
    //   }
    // },
    series: [
      {
        type: "map",
        geoIndex: 0,
        data: props.data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        geoIndex: 0,
        data: props.data,
        symbolSize: 60,
        symbolKeepAspect: true,
        label: {
          show: true,
          formatter: "{b}",
          textBorderColor: "transparent",
          color: "#000",
        },
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart.on(
    "click",
    function (params) {
      clickEmit("receiveClick", params.name);
    },
    100
  );
};
onMounted(() => {
  setTimeout(() => echartInit(), 1000);
});
// watchEffect(() => {
//   if (echarRef.value) {
//     echartInit()
//   }
// })
</script>
<style scoped lang="less"></style>
