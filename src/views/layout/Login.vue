<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'email',
          { rules: [{ required: true, message: '请输入用户名!' }] },
        ]"
        placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('removeUserInfo');
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            const res = await this.$api.login(values);
            this.$message.success(res.msg, 1);
            this.$store.dispatch('setUserInfo', res.data);
            this.$router.replace('/');
          } catch (error) {
            this.$message.error(error, 1);
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
#components-form-demo-normal-login{
  max-width: 400px;
  margin: 100px auto;
  border: 1px solid #eee;
  padding: 30px 20px 6px;
  text-align: center;
  .ant-col{
    width: 80%;
    margin-left:calc(50% - 150px) ;
  }
}
</style>
