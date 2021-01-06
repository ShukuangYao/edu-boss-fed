/**
 * 阿里云上传
 */

import request from '@/utils/request';

export const aliyunImagUploadAddressAdnAuth = () => request({
  method: 'GET',
  url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json',
});

export const aliyunVideoUploadAddressAdnAuth = (params: any) => request({
  method: 'GET',
  url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
  params,
});

export const transCodeVideo = (data: any) => request({
  method: 'POST',
  url: '/boss/course/upload/aliyunTransCode.json',
  data,
});

export const getAliyunTransCodePercent = (lessonId: string | number) => request({
  method: 'GET',
  url: '/boss/course/upload/aliyunTransCodePercent.json',
  params: {
    lessonId,
  },
});
