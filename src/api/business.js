const newUrl = 'http://192.168.1.130:8888'
// const newUrl = 'http://39.101.166.244'
import request from '@/utils/request'

// 所有日志查询接口
export function allLogs(query, data) {
  return request({
    url: newUrl + '/api/sys/logs/dataId',
    method: 'post',
    params: query,
    data
  })
}

// 生产总表
// 生产总表列表接口
export function productionList(query, data) {
  return request({
    url: newUrl + '/api/eip/prod/page',
    method: 'post',
    params: query,
    data
  })
}

// 生产总表删除接口
export function productionDellte(data) {
  return request({
    url: newUrl + '/api/eip/prod/delete/ids',
    method: 'post',
    data
  })
}

// 生产总表编辑保存接口
export function productionEdit(data) {
  return request({
    url: newUrl + '/api/eip/prod/update',
    method: 'post',
    data
  })
}

// 生产总表上传接口
export function productionUpload() {
  return request({
    url: newUrl + '/api/eip/prod/upload',
    method: 'get'
  })
}

// 销售项目列表
// 销售项目列表接口
export function saleList(query, data) {
  return request({
    url: newUrl + '/api/eip/so/page',
    method: 'post',
    params: query,
    data
  })
}

// 销售项目删除接口
export function saleDellte(data) {
  return request({
    url: newUrl + '/api/eip/so/delete/ids',
    method: 'post',
    data
  })
}

// 销售项目编辑保存接口
export function saleEdit(data) {
  return request({
    url: newUrl + '/api/eip/so/update',
    method: 'post',
    data
  })
}

// 销售订单上传接口
export function saleUpload() {
  return request({
    url: newUrl + '/api/eip/so/upload',
    method: 'get'
  })
}

// 重点原材料列表
// 重点原材料列表接口
export function miList(query, data) {
  return request({
    url: newUrl + '/api/eip/mi/page',
    method: 'post',
    params: query,
    data
  })
}

// 重点原材料删除接口
export function miDellte(data) {
  return request({
    url: newUrl + '/api/eip/mi/delete/ids',
    method: 'post',
    data
  })
}

// 重点原材料编辑保存接口
export function miEdit(data) {
  return request({
    url: newUrl + '/api/eip/mi/update',
    method: 'post',
    data
  })
}

// 重点原材料上传接口
export function miUpload() {
  return request({
    url: newUrl + '/api/eip/mi/upload',
    method: 'get'
  })
}

// 实物ID信息列表
// 实物ID信息列表接口
export function pidList(query, data) {
  return request({
    url: newUrl + '/api/eip/pid/page',
    method: 'post',
    params: query,
    data
  })
}

// 实物ID信息删除接口
export function pidDellte(data) {
  return request({
    url: newUrl + '/api/eip/pid/delete/ids',
    method: 'post',
    data
  })
}

// 实物ID信息保存接口
export function pidEdit(data) {
  return request({
    url: newUrl + '/api/eip/pid/update',
    method: 'post',
    data
  })
}

// 实物ID信息上传接口
export function pidUpload() {
  return request({
    url: newUrl + '/api/eip/pid/upload',
    method: 'get'
  })
}

// 备品备件库存列表
// 备品备件库存列表接口
export function siList(query, data) {
  return request({
    url: newUrl + '/api/eip/si/page',
    method: 'post',
    params: query,
    data
  })
}

// 备品备件库存删除接口
export function siDellte(data) {
  return request({
    url: newUrl + '/api/eip/si/delete/ids',
    method: 'post',
    data
  })
}

// 备品备件库存保存接口
export function siEdit(data) {
  return request({
    url: newUrl + '/api/eip/si/update',
    method: 'post',
    data
  })
}

// 备品备件库存上传接口
export function siUpload() {
  return request({
    url: newUrl + '/api/eip/si/upload',
    method: 'get'
  })
}

