
import request from '@/utils/request'

export function gitInfo(data) {
  return request({
    url: '/gitInfo/',
    method: 'get',
    data
  })
}

export function getUrl(data) {
  return request({
    url: '/getUrl/',
    method: 'get',
    data
  })
}

export function createJob(data) {
  console.log(data)
  return request({
    url: '/job/',
    method: 'post',
    data
  })
}
export function getJobList(data) {
  return request({
    url: '/job/',
    method: 'get',
    params: data
  })
}

export function deleteJob(jobId) {
  return request({
    url: '/job/' + jobId + '/',
    method: 'delete'
  })
}

export function updateJob(data) {
  console.log(data.id)
  return request({
    url: '/job/' + data.id + '/',
    method: 'patch',
    data
  })
}

export function getProjectInfo(data) {
  return request({
    url: '/projectInfo/',
    method: 'get',
    params: data
  })
}
