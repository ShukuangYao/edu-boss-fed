<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'advert-space-create' })">添加广告位</el-button>
      </div>
      <el-table
        :data="advertSpaceList"
        style="width: 100%">
        <el-table-column
          label="spaceKey"
          min-width="150"
          prop="spaceKey">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告位名称"
          min-width="150">
        </el-table-column>
        <el-table-column
          label="创建时间"
          min-width="180">
          <template slot-scope="scope">
            <div>{{moment(scope.row.createTime).format('YYYY-MM-DD hh:mm:ss')}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          min-width="180">
          <template slot-scope="scope">
            <div>{{moment(scope.row.updateTime).format('YYYY-MM-DD hh:mm:ss')}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { queryAdvertSpaces } from '@/services/advert-space';
import { Advert, AdvertSpace, AdvertStatus } from '@/interfaces/index.d';

export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data() {
    return {
      advertSpaceList: [],
      loading: false,
      page: 1,
      pageSize: 20,
    };
  },

  async created() {
    this.loading = true;
    await this.loadAllAdvertSpaces();
    this.loading = false;
  },

  methods: {
    async loadAllAdvertSpaces() {
      const { data } = await queryAdvertSpaces();
      if (data.success) {
        this.advertSpaceList = data.content;
      }
    },

    handleEdit(item: AdvertSpace) {
      this.$router.push({
        name: 'advert-space-edit',
        params: {
          id: (item.id) as string,
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
