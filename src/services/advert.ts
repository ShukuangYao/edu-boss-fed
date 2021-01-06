/**
 * 广告相关请求模块
 */

import request from '@/utils/request';
import { Advert, AdvertStatus } from '@/interfaces/index.d';

export const queryAdverts = () => request({
  method: 'GET',
  url: '/front/ad/getAdList',
});

export const queryAdvertById = (id: number|string) => request({
  method: 'GET',
  url: '/front/ad/getAdById',
  params: {
    id,
  },
});

export const updateAdvert = (data: Advert) => request({
  method: 'POST',
  url: '/front/ad/saveOrUpdate',
  data,
});

export const updateAdvertStatus = (params: AdvertStatus) => request({
  method: 'GET',
  url: '/front/ad/updateStatus',
  params,
});
