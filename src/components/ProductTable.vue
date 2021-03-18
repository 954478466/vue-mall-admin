<template>
  <a-table
    :columns="columns"
    :data-source="$store.state.productList"
    :pagination='$store.state.pagination'
    @change='turnPage'
  >
    <div class="editable-row-operations" slot="operation" slot-scope="text, record">
      <a-button @click="edit(text, record)">编辑</a-button>
      <a-button @click="deleteProduct(text, record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    width: 300,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName.name',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上加状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 0 ? '下架' : '上架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  data() {
    return {
      data: [],
      columns,
      editingKey: '',
    };
  },
  beforeCreate() {
    this.$store.dispatch('setProductList', {
      page: 1,
    });
  },
  methods: {
    turnPage(pagination) {
      this.$store.dispatch('setProductList', {
        page: pagination.current,
      });
    },
    edit(text, record) {
      this.$router.push({
        name: 'ProductAdd',
        params: {
          id: record.id,
        },
      });
    },
    deleteProduct(text, record) {
      this.$confirm({
        title: '警告！',
        content: <div style="color:red;">{`确定删除商品 ${record.title} `}</div>,
        onOk: async () => {
          const res = await this.$api.deleteProduction(record.id);
          const type = res.status === 'success' ? 'success' : 'error';
          this.$message[type](res.msg);
          this.$store.dispatch('setProductList');
        },
        okText: '确定',
        cancelText: '取消',
        class: 'deleteBtn',
      });
    },
  },
};
</script>
<style scoped>
</style>
