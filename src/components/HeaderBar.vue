<template>
  <div class="headerbar" >

    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>

    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{$route.matched[0].meta.title}}</a-breadcrumb-item>
        <a-breadcrumb-item>
           {{$route.matched[1].meta.title}}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <ul class="user-info">
      <li>{{$store.state.userInfo.username}}
        <a-icon type="down" />
      </li>
      <li @click='logOtu'>退出</li>
    </ul>

  </div>
</template>

<script>
export default {
  methods: {
    toggleCollapsed() {
      this.$store.commit('changeCollapsed');
    },
    logOtu() {
      this.$store.dispatch('removeUserInfo');
      this.$router.replace('/login');
    },
  },
};
</script>

<style lang="less" scoped>
.headerbar{
  position: relative;
  .user-info{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
  }
}
</style>
