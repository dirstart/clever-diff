# 🚀 Mock 服务完整解决方案

## 📋 项目概述

我已经为您创建了一个结构清晰、功能完整的 Mock 服务解决方案。这个方案基于 `vite-plugin-mock` 和 `mockjs`，提供了非侵入式的 API 模拟服务。

## 🏗️ 项目结构

```
clever-diff/
├── mock/                          # Mock 服务目录
│   ├── index.js                   # Mock 服务入口
│   ├── prod-server.js             # 生产环境 Mock 服务器
│   ├── README.md                  # 详细文档
│   ├── test.js                    # 测试文件
│   ├── utils/                     # 工具函数
│   │   └── index.js               # 通用工具函数
│   ├── data/                      # Mock 数据
│   │   ├── user.js                # 用户数据
│   │   └── product.js             # 产品数据
│   └── handlers/                  # API 处理器
│       ├── user.js                # 用户相关 API
│       ├── product.js             # 产品相关 API
│       ├── auth.js                # 认证相关 API
│       └── common.js              # 通用功能 API
├── src/
│   ├── api/index.js               # 现有的 API 服务
│   ├── App.vue                    # 主应用（已集成 Mock 示例）
│   └── components/
│       └── MockExample.vue        # Mock 使用示例组件
├── vite.config.js                 # Vite 配置（已优化）
└── package.json                   # 项目依赖
```

## ✨ 核心特性

### 🎯 非侵入式设计
- 独立的 `mock/` 文件夹，不影响业务代码
- 开发环境自动启用，生产环境自动禁用
- 支持热更新，实时查看请求日志

### 📊 完整的数据管理
- **用户管理**: 50+ 用户数据，支持增删改查
- **产品管理**: 100+ 产品数据，支持搜索过滤
- **认证系统**: 完整的登录、权限验证流程
- **通用功能**: 文件上传、统计数据、系统配置等

### 🔧 开发友好
- 统一的响应格式和错误处理
- 模拟真实的网络延迟
- 支持分页、搜索、过滤功能
- 完整的 TypeScript 支持（可选）

## 🚀 快速开始

### 1. 启动开发服务器
```bash
npm run dev
```

### 2. 测试 Mock API
打开浏览器访问 `http://localhost:3000`，您将看到：
- 用户列表展示
- 产品列表展示
- 统计数据展示
- 登录功能测试

### 3. 测试账号
```
用户名: admin
密码: 123456
角色: admin

用户名: user1
密码: 123456
角色: user
```

## 📡 API 接口列表

### 用户管理 (`/api/users`)
- `GET /api/users` - 获取用户列表（支持分页、搜索、过滤）
- `GET /api/users/:id` - 获取用户详情
- `POST /api/users` - 创建用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户

### 产品管理 (`/api/products`)
- `GET /api/products` - 获取产品列表（支持分页、搜索、过滤）
- `GET /api/products/:id` - 获取产品详情
- `GET /api/products/search` - 搜索产品
- `POST /api/products` - 创建产品
- `PUT /api/products/:id` - 更新产品
- `DELETE /api/products/:id` - 删除产品

### 认证系统 (`/api/auth`)
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/userinfo` - 获取用户信息
- `POST /api/auth/logout` - 用户登出
- `POST /api/auth/refresh` - 刷新 token
- `POST /api/auth/change-password` - 修改密码

### 通用功能 (`/api/*`)
- `POST /api/upload` - 文件上传
- `GET /api/dashboard/stats` - 获取统计数据
- `GET /api/config` - 获取系统配置
- `GET /api/logs` - 获取系统日志
- `GET /api/health` - 健康检查
- `GET /api/system/info` - 获取系统信息

## 🛠️ 使用示例

### 在 Vue 组件中使用
```javascript
import { userApi, productApi, authApi } from './api/index.js'

// 获取用户列表
const users = await userApi.getUsers({ page: 1, pageSize: 10 })

// 用户登录
const loginResult = await authApi.login({
  username: 'admin',
  password: '123456'
})

// 获取产品列表
const products = await productApi.getProducts({ category: '电子产品' })
```

### 响应格式
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [...],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 100,
      "totalPages": 10
    }
  },
  "timestamp": 1640995200000
}
```

## 🔧 配置说明

### Vite 配置
```javascript
// vite.config.js
viteMockServe({
  mockPath: 'mock',           // mock 文件目录
  enable: true,               // 是否启用
  watchFiles: true,           // 监听文件变化
  logger: true,               // 显示请求日志
  supportTs: false,           // 是否支持 TypeScript
  localEnabled: true,         // 本地开发环境启用
  prodEnabled: false,         // 生产环境禁用
})
```

## 📚 扩展指南

### 添加新的 API 接口
1. 在 `mock/data/` 目录下创建数据文件
2. 在 `mock/handlers/` 目录下创建处理器文件
3. 在 `mock/index.js` 中导入并注册

### 自定义工具函数
在 `mock/utils/index.js` 中添加新的工具函数。

### 数据持久化
当前使用内存存储，如需持久化可以：
- 使用 localStorage 存储到浏览器
- 集成真实的后端数据库
- 使用 JSON 文件存储

## 🎉 总结

这个 Mock 解决方案提供了：

✅ **完整的 API 模拟服务**  
✅ **结构清晰的代码组织**  
✅ **非侵入式的设计理念**  
✅ **开发友好的功能特性**  
✅ **详细的文档和示例**  
✅ **易于扩展和维护**  

现在您可以：
1. 启动开发服务器：`npm run dev`
2. 访问 `http://localhost:3000` 查看效果
3. 在浏览器控制台查看 Mock 请求日志
4. 根据需要扩展和自定义 Mock 服务

这个方案将大大提高您的开发效率，让您能够专注于前端业务逻辑的开发！
