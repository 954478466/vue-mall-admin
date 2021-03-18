<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-step">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BaseDetail  v-if = 'current === 0' @next="next" :form='form'/>
      <SaleDetail  v-else-if = 'current === 1' @next="next" @prev='prev' :form='form'/>
    </div>
  </div>
</template>
<script>
import BaseDetail from '@/components/BaseDetail.vue';
import SaleDetail from '@/components/SaleDetail.vue';

export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
    };
  },
  async created() {
    const { id } = this.$route.params;
    if (id) {
      const res = await this.$api.getProductionById(id);
      this.form = res.data;
    }
  },
  methods: {
    async next() {
      if (this.current === 1) {
        const { id } = this.$route.params;
        let res;
        if (id) {
          res = await this.$api.editProduction(this.form);
        } else {
          res = await this.$api.uploadImageUrl(this.form);
        }
        const type = res.status === 'success' ? 'success' : 'error';
        this.$message[type](res.msg);
        this.$router.push({
          name: 'ProductList',
        });
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
  components: {
    BaseDetail,
    SaleDetail,
  },
};
</script>
<style lang = 'less' scoped>
.product-detail {
  .product-step {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
}
</style>
