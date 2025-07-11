<template>
  <div ref="chartDom" class="chart-container"></div>
</template>

<script setup>
import { ref, watch, onMounted} from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  chartData: Array
});

const chartDom = ref(null);
let chartInstance = null;

const initChart = () => {
  if (!chartDom.value) return;
  
  // 销毁现有实例
  if (chartInstance) {
    chartInstance.dispose();
  }
  
  // 创建新实例
  chartInstance = echarts.init(chartDom.value);
  
  // 处理数据：按项目分组计算总工时
  const projectMap = {};
  props.chartData.forEach(item => {
    if (!projectMap[item.project]) {
      projectMap[item.project] = 0;
    }
    projectMap[item.project] += item.hours;
  });
  
  const projectNames = Object.keys(projectMap);
  const totalHours = projectNames.map(name => projectMap[name]);
  
  // 配置图表选项
  const option = {
    title: {
      text: '项目工时统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c}小时'
    },
    xAxis: {
      type: 'category',
      data: projectNames,
      axisLabel: {
        rotate: 45,
        interval: 0, 
    }
    },
    yAxis: {
      type: 'value',
      name: '工时(小时)'
    },
    series: [{
      name: '总工时',
      type: 'bar',
      data: totalHours,
      barWidth: '60%',
      itemStyle: {
        color: '#3ba1ff'
      }
    }],
    grid: {
      bottom: '30%'
    }
  };
  
  chartInstance.setOption(option);
};

// 响应数据变化
watch(() => props.chartData, initChart, { deep: true });

// 初始化图表
onMounted(() => {
  initChart();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>