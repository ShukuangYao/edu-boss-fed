<template>
  <div class="aside">
    <el-menu
      default-active="4"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      @select="handleSelect"
    >
      <template v-for="menu in menuList">
        <el-submenu v-if="menu.children" :index="menu.index" :key="menu.index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="item in menu.children"
            :index="item.index"
            :key="item.index"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="menu.index" :key="menu.index">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppAside',
  data() {
    return {
      menuList: [
        {
          index: '1',
          name: '权限管理',
          children: [
            {
              index: '/role',
              name: '角色管理',
            },
            {
              index: '/menu',
              name: '菜单管理',
            },
            {
              index: '/resource',
              name: '资源管理',
            },
          ],
        },
        {
          index: '/course',
          name: '课程管理',
        },
        {
          index: '/user',
          name: '用户管理',
        },
        {
          index: '4',
          name: '广告管理',
          children: [
            {
              index: '/advert',
              name: '广告列表',
            },
            {
              index: '/advert-space',
              name: '广告位列表',
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key: string, keyPath: string): void {
      console.log({ key, keyPath });
    },
    handleClose(key: string, keyPath: string): void {
      console.log(key, keyPath);
    },
    handleSelect(index: string, indexPath: string) {
      console.log({ index, indexPath });
    },
  },
});
</script>

<style lang="scss" scoped>
.aside {
  .el-menu {
    min-height: 100vh;
  }
}
</style>
