<template>
  <div class="sidebar">
    <a-menu
      :default-selected-keys="[$router.currentRoute.matched[1].name]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
      v-model="$store.state.selectedKeys"
    >
      <template v-for="route in $store.state.menuRoutes">
        <a-sub-menu :key="route.name" v-if='!route.meta.hidden'>
          <span slot="title">
            <a-icon :type="route.meta.icon" /><span>{{route.meta.title}}</span>
          </span>
          <a-menu-item :key="children.name" v-for='children in route.children'>
            <router-link :to="{name:children.name}">
              <a-icon :type="children.meta.icon" />
              {{children.meta.title}}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('changeSelectedKeys', [this.$router.currentRoute.matched[1].name]);
  },
};
</script>
