<template>
  <div class="search-box">
    <a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item label="检索关键字">
        <a-input
          v-model="$store.state.searchForm.searchWord"
          placeholder="请输入关键字"
         >
         </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          show-search
          placeholder="请选择商品类目"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option v-for="s in $store.state.categoryList" :key="s.id" :value="s.id">
            {{s.name}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >搜索</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  async beforeCreate() {
    this.$store.dispatch('setCategoryList');
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch('setProductList', {
        page: 1,
      });
    },
    handleChange(val) {
      this.$store.commit('setCategory', val);
    },
    searchWordInput(e) {
      this.$store.commit('setSearchWord', e.target.value);
    },
  },
};
</script>

<style lang="less">
  .search-box{
    padding: 10px 10px 10px 30px;
  }
</style>
