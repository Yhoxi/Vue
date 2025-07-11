<template>
  <a-card>
    <template #title> Tasks</template>
    <div class="card-content">
      <div class="table-wrapper">
        <DataTable 
          :dataSource="tableData"
          :showDelete="true"
          @delete="handleDelete" />
      </div>
      <div class="chart-wrapper">
        <BarChart :chartData="chartData" />
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Card } from 'ant-design-vue'
import DataTable from '../components/Table.vue'
import BarChart from '../components/Barchart.vue'
import workData from '../assets/data/data.json'

const ACard = Card

const taskList = ref([...workData]);

// 表格数据
const tableData = computed(() => 
  taskList.value.map(item => ({
    ...item,
    overtime: item.overtime ? 'Yes' : 'No'
  }))
);

// 图表数据
const chartData = computed(() => 
  taskList.value.map(({ project, hours }) => ({ project, hours }))
);

// 删除处理函数
const handleDelete = (id) => {
  taskList.value = taskList.value.filter(item => item.id !== id);
};
</script>

<style scoped>
.card-content {
  display: flex;
  gap: 16px;
}

.table-wrapper,
.chart-wrapper {
  flex: 1;
  min-width: 0;
}
</style>