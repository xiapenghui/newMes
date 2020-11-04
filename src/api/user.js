const newUrl = 'http://121.196.123.158'
import request from '@/utils/request'

export function login(data) {
  return request({
    url: newUrl + '/api/login',
    method: 'get',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