// 产成品库存列表
// 产成品库存列表接口
export function piList(query, data) {
  return request({
    url: newUrl + '/api/eip/pi/page',
    method: 'post',
    params: query,
    data
  })
}

// 产成品库存删除接口
export function piDellte(data) {
  return request({
    url: newUrl + '/api/eip/pi/delete/ids',
    method: 'post',
    data
  })
}

// 产成品库存保存接口
export function piEdit(data) {
  return request({
    url: newUrl + '/api/eip/pi/update',
    method: 'post',
    data
  })
}

// 产成品库存上传接口
export function piUpload() {
  return request({
    url: newUrl + '/api/eip/pi/upload',
    method: 'get'
  })
}

// 采购订单信息列表
//  采购订单信息列表接口
export function poList(query, data) {
  return request({
    url: newUrl + '/api/eip/po/page',
    method: 'post',
    params: query,
    data
  })
}

//  采购订单信息列表接口
export function poDown() {
  return request({
    url: newUrl + '/api/eip/po/down',
    method: 'get'
  })
}

// 表格解析接口
export function analysis() {
  return request({
    url: newUrl + '/api/excel/read',
    method: 'get'
  })
}

// 电流互感器列表-分页接口
export function electricCurrent(query, data) {
  return request({
    url: newUrl + '/api/kvsc/ct/page',
    method: 'post',
    params: query,
    data
  })
}

// 电流互感器删除接口
export function electricDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/delete/ids',
    method: 'post',
    data
  })
}

// 电流互感器编辑保存接口
export function electricEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/update',
    method: 'post',
    data
  })
}

// 电压列表
// 电压列表接口
export function voltageList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/vt/page',
    method: 'post',
    params: query,
    data
  })
}

// 电压删除接口
export function voltageDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/vt/delete/ids',
    method: 'post',
    data
  })
}

// 电压编辑保存接口
export function voltageEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/vt/update',
    method: 'post',
    data
  })
}

// 辅助回路绝缘测试列表
// 辅助回路绝缘测试列表接口
export function routerList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/acit/page',
    method: 'post',
    params: query,
    data
  })
}

// 辅助回路绝缘测试删除接口
export function routerDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/acit/delete/ids',
    method: 'post',
    data
  })
}

// 辅助回路绝缘测试编辑保存接口
export function routerEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/acit/update',
    method: 'post',
    data
  })
}

// 电气连锁列表
//  电气连锁列表接口
export function electricalList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/ei/page',
    method: 'post',
    params: query,
    data
  })
}

//  电气连锁删除接口
export function electricalDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/ei/delete/ids',
    method: 'post',
    data
  })
}

//  电气连锁编辑保存接口
export function electricalEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/ei/update',
    method: 'post',
    data
  })
}

// 整柜工频耐压试验列表
//  整柜工频耐压试验列表接口
export function fcpwvtList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/fcpfwvt/page',
    method: 'post',
    params: query,
    data
  })
}

//  整柜工频耐压试验删除接口
export function fcpwvtDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/fcpfwvt/delete/ids',
    method: 'post',
    data
  })
}

// 整柜工频耐压试验编辑保存接口
export function fcpwvtEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/fcpfwvt/update',
    method: 'post',
    data
  })
}

// 主回路电阻值列表
// 主回路电阻值列表接口
export function mcrList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/mcr/page',
    method: 'post',
    params: query,
    data
  })
}

//  主回路电阻值删除接口
export function mcrDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/mcr/delete/ids',
    method: 'post',
    data
  })
}

// 主回路电阻值编辑保存接口
export function mcrEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/mcr/update',
    method: 'post',
    data
  })
}

// 机械操作列表
// 机械操作列表接口
export function moList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/mo/page',
    method: 'post',
    params: query,
    data
  })
}

// 机械操作删除接口
export function moDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/mo/delete/ids',
    method: 'post',
    data
  })
}

