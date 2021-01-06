<template>
  <el-form :model="form" :label-width="formLabelWidth">
    <el-form-item label="分类" >
      <el-input v-model="form.name" autocomplete="off" :style="{width: '60%'}"></el-input>
    </el-form-item>
    <el-form-item label="排序" >
      <el-input-number v-model="form.sort" :style="{width: '60%'}"></el-input-number>
    </el-form-item>
    <el-form-item>
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { updateCategory } from '@/services/resource-category';

export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        id: undefined,
        name: '',
        sort: undefined,
      },
      formLabelWidth: '150px',
    };
  },
  created() {
    this.form = this.category;
  },
  methods: {
    async onSubmit() {
      const { data } = await updateCategory(this.form);
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
