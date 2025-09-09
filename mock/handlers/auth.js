// 认证相关 Mock 处理器
import { allUsers } from '../data/user'
import { createResponse, generateId, generateTime, delay, validateParams } from '../utils'

// 模拟用户会话存储
const userSessions = new Map()

export const authHandlers = [
  // 用户登录
  {
    url: '/api/auth/login',
    method: 'POST',
    response: async ({ body }) => {
      await delay(800)

      try {
        validateParams(body, ['username', 'password'])

        const { username, password } = body

        // 模拟用户验证
        const user = allUsers.find(u =>
          (u.username === username || u.email === username) &&
          u.status === 1
        )

        if (!user) {
          return createResponse(null, '用户名或密码错误', 401)
        }

        // 模拟密码验证（实际项目中应该使用加密验证）
        if (password !== '123456') {
          return createResponse(null, '用户名或密码错误', 401)
        }

        // 生成token
        const token = generateId()
        const sessionData = {
          token,
          userId: user.id,
          username: user.username,
          role: user.role,
          loginTime: generateTime(),
          expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24小时过期
        }

        // 存储会话
        userSessions.set(token, sessionData)

        // 更新用户最后登录时间
        const userIndex = allUsers.findIndex(u => u.id === user.id)
        if (userIndex !== -1) {
          allUsers[userIndex].lastLoginAt = generateTime()
        }

        return createResponse({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role
          }
        }, '登录成功')
      } catch (error) {
        return createResponse(null, error.message, 400)
      }
    }
  },

  // 获取用户信息
  {
    url: '/api/auth/userinfo',
    method: 'GET',
    response: async ({ headers }) => {
      await delay(200)

      const token = headers.authorization?.replace('Bearer ', '')

      if (!token) {
        return createResponse(null, '未提供认证token', 401)
      }

      const session = userSessions.get(token)

      if (!session || Date.now() > session.expiresAt) {
        userSessions.delete(token)
        return createResponse(null, 'token已过期或无效', 401)
      }

      const user = allUsers.find(u => u.id === session.userId)

      if (!user) {
        return createResponse(null, '用户不存在', 404)
      }

      return createResponse({
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt
      })
    }
  },

  // 用户登出
  {
    url: '/api/auth/logout',
    method: 'POST',
    response: async ({ headers }) => {
      await delay(200)

      const token = headers.authorization?.replace('Bearer ', '')

      if (token) {
        userSessions.delete(token)
      }

      return createResponse(null, '登出成功')
    }
  },

  // 刷新token
  {
    url: '/api/auth/refresh',
    method: 'POST',
    response: async ({ headers }) => {
      await delay(300)

      const token = headers.authorization?.replace('Bearer ', '')

      if (!token) {
        return createResponse(null, '未提供认证token', 401)
      }

      const session = userSessions.get(token)

      if (!session || Date.now() > session.expiresAt) {
        userSessions.delete(token)
        return createResponse(null, 'token已过期或无效', 401)
      }

      // 生成新的token
      const newToken = generateId()
      const newSessionData = {
        ...session,
        token: newToken,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000
      }

      // 删除旧token，存储新token
      userSessions.delete(token)
      userSessions.set(newToken, newSessionData)

      return createResponse({
        token: newToken
      }, 'token刷新成功')
    }
  },

  // 修改密码
  {
    url: '/api/auth/change-password',
    method: 'POST',
    response: async ({ headers, body }) => {
      await delay(500)

      const token = headers.authorization?.replace('Bearer ', '')

      if (!token) {
        return createResponse(null, '未提供认证token', 401)
      }

      const session = userSessions.get(token)

      if (!session || Date.now() > session.expiresAt) {
        userSessions.delete(token)
        return createResponse(null, 'token已过期或无效', 401)
      }

      try {
        validateParams(body, ['oldPassword', 'newPassword'])

        const { oldPassword, newPassword } = body

        // 模拟旧密码验证
        if (oldPassword !== '123456') {
          return createResponse(null, '旧密码错误', 400)
        }

        // 模拟新密码验证
        if (newPassword.length < 6) {
          return createResponse(null, '新密码长度不能少于6位', 400)
        }

        return createResponse(null, '密码修改成功')
      } catch (error) {
        return createResponse(null, error.message, 400)
      }
    }
  }
]
