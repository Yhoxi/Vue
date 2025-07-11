<template>
  <a-table 
    :dataSource="dataSource" 
    :columns="columns"
    rowKey="id"
    bordered
  >
    <template v-if="showActionColumn" #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button type="link" danger @click="handleDelete(record)">Delete</a-button>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { Table } from 'ant-design-vue'
import { computed } from 'vue';

const ATable = Table

// 构建props，等待数据传入
const props = defineProps({
  dataSource: {
    type: Array,
    required: true,
    default: () => []
  },
  showActions: {
    type: Boolean,
    default: false
  }
});

// 表格列配置
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Project Name',
    dataIndex: 'project',
    key: 'project'
  },
{
    title: 'Overtime',
    dataIndex: 'overtime',
    key: 'overtime',
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours'
  }
]

// 动态添加操作列
const computedColumns = computed(() => {
  const columns = [...baseColumns];
  if (props.showActions) {
    columns.push({
      title: 'Action',
      key: 'action',
      width: 100
    });
  }
  return columns;
});

const handleDelete = (record) => {
  emit('delete', record.id);
};
</script>
