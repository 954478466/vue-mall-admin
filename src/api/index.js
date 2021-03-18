import axios from 'axios';
import store from '@/store';
import uRLS from './uRLS';

const ajax = axios.create({
  baseURL: uRLS.baseURL,
});

ajax.interceptors.request.use((config) => ({
  ...config,
  params: {
    ...config.params,
    appkey: store.state.userInfo.appkey,
  },
  data: {
    ...config.data,
    appkey: store.state.userInfo.appkey,
  },
}),
(error) => Promise.reject(error));

ajax.interceptors.response.use((res) => {
  const { data } = res;
  if (data.status === 'fail') {
    return Promise.reject(data.msg);
  }
  return data;
}, (error) => Promise.reject(error));

const login = (datas) => ajax.post(uRLS.login, datas);
const getCategory = (params) => ajax.get(uRLS.getCategory, {
  params,
});
const getProductions = (params) => ajax.get(uRLS.getProductions, {
  params,
});
const deleteProduction = (id) => ajax.delete(uRLS.byId + id);
const getProductionById = (id) => ajax.get(uRLS.byId + id);
const getUploadImageUrl = () => `${uRLS.baseURL}${uRLS.uploadImage}?appkey=${store.state.userInfo.appkey}`;
const uploadImageUrl = (datas) => ajax.post(uRLS.addProduction, datas);
const editProduction = (params) => ajax.put(uRLS.editProduction, params);

export default {
  login,
  getCategory,
  getProductions,
  deleteProduction,
  getUploadImageUrl,
  uploadImageUrl,
  getProductionById,
  editProduction,
};
