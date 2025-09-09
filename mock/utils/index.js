// Mock 工具函数
import Mock from 'mockjs'

// 生成统一响应格式
export const createResponse = (data, message = '操作成功', code = 200) => {
  return {
    code,
    message,
    data,
    timestamp: Date.now()
  }
}

// 生成分页数据
export const createPageData = (list, page = 1, pageSize = 10, total = null) => {
  const totalCount = total || list.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pageList = list.slice(start, end)

  return {
    list: pageList,
    pagination: {
      page: Number(page),
      pageSize: Number(pageSize),
      total: totalCount,
      totalPages: Math.ceil(totalCount / pageSize)
    }
  }
}

// 生成随机ID
export const generateId = () => {
  return Mock.mock('@id')
}

// 生成随机时间
export const generateTime = (format = 'yyyy-MM-dd HH:mm:ss') => {
  return Mock.mock(`@datetime('${format}')`)
}

// 模拟延迟响应
export const delay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 模拟网络错误
export const mockError = (message = '网络错误', code = 500) => {
  return createResponse(null, message, code)
}

// 验证请求参数
export const validateParams = (params, required = []) => {
  const missing = required.filter(key => !params[key])
  if (missing.length > 0) {
    throw new Error(`缺少必要参数: ${missing.join(', ')}`)
  }
  return true
}

// 生成随机布尔值
export const randomBoolean = () => Mock.mock('@boolean')

// 生成随机数字
export const randomNumber = (min = 1, max = 100) => {
  return Mock.mock(`@integer(${min}, ${max})`)
}

// 生成随机字符串
export const randomString = (length = 8) => {
  return Mock.mock(`@string('lower', ${length})`)
}
