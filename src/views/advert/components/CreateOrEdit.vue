<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑广告' : '添加广告' }}</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="广告名称" prop="name" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="广告位置">
          <el-select v-model="form.spaceId" placeholder="请选择上级广告">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in advertSpaces"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime" required>
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime" required>
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">下线</el-radio>
            <el-radio :label="1">上线</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="广告图片">
          <upload-image
            v-model="form.img"
            :limit="1"
          />
        </el-form-item>
        <el-form-item label="广告链接" prop="link" required>
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="广告备注">
          <el-input
            v-model="form.text"
            type="textarea"
            :rows="3"
          ></el-input>
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
import {
  queryAdvertById, updateAdvert,
} from '@/services/advert';
import UploadImage from '@/components/UploadImage/index.vue';
import { queryAdvertSpaces } from '@/services/advert-space';

export default Vue.extend({
  name: 'AdvertCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UploadImage,
  },
  data() {
    return {
      form: {
        id: undefined,
        spaceId: undefined,
        startTime: '',
        endTime: '',
        name: '',
        status: 0,
        icon: '',
        img: '',
        link: '',
        text: '',
      },
      advertSpaces: [], // 广告位列表
      rules: {
        name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
        ],
        startTime: [
          {
            type: 'date', required: true, message: '请选择开始时间', trigger: 'change',
          },
        ],
        endTime: [
          {
            type: 'date', required: true, message: '请选择结束时间', trigger: 'change',
          },
        ],
        link: [
          { required: true, message: '请输入广告链接', trigger: 'blur' },
        ],
      },
    };
  },

  created() {
    this.loadAdvertInfo();
    this.loadAllAdvertSpaces();
  },

  methods: {
    async loadAdvertInfo() {
      const { params: { id } } = this.$route;
      if (id) {
        const { data } = await queryAdvertById(id);
        if (data.success) {
          this.form = data.content;
        }
      }
    },

    async loadAllAdvertSpaces() {
      const { data } = await queryAdvertSpaces();
      if (data.success) {
        this.advertSpaces = data.content;
      }
    },

    onSubmit() {
      // 1. 表单验证
      (this.$refs.form as any).validate(async (valid: boolean) => {
        if (valid) {
          // 2. 验证通过，提交表单
          const { data } = await updateAdvert(this.form);
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
