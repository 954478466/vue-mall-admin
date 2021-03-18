<template>
  <div class="productList">
    <SearchFrom />
    <a-button class="addBtn">
      <router-link :to="{name:'ProductAdd'}" @click.native="addProduct">添加商品</router-link>
    </a-button>
    <PruductTbale />
  </div>
</template>

<script>
import SearchFrom from '@/components/SearchFrom.vue';
import PruductTbale from '@/components/ProductTable.vue';

export default {
  components: {
    SearchFrom,
    PruductTbale,
  },
  methods: {
    addProduct() {
      this.$store.commit('changeSelectedKeys', ['ProductAdd']);
    },
  },
};
</script>

<style lang="less" scoped>
.productList{
  position: relative;
  .addBtn{
    position: absolute;
    top: 15px;
    right: 40px;
  }
}
</style>
