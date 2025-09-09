// 用户相关 Mock 数据
import Mock from 'mockjs'

// 生成用户数据模板
const userTemplate = {
  id: '@id',
  username: '@name',
  email: '@email',
  phone: /^1[3-9]\d{9}$/,
  avatar: '@image("100x100", "@color", "@name")',
  role: '@pick(["admin", "user", "guest"])',
  status: '@pick([0, 1])', // 0: 禁用, 1: 启用
  createdAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
  updatedAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
  lastLoginAt: '@datetime("yyyy-MM-dd HH:mm:ss")'
}

// 生成用户列表数据
export const generateUsers = (count = 50) => {
  return Mock.mock({
    [`list|${count}`]: [userTemplate]
  }).list
}

// 预定义的用户数据
export const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    phone: '13800138000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    role: 'admin',
    status: 1,
    createdAt: '2024-01-01 10:00:00',
    updatedAt: '2024-01-15 14:30:00',
    lastLoginAt: '2024-01-15 14:30:00'
  },
  {
    id: '2',
    username: 'user1',
    email: 'user1@example.com',
    phone: '13800138001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    role: 'user',
    status: 1,
    createdAt: '2024-01-02 09:15:00',
    updatedAt: '2024-01-14 16:45:00',
    lastLoginAt: '2024-01-14 16:45:00'
  },
  {
    id: '3',
    username: 'guest',
    email: 'guest@example.com',
    phone: '13800138002',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
    role: 'guest',
    status: 0,
    createdAt: '2024-01-03 11:20:00',
    updatedAt: '2024-01-13 13:10:00',
    lastLoginAt: '2024-01-13 13:10:00'
  }
]

// 合并预定义数据和生成数据
export const allUsers = [...mockUsers, ...generateUsers(47)]
