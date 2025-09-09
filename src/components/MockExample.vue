<template>
  <div class="mock-example">
    <h2>Mock API 使用示例</h2>
    
    <!-- 用户管理示例 -->
    <div class="section">
      <h3>用户管理</h3>
      <div class="controls">
        <button @click="loadUsers">加载用户列表</button>
        <button @click="createUser">创建用户</button>
        <button @click="login">登录测试</button>
      </div>
      <div class="data-display">
        <h4>用户列表:</h4>
        <pre>{{ JSON.stringify(users, null, 2) }}</pre>
      </div>
    </div>

    <!-- 产品管理示例 -->
    <div class="section">
      <h3>产品管理</h3>
      <div class="controls">
        <button @click="loadProducts">加载产品列表</button>
        <button @click="searchProducts">搜索产品</button>
      </div>
      <div class="data-display">
        <h4>产品列表:</h4>
        <pre>{{ JSON.stringify(products, null, 2) }}</pre>
      </div>
    </div>

    <!-- 系统信息示例 -->
    <div class="section">
      <h3>系统信息</h3>
      <div class="controls">
        <button @click="loadStats">加载统计数据</button>
        <button @click="loadConfig">加载系统配置</button>
      </div>
      <div class="data-display">
        <h4>统计数据:</h4>
        <pre>{{ JSON.stringify(stats, null, 2) }}</pre>
        <h4>系统配置:</h4>
        <pre>{{ JSON.stringify(config, null, 2) }}</pre>
      </div>
    </div>

    <!-- 错误信息显示 -->
    <div v-if="error" class="error">
      <h4>错误信息:</h4>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<script>
import { userApi, productApi, commonApi, authApi } from '../api/index.js'

export default {
  name: 'MockExample',
  data() {
    return {
      users: null,
      products: null,
      stats: null,
      config: null,
      error: null
    }
  },
  methods: {
    async loadUsers() {
      try {
        this.error = null
        const response = await userApi.getUsers({ page: 1, pageSize: 5 })
        this.users = response.data
        console.log('用户列表加载成功:', response)
      } catch (error) {
        this.error = error.message
        console.error('加载用户列表失败:', error)
      }
    },

    async createUser() {
      try {
        this.error = null
        const newUser = {
          username: `user_${Date.now()}`,
          email: `user_${Date.now()}@example.com`,
          phone: '13800138000',
          role: 'user'
        }
        const response = await userApi.createUser(newUser)
        console.log('用户创建成功:', response)
        // 重新加载用户列表
        await this.loadUsers()
      } catch (error) {
        this.error = error.message
        console.error('创建用户失败:', error)
      }
    },

    async login() {
      try {
        this.error = null
        const response = await authApi.login({
          username: 'admin',
          password: '123456'
        })
        console.log('登录成功:', response)
        
        // 获取用户信息
        const userInfo = await authApi.getUserInfo()
        console.log('用户信息:', userInfo)
      } catch (error) {
        this.error = error.message
        console.error('登录失败:', error)
      }
    },

    async loadProducts() {
      try {
        this.error = null
        const response = await productApi.getProducts({ page: 1, pageSize: 5 })
        this.products = response.data
        console.log('产品列表加载成功:', response)
      } catch (error) {
        this.error = error.message
        console.error('加载产品列表失败:', error)
      }
    },

    async searchProducts() {
      try {
        this.error = null
        const response = await productApi.searchProducts('iPhone')
        console.log('产品搜索成功:', response)
      } catch (error) {
        this.error = error.message
        console.error('搜索产品失败:', error)
      }
    },

    async loadStats() {
      try {
        this.error = null
        const response = await commonApi.getStats()
        this.stats = response.data
        console.log('统计数据加载成功:', response)
      } catch (error) {
        this.error = error.message
        console.error('加载统计数据失败:', error)
      }
    },

    async loadConfig() {
      try {
        this.error = null
        const response = await commonApi.getConfig()
        this.config = response.data
        console.log('系统配置加载成功:', response)
      } catch (error) {
        this.error = error.message
        console.error('加载系统配置失败:', error)
      }
    }
  },

  async mounted() {
    // 页面加载时自动加载一些数据
    await this.loadUsers()
    await this.loadProducts()
    await this.loadStats()
    await this.loadConfig()
  }
}
</script>

<style scoped>
.mock-example {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}

.section h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007acc;
  padding-bottom: 10px;
}

.controls {
  margin-bottom: 20px;
}

.controls button {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.controls button:hover {
  background-color: #005a9e;
}

.data-display {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
}

.data-display h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #555;
}

.data-display pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
  max-height: 300px;
  overflow-y: auto;
}

.error {
  background-color: #ffe6e6;
  border: 1px solid #ff9999;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
}

.error h4 {
  color: #cc0000;
  margin-top: 0;
}

.error pre {
  background-color: #fff5f5;
  color: #cc0000;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}
</style>
