<template>
  <div class="sale-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" required prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <div class="clearfix">
          <a-upload
            :action="action"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
            name='avatar'
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-model-item>
      <a-form-model-item label="" class="next-btn" :wrapperCol="{ span: 24 }">
        <a-button @click="prev" class="prev">上一步</a-button>
        <a-button type="primary" @click="next">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  created() {
    this.action = this.$api.getUploadImageUrl();
    this.fileList = this.form.images.map((item, index) => ({
      uid: index,
      name: `image${index}.png`,
      status: 'done',
      url: item,
    }));
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      action: '',
    };
  },
  props: ['form'],
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
    prev() {
      this.$emit('prev', this.form);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const files = file;
      if (!files.url && !files.preview) {
        files.preview = await getBase64(files.originFileObj);
      }
      this.previewImage = files.url || files.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        this.form.images = this.form.images.filter((image) => file.url !== image);
      }
      this.fileList = fileList;
    },
  },
};
</script>

<style lang="less">
.sale-detail {
  .next-btn {
    text-align: center;
    .prev {
      margin-right: 5px;
    }
  }
  .ant-upload-select-picture-card {
    i {
      font-size: 32px;
      color: #999;
    }
    .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
  }
}
</style>
