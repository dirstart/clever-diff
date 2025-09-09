// Mock 服务测试文件
// 这个文件用于测试 mock 服务是否正常工作

// 测试用户 API
async function testUserAPI() {
  console.log('🧪 测试用户 API...')

  try {
    // 测试获取用户列表
    const usersResponse = await fetch('/api/users?page=1&pageSize=5')
    const usersData = await usersResponse.json()
    console.log('✅ 获取用户列表:', usersData)

    // 测试获取用户详情
    if (usersData.data?.list?.length > 0) {
      const userId = usersData.data.list[0].id
      const userResponse = await fetch(`/api/users/${userId}`)
      const userData = await userResponse.json()
      console.log('✅ 获取用户详情:', userData)
    }

  } catch (error) {
    console.error('❌ 用户 API 测试失败:', error)
  }
}

// 测试产品 API
async function testProductAPI() {
  console.log('🧪 测试产品 API...')

  try {
    // 测试获取产品列表
    const productsResponse = await fetch('/api/products?page=1&pageSize=5')
    const productsData = await productsResponse.json()
    console.log('✅ 获取产品列表:', productsData)

    // 测试搜索产品
    const searchResponse = await fetch('/api/products/search?keyword=iPhone')
    const searchData = await searchResponse.json()
    console.log('✅ 搜索产品:', searchData)

  } catch (error) {
    console.error('❌ 产品 API 测试失败:', error)
  }
}

// 测试认证 API
async function testAuthAPI() {
  console.log('🧪 测试认证 API...')

  try {
    // 测试登录
    const loginResponse = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: '123456'
      })
    })
    const loginData = await loginResponse.json()
    console.log('✅ 用户登录:', loginData)

    if (loginData.data?.token) {
      // 测试获取用户信息
      const userInfoResponse = await fetch('/api/auth/userinfo', {
        headers: {
          'Authorization': `Bearer ${loginData.data.token}`
        }
      })
      const userInfoData = await userInfoResponse.json()
      console.log('✅ 获取用户信息:', userInfoData)
    }

  } catch (error) {
    console.error('❌ 认证 API 测试失败:', error)
  }
}

// 测试通用 API
async function testCommonAPI() {
  console.log('🧪 测试通用 API...')

  try {
    // 测试获取统计数据
    const statsResponse = await fetch('/api/dashboard/stats')
    const statsData = await statsResponse.json()
    console.log('✅ 获取统计数据:', statsData)

    // 测试获取系统配置
    const configResponse = await fetch('/api/config')
    const configData = await configResponse.json()
    console.log('✅ 获取系统配置:', configData)

    // 测试健康检查
    const healthResponse = await fetch('/api/health')
    const healthData = await healthResponse.json()
    console.log('✅ 健康检查:', healthData)

  } catch (error) {
    console.error('❌ 通用 API 测试失败:', error)
  }
}

// 运行所有测试
async function runAllTests() {
  console.log('🚀 开始 Mock 服务测试...')
  console.log('='.repeat(50))

  await testUserAPI()
  console.log('')

  await testProductAPI()
  console.log('')

  await testAuthAPI()
  console.log('')

  await testCommonAPI()
  console.log('')

  console.log('='.repeat(50))
  console.log('🎉 Mock 服务测试完成!')
}

// 如果在浏览器环境中，自动运行测试
if (typeof window !== 'undefined') {
  // 等待页面加载完成后运行测试
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests)
  } else {
    runAllTests()
  }
}

// 导出测试函数供手动调用
export {
  testUserAPI,
  testProductAPI,
  testAuthAPI,
  testCommonAPI,
  runAllTests
}
