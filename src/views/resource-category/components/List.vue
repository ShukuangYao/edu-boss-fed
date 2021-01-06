<template>
  <div class="resource-list">
    <el-card class="box-card">
      <el-button @click="handleAdd">添加</el-button>
      <el-table
        :data="resourceCategories"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column
          type="index"
          label="编号"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          min-width="180"
          label="创建时间">
          <template slot-scope="scope">
            {{moment(scope.createdTime).format('YYYY-MM-DD hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          min-width="180"
          label="排序">
        </el-table-column>
        <el-table-column
          min-width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-popconfirm
              title="确定要删除这条分类吗？"
              @confirm="handleDelete(scope.row)"
              :style="{'margin-left':'5px'}"
              >
              <el-button
              size="mini"
              type="danger"
              slot="reference"
              >删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="isEdit ? '编辑分类' : '添加分类'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <create-or-edit
        v-if="dialogVisible"
        :category="category"
        :is-edit="isEdit"
        @success="onSuccess"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getResourceCategories, delCategory } from '@/services/resource-category';
import { Category } from '@/interfaces/index.d';
import { Form } from 'element-ui';
import moment from 'moment';
import CreateOrEdit from './CreateOrEdit.vue';

export default Vue.extend({
  name: 'ResourceCategoryList',
  data() {
    return {
      resourceCategories: [], // 资源分类列表
      isLoading: true, // 加载状态
      isEdit: false,
      category: {},
      dialogVisible: false,
    };
  },

  components: {
    CreateOrEdit,
  },

  created() {
    this.loadResourceCategories();
  },

  methods: {
    async loadResourceCategories() {
      const { data } = await getResourceCategories();
      this.resourceCategories = data.data;

      this.isLoading = false;
    },

    handleEdit(item: Category) {
      this.category = item;
      this.dialogVisible = true;
      console.log('handleEdit', item);
    },

    async handleDelete(item: Category) {
      const { data } = await delCategory(item.id);
      if (data.data) {
        this.$message.success('删除成功');
        this.loadResourceCategories();
      }
    },

    handleAdd() {
      this.category = {};
      this.dialogVisible = true;
    },

    onSuccess() {
      this.dialogVisible = false;
      this.loadResourceCategories();
    },
  },
});
</script>

<style lang="scss" scoped></style>
