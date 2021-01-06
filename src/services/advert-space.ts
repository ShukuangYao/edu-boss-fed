/**
 * 广告位相关请求模块
 */

import request from '@/utils/request';
import { AdvertSpace } from '@/interfaces/index.d';

export const queryAdvertSpaces = () => request({
  method: 'GET',
  url: '/front/ad/space/getAllSpaces',
});

export const queryAdvertSpaceById = (id: number|string) => request({
  method: 'GET',
  url: '/front/ad/space/getSpaceById',
  params: {
    id,
  },
});

export const updateAdvertSpace = (data: AdvertSpace) => request({
  method: 'POST',
  url: '/front/ad/space/saveOrUpdate',
  data,
});
