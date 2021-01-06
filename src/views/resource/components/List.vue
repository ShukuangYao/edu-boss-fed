<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px" :inline="true">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询搜索</el-button
            >
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="handleAdd">添加</el-button>
      <el-button @click="$router.push({name: 'resource-category'})">资源分类</el-button>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column type="index" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="资源名称" width="180">
        </el-table-column>
        <el-table-column prop="url" width="180" label="资源路径">
        </el-table-column>
        <el-table-column prop="description" width="180" label="描述">
        </el-table-column>
        <el-table-column width="180" label="添加时间">
          <template slot-scope="scope">
            {{moment(scope.createdTime).format('YYYY-MM-DD hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定要删除这条资源吗？"
              @confirm="handleDelete(scope.row)"
              :style="{'margin-left':'5px'}"
              >
              <el-button
              size="mini"
              type="danger"
              slot="reference"
              >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!--
        total 总记录数
        page-size 每页大小
        分页组件会自动根据 total 和 page-size 计算出一共分多少页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      :title="isEdit ? '编辑资源' : '添加资源'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <create-or-edit
        v-if="dialogVisible"
        :resource-id="resourceId"
        :is-edit="isEdit"
        :resource-categories="resourceCategories"
        @success="onSuccess"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getResourcePages, delResource } from '@/services/resource';
import { getResourceCategories } from '@/services/resource-category';
import { Form } from 'element-ui';
import CreateOrEdit from './CreateOrEdit.vue';

export default Vue.extend({
  name: 'ResourceList',
  data() {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        url: '',
        current: 1, // 默认查询第1页数据
        size: 5, // 每页大小
        categoryId: null, // 资源分类
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true, // 加载状态
      isEdit: false,
      dialogVisible: false,
      resourceId: -1,
    };
  },

  components: {
    CreateOrEdit,
  },

  created() {
    this.loadResources();
    this.loadResourceCategories();
  },

  methods: {
    async loadResourceCategories() {
      const { data } = await getResourceCategories();
      this.resourceCategories = data.data;
    },

    async loadResources() {
      this.isLoading = true; // 展示加载中状态
      const { data } = await getResourcePages(this.form);
      this.resources = data.data.records;
      this.totalCount = data.data.total;
      this.isLoading = false; // 关闭加载中状态
    },

    onSubmit() {
      this.form.current = 1; // 筛选查询从第 1 页开始
      this.loadResources();
    },

    handleEdit(item: any) {
      this.resourceId = item.id;
      this.dialogVisible = true;
    },

    async handleDelete(item: any) {
      const { data } = await delResource(item.id);
      if (data.data) {
        this.$message.success('删除成功');
        this.loadResources();
      }
    },

    handleSizeChange(val: number) {
      this.form.size = val;
      this.form.current = 1; // 每页大小改变重新查询第1页数据
      this.loadResources();
    },

    handleCurrentChange(val: number) {
      // 请求获取对应页码的数据
      this.form.current = val; // 修改要查询的页码
      this.loadResources();
    },

    onReset() {
      (this.$refs.form as Form).resetFields();
      this.form.current = 1; // 重置回到第1页
      this.loadResources();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.resourceId = -1;
    },
    onSuccess() {
      this.dialogVisible = false;
      this.loadResources();
    },
  },
});
</script>

<style lang="scss" scoped></style>
