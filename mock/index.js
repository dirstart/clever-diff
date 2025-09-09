// Mock 服务入口文件
import { userHandlers } from './handlers/user'
import { productHandlers } from './handlers/product'
import { authHandlers } from './handlers/auth'
import { commonHandlers } from './handlers/common'

// 合并所有 mock 处理器
export default [
  ...userHandlers,
  ...productHandlers,
  ...authHandlers,
  ...commonHandlers
]