// 机械操作编辑保存接口
export function moEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/mo/update',
    method: 'post',
    data
  })
}

// 机械特性试验列表
// 机械特性试验列表接口
export function mctList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/mct/page',
    method: 'post',
    params: query,
    data
  })
}

// 机械特性试验删除接口
export function mctDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/mct/delete/ids',
    method: 'post',
    data
  })
}

// 机械特性试验编辑保存接口
export function mctEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/mct/update',
    method: 'post',
    data
  })
}

// 供应商管理列表
// 供应商管理列表接口
export function supplierList(query, data) {
  return request({
    url: newUrl + '/api/sys/supplier/page',
    method: 'post',
    params: query,
    data
  })
}

// 供应商管理编辑保存接口
export function supplierEdit(data) {
  return request({
    url: newUrl + '/api/sys/supplier/update',
    method: 'post',
    data
  })
}

// 供应商管理删除接口
export function supplierDellte(data) {
  return request({
    url: newUrl + '/api/sys/supplier/delete',
    method: 'post',
    data
  })
}

// 供应商管理增加接口
export function supplierAdd(data) {
  return request({
    url: newUrl + '/api/sys/supplier/add',
    method: 'post',
    data
  })
}

// 供应商管理增加接口
export function saleOrg() {
  return request({
    url: newUrl + '/api/sys/supplier/saleOrg',
    method: 'get'
  })
}

// 用户管理列表
// 用户管理列表接口
export function userList(query, data) {
  return request({
    url: newUrl + '/api/sys/user/page',
    method: 'post',
    params: query,
    data
  })
}

// 用户管理编辑保存接口
export function userEdit(data) {
  return request({
    url: newUrl + '/api/sys/user/update',
    method: 'post',
    data
  })
}

// 用户管理删除接口
export function userDellte(data) {
  return request({
    url: newUrl + '/api/sys/user/delete',
    method: 'post',
    data
  })
}

// 用户管理增加接口
export function userAdd(data) {
  return request({
    url: newUrl + '/api/sys/user/add',
    method: 'post',
    data
  })
}

// 短路器小车列表
// 短路器小车列表接口
export function dlqxcList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/dlqxc/page',
    method: 'post',
    params: query,
    data
  })
}

// 短路器小车删除接口
export function dlqxcDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/dlqxc/delete/ids',
    method: 'post',
    data
  })
}

// 短路器小车编辑保存接口
export function dlqxcEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/dlqxc/update',
    method: 'post',
    data
  })
}

// 母排列表
// 母排列表接口
export function npList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/np/page',
    method: 'post',
    params: query,
    data
  })
}

// 母排删除接口
export function npDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/np/delete/ids',
    method: 'post',
    data
  })
}

// 母排编辑保存接口
export function npEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/np/update',
    method: 'post',
    data
  })
}

// 矩体材质厚度列表
// 矩体材质厚度列表接口
export function cgczhdList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/cgczhd/page',
    method: 'post',
    params: query,
    data
  })
}

// 矩体材质厚度删除接口
export function cgczhdDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/cgczhd/delete/ids',
    method: 'post',
    data
  })
}

// 矩体材质厚度编辑保存接口
export function cgczhdEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/cgczhd/update',
    method: 'post',
    data
  })
}

// 静触头列表
// 静触头列表接口
export function jctList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/jct/page',
    method: 'post',
    params: query,
    data
  })
}

// 静触头删除接口
export function jctDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/jct/delete/ids',
    method: 'post',
    data
  })
}

// 静触头编辑保存接口
export function jctEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/jct/update',
    method: 'post',
    data
  })
}

// 动触头列表
// 动触头列表接口
export function dctList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/dct/page',
    method: 'post',
    params: query,
    data
  })
}

// 动触头删除接口
export function dctDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/dct/delete/ids',
    method: 'post',
    data
  })
}

// 动触头编辑保存接口
export function dctEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/dct/update',
    method: 'post',
    data
  })
}
