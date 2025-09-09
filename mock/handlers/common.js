// 通用功能 Mock 处理器
import { createResponse, generateId, generateTime, delay, randomNumber } from '../utils'

export const commonHandlers = [
  // 文件上传
  {
    url: '/api/upload',
    method: 'POST',
    response: async ({ body }) => {
      await delay(1000)

      // 模拟文件上传处理
      const fileId = generateId()
      const fileName = `upload_${Date.now()}.jpg`
      const fileUrl = `https://picsum.photos/400/400?random=${randomNumber(1, 1000)}`

      return createResponse({
        id: fileId,
        name: fileName,
        url: fileUrl,
        size: randomNumber(100, 5000), // KB
        type: 'image/jpeg',
        uploadedAt: generateTime()
      }, '文件上传成功')
    }
  },

  // 获取统计数据
  {
    url: '/api/dashboard/stats',
    method: 'GET',
    response: async () => {
      await delay(300)

      const stats = {
        totalUsers: randomNumber(1000, 10000),
        totalProducts: randomNumber(500, 5000),
        totalOrders: randomNumber(2000, 20000),
        totalRevenue: randomNumber(100000, 1000000),
        todayUsers: randomNumber(10, 100),
        todayOrders: randomNumber(20, 200),
        todayRevenue: randomNumber(5000, 50000),
        userGrowth: randomNumber(-10, 20), // 百分比
        orderGrowth: randomNumber(-5, 15),
        revenueGrowth: randomNumber(-8, 25)
      }

      return createResponse(stats)
    }
  },

  // 获取系统配置
  {
    url: '/api/config',
    method: 'GET',
    response: async () => {
      await delay(200)

      const config = {
        siteName: 'JSON Diff 工具',
        siteDescription: '一个简单易用的JSON差异对比工具',
        version: '1.0.0',
        features: {
          jsonDiff: true,
          jsonFormat: true,
          jsonValidate: true,
          exportResult: true
        },
        limits: {
          maxFileSize: 10 * 1024 * 1024, // 10MB
          maxJsonSize: 5 * 1024 * 1024,  // 5MB
          maxHistoryItems: 100
        },
        theme: {
          defaultTheme: 'light',
          availableThemes: ['light', 'dark', 'auto']
        },
        api: {
          timeout: 30000,
          retryCount: 3
        }
      }

      return createResponse(config)
    }
  },

  // 获取系统日志
  {
    url: '/api/logs',
    method: 'GET',
    response: async ({ query }) => {
      await delay(400)

      const { page = 1, pageSize = 20, level = '', startDate = '', endDate = '' } = query

      // 模拟日志数据
      const logLevels = ['info', 'warn', 'error', 'debug']
      const logMessages = [
        '用户登录成功',
        '文件上传完成',
        'JSON解析错误',
        '系统启动完成',
        '数据库连接异常',
        '缓存清理完成',
        'API请求超时',
        '用户权限验证失败'
      ]

      const logs = Array.from({ length: 50 }, (_, index) => ({
        id: generateId(),
        level: level || logLevels[randomNumber(0, logLevels.length - 1)],
        message: logMessages[randomNumber(0, logMessages.length - 1)],
        timestamp: generateTime(),
        source: `module_${randomNumber(1, 5)}`,
        userId: randomNumber(1, 100),
        ip: `192.168.1.${randomNumber(1, 255)}`
      }))

      // 过滤日志
      let filteredLogs = logs

      if (level) {
        filteredLogs = filteredLogs.filter(log => log.level === level)
      }

      if (startDate) {
        filteredLogs = filteredLogs.filter(log => log.timestamp >= startDate)
      }

      if (endDate) {
        filteredLogs = filteredLogs.filter(log => log.timestamp <= endDate)
      }

      // 分页
      const start = (page - 1) * pageSize
      const end = start + pageSize
      const pageLogs = filteredLogs.slice(start, end)

      return createResponse({
        list: pageLogs,
        pagination: {
          page: Number(page),
          pageSize: Number(pageSize),
          total: filteredLogs.length,
          totalPages: Math.ceil(filteredLogs.length / pageSize)
        }
      })
    }
  },

  // 健康检查
  {
    url: '/api/health',
    method: 'GET',
    response: async () => {
      await delay(100)

      return createResponse({
        status: 'healthy',
        timestamp: generateTime(),
        uptime: randomNumber(1000, 10000), // 秒
        version: '1.0.0',
        services: {
          database: 'healthy',
          cache: 'healthy',
          storage: 'healthy',
          api: 'healthy'
        }
      })
    }
  },

  // 获取系统信息
  {
    url: '/api/system/info',
    method: 'GET',
    response: async () => {
      await delay(200)

      return createResponse({
        os: 'Linux',
        nodeVersion: '18.17.0',
        memory: {
          total: '8GB',
          used: '4.2GB',
          free: '3.8GB'
        },
        cpu: {
          usage: randomNumber(10, 80), // 百分比
          cores: 8
        },
        disk: {
          total: '500GB',
          used: '200GB',
          free: '300GB'
        }
      })
    }
  }
]
