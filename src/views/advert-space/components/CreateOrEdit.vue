<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑广告位' : '添加广告位' }}</span>
      </div>
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="广告位名称" prop="name" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button
            v-if="!isEdit"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { queryAdvertSpaceById, updateAdvertSpace } from '@/services/advert-space';
import { AdvertSpace } from '@/interfaces/index.d';

export default Vue.extend({
  name: 'AdvertSpaceCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        id: undefined,
        name: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入广告位名称', trigger: 'blur' },
        ],
      },
    };
  },

  created() {
    this.loadAdvertSpaceInfo();
  },

  methods: {
    async loadAdvertSpaceInfo() {
      const { params: { id } } = this.$route;
      if (id) {
        const { data } = await queryAdvertSpaceById(id);
        if (data.success) {
          this.form = data.content;
        }
      }
    },

    onSubmit() {
      // 1. 表单验证
      (this.$refs.form as any).validate(async (valid: boolean) => {
        if (valid) {
          // 2. 验证通过，提交表单
          const { data } = await updateAdvertSpace(this.form);
          if (data.success) {
            this.$message.success('提交成功');
            this.$router.back();
          }
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
