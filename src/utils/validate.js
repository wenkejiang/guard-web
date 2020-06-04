/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 格式化单元格文本内容
export function formatContent(cellvalue, options, rowObject) {
  if (cellvalue != null && cellvalue !== '') {
    // 去掉<p><br/></p>
    // return cellvalue.replace(/<p>/ig,"").replace(/<\/p>/ig,"").replace(/<br\/>/ig,"");
    // 只提取汉字
    var reg = /[\u4e00-\u9fa5]/g
    var result = cellvalue.match(reg)
    console.log(result.join(''))
    return result.join('')
  } else {
    return ''
  }
}
