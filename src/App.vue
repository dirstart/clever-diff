<script setup>
import { ref, onMounted } from 'vue'
import { userApi, productApi, authApi, commonApi } from './api/index.js'

// 响应式数据
const users = ref([])
const products = ref([])
const stats = ref({})
const config = ref({})
const loading = ref(false)
const error = ref('')

// 获取用户列表
const fetchUsers = async () => {
  try {
    loading.value = true
    const response = await userApi.getUsers()
    users.value = response.data.list
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// 获取产品列表
const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await productApi.getProducts()
    products.value = response.data.list
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// 获取统计数据
const fetchStats = async () => {
  try {
    const response = await commonApi.getStats()
    stats.value = response.data
  } catch (err) {
    error.value = err.message
  }
}

// 获取系统配置
const fetchConfig = async () => {
  try {
    const response = await commonApi.getConfig()
    config.value = response.data
  } catch (err) {
    error.value = err.message
  }
}

// 登录测试
const testLogin = async () => {
  try {
    const response = await authApi.login({
      username: 'admin',
      password: '123456'
    })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      alert('登录成功！')
    }
  } catch (err) {
    alert('登录失败：' + err.message)
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchUsers()
  fetchProducts()
  fetchStats()
  fetchConfig()
})
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>{{ config.siteName || 'Mock 数据展示' }}</h1>
      <p>版本: {{ config.version || '1.0.0' }}</p>
      <button
        @click="testLogin"
        class="login-btn"
      >测试登录</button>
    </header>

    <div class="stats-section">
      <h2>统计数据</h2>
      <div
        class="stats-grid"
        v-if="stats.userCount"
      >
        <div class="stat-card">
          <h3>用户数量</h3>
          <p class="stat-number">{{ stats.userCount }}</p>
        </div>
        <div class="stat-card">
          <h3>产品数量</h3>
          <p class="stat-number">{{ stats.productCount }}</p>
        </div>
        <div class="stat-card">
          <h3>订单数量</h3>
          <p class="stat-number">{{ stats.orderCount }}</p>
        </div>
        <div class="stat-card">
          <h3>收入</h3>
          <p class="stat-number">¥{{ stats.revenue }}</p>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="section">
        <h2>用户列表</h2>
        <div
          v-if="loading"
          class="loading"
        >加载中...</div>
        <div
          v-else-if="error"
          class="error"
        >错误: {{ error }}</div>
        <div
          v-else
          class="user-grid"
        >
          <div
            v-for="user in users.slice(0, 6)"
            :key="user.id"
            class="user-card"
          >
            <img
              :src="user.avatar"
              :alt="user.name"
              class="avatar"
            />
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
            <p>{{ user.phone }}</p>
            <span :class="['status', user.status]">{{ user.status }}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>产品列表</h2>
        <div
          v-if="loading"
          class="loading"
        >加载中...</div>
        <div
          v-else-if="error"
          class="error"
        >错误: {{ error }}</div>
        <div
          v-else
          class="product-grid"
        >
          <div
            v-for="product in products.slice(0, 4)"
            :key="product.id"
            class="product-card"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="product-image"
            />
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-desc">{{ product.description }}</p>
              <div class="price-section">
                <span class="current-price">¥{{ product.price }}</span>
                <span class="original-price">¥{{ product.originalPrice }}</span>
              </div>
              <div class="product-meta">
                <span class="category">{{ product.category }}</span>
                <span class="rating">⭐ {{ product.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.login-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.login-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.stats-section {
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-number {
  font-size: 2em;
  font-weight: bold;
  color: #667eea;
  margin: 10px 0;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.section {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.user-grid,
.product-grid {
  display: grid;
  gap: 15px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: transform 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-card h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.user-card p {
  margin: 2px 0;
  color: #666;
  font-size: 0.9em;
}

.status {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  margin-left: auto;
}

.status.active {
  background: #e8f5e8;
  color: #4caf50;
}

.status.inactive {
  background: #ffeaea;
  color: #f44336;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.product-desc {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.price-section {
  margin-bottom: 10px;
}

.current-price {
  font-size: 1.2em;
  font-weight: bold;
  color: #e74c3c;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  margin-left: 10px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  color: #666;
}

.rating {
  color: #ffa500;
  font-weight: bold;
}

.loading,
.error {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
