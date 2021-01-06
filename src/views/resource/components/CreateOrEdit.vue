<template>
  <el-form :model="form" :label-width="formLabelWidth">
    <el-form-item label="资源名称" >
      <el-input v-model="form.name" autocomplete="off" :style="{width: '60%'}"></el-input>
    </el-form-item>
    <el-form-item label="资源路径" >
      <el-input v-model="form.url" autocomplete="off" :style="{width: '60%'}"></el-input>
    </el-form-item>
    <el-form-item label="资源分类" >
      <el-select v-model="form.categoryId" placeholder="请选择资源分类" :style="{width: '60%'}">
        <el-option
        v-for="item in resourceCategories"
        :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述" >
      <el-input
      type="textarea"
      v-model="form.description"
      autocomplete="off"
      :style="{width: '60%'}"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { updateResources, getResourceById } from '@/services/resource';

export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    resourceCategories: {
      type: Array,
      default: () => [],
    },
    resourceId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      form: {
        id: undefined,
        name: '',
        categoryId: undefined,
        url: '',
        description: '',
      },
      formLabelWidth: '150px',
    };
  },
  created() {
    this.loadResource();
  },
  methods: {
    async loadResource() {
      if (this.resourceId > -1) {
        const { data: { data } } = await getResourceById(this.resourceId);
        this.form = {
          id: this.resourceId,
          name: data.name,
          categoryId: data.categoryId,
          url: data.url,
          description: data.description,
        };
      }
    },
    async onSubmit() {
      const { data } = await updateResources(this.form);
      if (data.data) {
        this.$message.success('操作成功');
        this.$emit('success');
      }
    },
  },
};
</script>

<style>

</style>
