<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{menu}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="40"
          :src="userInfo.portrait || require('@/assets/default-avatar.png')"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item
        divided
        @click.native="handleLogout"
        >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getUserInfo } from '@/services/user';

export default Vue.extend({
  name: 'AppHeader',
  data() {
    return {
      userInfo: {},
      menu: '',
    };
  },
  watch: {
    $route(newVal) {
      const { meta: { title } } = newVal;
      this.menu = title;
    },
  },
  created() {
    const { meta: { title } } = this.$route;
    this.menu = title;
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo();
        console.log({ data });
        this.userInfo = data.content;
      } catch (error) {
        console.log(error);
      }
    },
    handleLogout() {
      this.$confirm('确定退出吗？', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store.commit('user', null);
        this.$router.push({
          name: 'login',
        });
        this.$message({
          type: 'success',
          message: '退出成功',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
        });
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
