/*
 * @Author: Jiang wenke
 * @LastEditors: Jiang wenke
 * @email: wenkejiang@yeah.net
 * @github: https://github.com/wenkejiang/
 * @Date: 2020-05-30 15:11:10
 * @LastEditTime: 2020-06-01 13:23:55
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /guard-web/src/utils/get-page-title.js
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || '测试平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
