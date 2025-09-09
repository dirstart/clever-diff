# Mock 服务文档

## 概述

这是一个基于 `vite-plugin-mock` 和 `mockjs` 的完整 Mock 解决方案，提供了结构清晰、功能完整的 API 模拟服务。

## 目录结构

```
mock/
├── index.js              # Mock 服务入口文件
├── prod-server.js        # 生产环境 Mock 服务器
├── README.md            # 文档说明
├── utils/               # 工具函数
│   └── index.js         # 通用工具函数
├── data/                # Mock 数据
│   ├── user.js          # 用户数据
│   └── product.js       # 产品数据
└── handlers/            # API 处理器
    ├── user.js          # 用户相关 API
    ├── product.js       # 产品相关 API
    ├── auth.js          # 认证相关 API
    └── common.js        # 通用功能 API
```

## API 接口

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

## 使用说明

### 1. 开发环境
Mock 服务在开发环境下自动启用，无需额外配置。

### 2. 测试账号
```
用户名: admin
密码: 123456
角色: admin

用户名: user1
密码: 123456
角色: user
```

### 3. 响应格式
所有 API 响应都遵循统一格式：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {},
  "timestamp": 1640995200000
}
```

### 4. 错误处理
- `400`: 请求参数错误
- `401`: 未授权或 token 无效
- `404`: 资源不存在
- `500`: 服务器内部错误

## 扩展指南

### 添加新的 API 接口

1. 在 `data/` 目录下创建对应的数据文件
2. 在 `handlers/` 目录下创建处理器文件
3. 在 `mock/index.js` 中导入并注册新的处理器

### 自定义工具函数

在 `utils/index.js` 中添加新的工具函数，供各个处理器使用。

### 数据持久化

当前使用内存存储，如需持久化，可以：
- 使用 localStorage 存储到浏览器
- 集成真实的后端数据库
- 使用 JSON 文件存储

## 配置选项

在 `vite.config.js` 中可以配置以下选项：

```javascript
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

## 注意事项

1. **生产环境**: Mock 服务默认在生产环境禁用，确保不会影响线上服务
2. **数据安全**: 测试数据不包含敏感信息，仅用于开发测试
3. **性能考虑**: 模拟了网络延迟，更接近真实环境
4. **兼容性**: 支持所有现代浏览器和 Node.js 环境

## 故障排除

### Mock 服务不工作
1. 检查 `vite.config.js` 配置是否正确
2. 确认 `mock/index.js` 文件存在且语法正确
3. 查看控制台是否有错误信息

### 请求返回 404
1. 检查 API 路径是否与 mock 处理器中的路径匹配
2. 确认 HTTP 方法是否正确
3. 查看 mock 日志确认请求是否被拦截

### 数据不更新
1. 确认使用了正确的 HTTP 方法（GET/POST/PUT/DELETE）
2. 检查请求参数是否正确
3. 查看 mock 处理器中的逻辑是否正确
