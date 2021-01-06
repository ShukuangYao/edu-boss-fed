/**
 * 资源相关请求模块
 */

import request from '@/utils/request';

export const getResourcePages = (data: any) => request({
  method: 'POST',
  url: '/boss/resource/getResourcePages',
  data,
});

export const getAllResources = () => request({
  method: 'GET',
  url: '/boss/resource/getAll',
});

export const allocateRoleResources = (data: any) => request({
  method: 'POST',
  url: '/boss/resource/allocateRoleResources',
  data,
});

export const getRoleResources = (roleId: string | number) => request({
  method: 'GET',
  url: '/boss/resource/getRoleResources',
  params: {
    roleId,
  },
});

interface Resource {
  id?: number;
  name: string;
  categoryId: number;
  url: string;
  description: string;
}

export const updateResources = (data: Resource) => request({
  method: 'POST',
  url: '/boss/resource/saveOrUpdate',
  data,
});

export const getResourceById = (id: number) => request({
  method: 'GET',
  url: `/boss/resource/${id}`,
});

export const delResource = (id: number) => request({
  method: 'DELETE',
  url: `/boss/resource/${id}`,
});
