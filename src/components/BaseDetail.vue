<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="标题" prop="title" required>
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
        <a-select
          v-model="form.category"
          placeholder="请选择商品类别"
        >
          <a-select-option v-for="c in $store.state.categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请添加子类目">
          <a-select-option v-for="c in getCategoryItems" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          placeholder="Please select"
          :default-value="['包邮，最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达"
            >包邮，最晚次日达</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="" class="next-btn" :wrapperCol="{ span: 24 }">
        <a-button type="primary" @click="next">下一步</a-button>
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
  props: ['form'],
  created() {
    if (this.$store.state.categoryList.length === 0) {
      this.$store.dispatch('setCategoryList');
    }
  },
  computed: {
    getCategoryItems() {
      for (let i = 0; i < this.$store.state.categoryList.length; i += 1) {
        const category = this.$store.state.categoryList[i];
        if (category.id === this.form.category) {
          return category.c_items;
        }
      }
      return [];
    },
  },
  methods: {
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style lang="less">
.basic-detail {
  .next-btn {
    text-align: center;
  }
}
</style>
