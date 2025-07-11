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

// 统一数据源
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

<!-- AI辅助页面美化 -->
<style scoped>
/* 整体卡片增强 */
.a-card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* 标题样式优化 */
:deep(.ant-card-head) {
  background: linear-gradient(135deg, #f5f7fa 0%, #e6e9f0 100%);
  border-bottom: 1px solid #e8eff9;
}

:deep(.ant-card-head-title) {
  font-weight: 600;
  font-size: 1.2rem;
  color: #2c3e50;
  padding: 16px 0;
}

/* 内容区域间距优化 */
.card-content {
  display: flex;
  gap: 24px;
  padding: 16px;
  background-color: #fafafa;
}

/* 表格容器增强 */
.table-wrapper {
  flex: 1;
  min-width: 0;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: all 0.3s ease;
}

.table-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* 图表容器增强 */
.chart-wrapper {
  flex: 1;
  min-width: 0;
  padding: 16px;
  border-radius: 6px;
  background: white;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* 响应式处理 */
@media (max-width: 768px) {
  .card-content {
    flex-direction: column;
  }
  
  .table-wrapper,
  .chart-wrapper {
    width: 100%;
  }
}
</style>