import request from './index'

export const getGoodsList = (params: {page:number}) => {
    return request.get(`/mock/164/zzc/goodsList`,{params: params})
}