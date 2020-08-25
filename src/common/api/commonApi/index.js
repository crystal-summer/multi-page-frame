import request from '@api/request'

// 浦江-根据链接中的token获取企业信息
export const getEntInfo = params => request.get('/pjqyment/h5/companyDetails', { params })
