<template>
  <div class="home">
    <side-bar/>
    <div class="main" :class="{'menu-unlock':$store.state.collapsed}">
      <header-bar/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import HeaderBar from '@/components/HeaderBar.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    SideBar,
    HeaderBar,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
