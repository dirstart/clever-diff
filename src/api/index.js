// API 服务文件
class ApiService {
  constructor() {
    this.baseURL = ''
  }

  // 通用请求方法
  async request(url, options = {}) {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    // 如果有 token，添加到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (data.code === 200) {
        return data
      } else {
        throw new Error(data.message || '请求失败')
      }
    } catch (error) {
      console.error('API 请求错误:', error)
      throw error
    }
  }

  // GET 请求
  get(url, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const fullUrl = queryString ? `${url}?${queryString}` : url
    return this.request(fullUrl)
  }

  // POST 请求
  post(url, data = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // PUT 请求
  put(url, data = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // DELETE 请求
  delete(url) {
    return this.request(url, {
      method: 'DELETE'
    })
  }
}

// 创建 API 实例
const api = new ApiService()

// 用户相关 API
export const userApi = {
  // 获取用户列表
  getUsers: (params = {}) => api.get('/api/users', params),

  // 获取用户详情
  getUserById: (id) => api.get(`/api/users/${id}`),

  // 创建用户
  createUser: (userData) => api.post('/api/users', userData),

  // 更新用户
  updateUser: (id, userData) => api.put(`/api/users/${id}`, userData),

  // 删除用户
  deleteUser: (id) => api.delete(`/api/users/${id}`)
}

// 产品相关 API
export const productApi = {
  // 获取产品列表
  getProducts: (params = {}) => api.get('/api/products', params),

  // 获取产品详情
  getProductById: (id) => api.get(`/api/products/${id}`),

  // 搜索产品
  searchProducts: (keyword) => api.get('/api/products/search', { keyword })
}

// 认证相关 API
export const authApi = {
  // 登录
  login: (credentials) => api.post('/api/auth/login', credentials),

  // 获取用户信息
  getUserInfo: () => api.get('/api/auth/userinfo'),

  // 登出
  logout: () => {
    localStorage.removeItem('token')
    return Promise.resolve()
  }
}

// 通用 API
export const commonApi = {
  // 上传文件
  upload: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.request('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {} // 不设置 Content-Type，让浏览器自动设置
    })
  },

  // 获取统计数据
  getStats: () => api.get('/api/dashboard/stats'),

  // 获取系统配置
  getConfig: () => api.get('/api/config')
}

export default api
