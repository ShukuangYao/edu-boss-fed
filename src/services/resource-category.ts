/**
 * 资源分类相关请求模块
 */

import request from '@/utils/request';
import { Category } from '@/interfaces/index.d';

export const getResourceCategories = () => request({
  method: 'GET',
  url: '/boss/resource/category/getAll',
});

export const updateCategory = (data: Category) => request({
  method: 'POST',
  url: '/boss/resource/category/saveOrderUpdate',
  data,
});

export const delCategory = (id: number) => request({
  method: 'DELETE',
  url: `/boss/resource/category/${id}`,
});
