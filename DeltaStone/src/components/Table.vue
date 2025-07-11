<template>
  <a-table 
    :dataSource="dataSource" 
    :columns="mergedColumns"
    rowKey="id"
    bordered
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action' && showDelete">
        <a-button type="link" danger @click="handleDelete(record.id)">Delete</a-button>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { Table, Button } from 'ant-design-vue';
import { computed } from 'vue';

const ATable = Table
const AButton = Button
const props = defineProps({
  dataSource: {
    type: Array,
    required: true,
    default: () => []
  },
  showDelete: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['delete']);
// 基础列配置
const baseColumns = [
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
];

// 动态计算列
const mergedColumns = computed(() => {
  if (!props.showDelete) return baseColumns;
  
  return [
    ...baseColumns,
    {
      title: 'Action',
      key: 'action',
      width: 100
    }
  ];
});

// 删除处理函数
const handleDelete = (id) => {
  emit('delete', id);
};
</script>