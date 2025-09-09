// 用户相关 Mock 处理器
import { allUsers } from '../data/user'
import { createResponse, createPageData, generateId, generateTime, delay, validateParams } from '../utils'

export const userHandlers = [
  // 获取用户列表
  {
    url: '/api/users',
    method: 'GET',
    response: async ({ query }) => {
      await delay(300)

      const { page = 1, pageSize = 10, keyword = '', role = '', status = '' } = query

      // 过滤用户数据
      let filteredUsers = allUsers

      if (keyword) {
        filteredUsers = filteredUsers.filter(user =>
          user.username.includes(keyword) ||
          user.email.includes(keyword) ||
          user.phone.includes(keyword)
        )
      }

      if (role) {
        filteredUsers = filteredUsers.filter(user => user.role === role)
      }

      if (status !== '') {
        filteredUsers = filteredUsers.filter(user => user.status === Number(status))
      }

      const pageData = createPageData(filteredUsers, page, pageSize)

      return createResponse(pageData)
    }
  },

  // 获取用户详情
  {
    url: '/api/users/:id',
    method: 'GET',
    response: async ({ query }) => {
      await delay(200)

      const { id } = query
      const user = allUsers.find(u => u.id === id)

      if (!user) {
        return createResponse(null, '用户不存在', 404)
      }

      return createResponse(user)
    }
  },

  // 创建用户
  {
    url: '/api/users',
    method: 'POST',
    response: async ({ body }) => {
      await delay(500)

      try {
        validateParams(body, ['username', 'email'])

        // 检查用户名是否已存在
        const existingUser = allUsers.find(u => u.username === body.username)
        if (existingUser) {
          return createResponse(null, '用户名已存在', 400)
        }

        // 检查邮箱是否已存在
        const existingEmail = allUsers.find(u => u.email === body.email)
        if (existingEmail) {
          return createResponse(null, '邮箱已存在', 400)
        }

        const newUser = {
          id: generateId(),
          username: body.username,
          email: body.email,
          phone: body.phone || '',
          avatar: body.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + body.username,
          role: body.role || 'user',
          status: body.status !== undefined ? body.status : 1,
          createdAt: generateTime(),
          updatedAt: generateTime(),
          lastLoginAt: null
        }

        allUsers.unshift(newUser)

        return createResponse(newUser, '用户创建成功')
      } catch (error) {
        return createResponse(null, error.message, 400)
      }
    }
  },

  // 更新用户
  {
    url: '/api/users/:id',
    method: 'PUT',
    response: async ({ query, body }) => {
      await delay(400)

      const { id } = query
      const userIndex = allUsers.findIndex(u => u.id === id)

      if (userIndex === -1) {
        return createResponse(null, '用户不存在', 404)
      }

      // 检查用户名是否被其他用户使用
      if (body.username) {
        const existingUser = allUsers.find(u => u.username === body.username && u.id !== id)
        if (existingUser) {
          return createResponse(null, '用户名已存在', 400)
        }
      }

      // 检查邮箱是否被其他用户使用
      if (body.email) {
        const existingEmail = allUsers.find(u => u.email === body.email && u.id !== id)
        if (existingEmail) {
          return createResponse(null, '邮箱已存在', 400)
        }
      }

      const updatedUser = {
        ...allUsers[userIndex],
        ...body,
        id, // 确保ID不被修改
        updatedAt: generateTime()
      }

      allUsers[userIndex] = updatedUser

      return createResponse(updatedUser, '用户更新成功')
    }
  },

  // 删除用户
  {
    url: '/api/users/:id',
    method: 'DELETE',
    response: async ({ query }) => {
      await delay(300)

      const { id } = query
      const userIndex = allUsers.findIndex(u => u.id === id)

      if (userIndex === -1) {
        return createResponse(null, '用户不存在', 404)
      }

      // 不能删除管理员用户
      if (allUsers[userIndex].role === 'admin') {
        return createResponse(null, '不能删除管理员用户', 400)
      }

      allUsers.splice(userIndex, 1)

      return createResponse(null, '用户删除成功')
    }
  }
]
