import { request } from '@/common/request'

/** 获取用户登录信息 */
export function getLoginInfo(params) {
  return request({ url: '/wx/login', data: params, method: 'get' })
}

/** 提交邀约个人信息 */
export function submitInviteInfo(params) {
  return request({ url: '/grab/paper', data: params, method: 'post' })
}
