/*
 * @Author: Jiang wenke
 * @LastEditors: Please set LastEditors
 * @email: wenkejiang@yeah.net
 * @github: https://github.com/wenkejiang/
 * @Date: 2020-05-30 15:11:10
 * @LastEditTime: 2020-06-03 13:26:00
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /guard-web/src/api/user.js
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/register/',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/getInfo/',
    method: 'get',
    params: { token }
  })
}

export function getList(params) {
  return request({
    url: '/getUserList/',
    method: 'get',
    params
  })
}
