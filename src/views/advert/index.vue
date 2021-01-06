<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'advert-create' })">添加广告</el-button>
      </div>
      <el-table
        :data="advertList"
        style="width: 100%">
        <el-table-column
          label="id"
          min-width="150"
          prop="id">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告名称"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="space"
          label="广告位置"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="img"
          label="广告图片"
          min-width="150">
          <template slot-scope="scope">
          <img width="80%" :src="scope.row.img">
        </template>
        </el-table-column>
        <el-table-column
          label="时间"
          min-width="180">
          <template slot-scope="scope">
            <div>
              <div>开始时间：{{scope.row.startTimeFormatString}}</div>
              <div>结束时间：{{scope.row.endTimeFormatString}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
        label="上线/下线"
        prop="status"
        min-width="80">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isStatusLoading"
              @change="handleForbidAdvert(scope.row)"
            />
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
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="loading"
        :page-size="pageSize"
        :current-page="page"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { queryAdverts, updateAdvertStatus } from '@/services/advert';
import { queryAdvertSpaces } from '@/services/advert-space';
import { Advert, AdvertSpace, AdvertStatus } from '@/interfaces/index.d';

export default Vue.extend({
  name: 'AdvertIndex',
  data() {
    return {
      adverts: [], // 广告列表
      advertSpaces: [], // 广告位列表
      advertList: [],
      totalCount: 0,
      loading: false,
      page: 1,
      pageSize: 20,
    };
  },

  async created() {
    this.loading = true;
    await this.loadAllAdvertSpaces();
    await this.loadAllAdverts();
    this.loading = false;
  },

  methods: {
    async loadAllAdverts() {
      const { data } = await queryAdverts();
      if (data.success) {
        data.content.map((item: Advert) => {
          const space = this.advertSpaces.find((i) => (i as AdvertSpace).id === item.spaceId);
          if (space) {
            item.space = (space as AdvertSpace).name;
          }
          item.isStatusLoading = false;
          return true;
        });
        this.adverts = data.content;
        this.totalCount = this.adverts.length;
        this.advertList = this.adverts.filter((item, index) => index < this.pageSize);
      }
    },

    async loadAllAdvertSpaces() {
      const { data } = await queryAdvertSpaces();
      if (data.success) {
        this.advertSpaces = data.content;
      }
    },

    handleEdit(item: Advert) {
      this.$router.push({
        name: 'advert-edit',
        params: {
          id: (item.id) as string,
        },
      });
    },
    async handleForbidAdvert(advert: Advert) {
      advert.isStatusLoading = true;
      const { data } = await updateAdvertStatus({
        id: advert.id || -1,
        status: advert.status,
      });
      if (data.success) {
        this.$message.success(`${advert.status === 0 ? '下线' : '上线'}成功`);
        advert.isStatusLoading = false;
        console.log(advert);
      }
    },
    handleCurrentChange(page: number) {
      this.page = page;
      this.advertList = this.adverts
        .filter((item, index) => index < this.pageSize * page
        && index >= this.pageSize * (page - 1));
    },
  },
});
</script>

<style lang="scss" scoped></style>
