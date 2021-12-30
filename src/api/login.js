import http from '@/utils/http'


//获取当前用户信息
export const getCurrentUserInfo = (data, param) => http(`/admin/userExtend/${param.innerRole}/user`, data, 'GET')

//快捷方式列表
export const quickEntranceList = params => http('/hisee/web/workbench/quickentrance/list', params, 'GET')

//解绑OAuth2第三方账号信息
export const unbindOauth2 = (data) => http('/web/user/oauth2/unbind', data, 'DELETE')

//绑定OAuth2第三方账号信息
export const bindAccount = (data) => http('/web/user/oauth2/bind', data, 'POST')