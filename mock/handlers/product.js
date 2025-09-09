// 产品相关 Mock 处理器
import { allProducts } from '../data/product'
import { createResponse, createPageData, generateId, generateTime, delay, validateParams } from '../utils'

export const productHandlers = [
  // 获取产品列表
  {
    url: '/api/products',
    method: 'GET',
    response: async ({ query }) => {
      await delay(300)

      const {
        page = 1,
        pageSize = 10,
        keyword = '',
        category = '',
        brand = '',
        minPrice = '',
        maxPrice = '',
        status = ''
      } = query

      // 过滤产品数据
      let filteredProducts = allProducts

      if (keyword) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.includes(keyword) ||
          product.description.includes(keyword) ||
          product.tags.some(tag => tag.includes(keyword))
        )
      }

      if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category)
      }

      if (brand) {
        filteredProducts = filteredProducts.filter(product => product.brand === brand)
      }

      if (minPrice) {
        filteredProducts = filteredProducts.filter(product => product.price >= Number(minPrice))
      }

      if (maxPrice) {
        filteredProducts = filteredProducts.filter(product => product.price <= Number(maxPrice))
      }

      if (status !== '') {
        filteredProducts = filteredProducts.filter(product => product.status === Number(status))
      }

      const pageData = createPageData(filteredProducts, page, pageSize)

      return createResponse(pageData)
    }
  },

  // 获取产品详情
  {
    url: '/api/products/:id',
    method: 'GET',
    response: async ({ query }) => {
      await delay(200)

      const { id } = query
      const product = allProducts.find(p => p.id === id)

      if (!product) {
        return createResponse(null, '产品不存在', 404)
      }

      return createResponse(product)
    }
  },

  // 搜索产品
  {
    url: '/api/products/search',
    method: 'GET',
    response: async ({ query }) => {
      await delay(250)

      const { keyword = '', limit = 10 } = query

      if (!keyword) {
        return createResponse([])
      }

      const searchResults = allProducts
        .filter(product =>
          product.name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(keyword.toLowerCase()) ||
          product.brand.toLowerCase().includes(keyword.toLowerCase()) ||
          product.category.toLowerCase().includes(keyword.toLowerCase())
        )
        .slice(0, Number(limit))
        .map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          images: product.images,
          brand: product.brand,
          category: product.category
        }))

      return createResponse(searchResults)
    }
  },

  // 创建产品
  {
    url: '/api/products',
    method: 'POST',
    response: async ({ body }) => {
      await delay(500)

      try {
        validateParams(body, ['name', 'price', 'category'])

        const newProduct = {
          id: generateId(),
          name: body.name,
          description: body.description || '',
          price: Number(body.price),
          originalPrice: Number(body.originalPrice || body.price),
          category: body.category,
          brand: body.brand || '',
          images: body.images || 'https://picsum.photos/300/300?random=' + Math.random(),
          stock: Number(body.stock || 0),
          sales: 0,
          rating: 0,
          status: body.status !== undefined ? body.status : 1,
          tags: body.tags || [],
          createdAt: generateTime(),
          updatedAt: generateTime()
        }

        allProducts.unshift(newProduct)

        return createResponse(newProduct, '产品创建成功')
      } catch (error) {
        return createResponse(null, error.message, 400)
      }
    }
  },

  // 更新产品
  {
    url: '/api/products/:id',
    method: 'PUT',
    response: async ({ query, body }) => {
      await delay(400)

      const { id } = query
      const productIndex = allProducts.findIndex(p => p.id === id)

      if (productIndex === -1) {
        return createResponse(null, '产品不存在', 404)
      }

      const updatedProduct = {
        ...allProducts[productIndex],
        ...body,
        id, // 确保ID不被修改
        updatedAt: generateTime()
      }

      allProducts[productIndex] = updatedProduct

      return createResponse(updatedProduct, '产品更新成功')
    }
  },

  // 删除产品
  {
    url: '/api/products/:id',
    method: 'DELETE',
    response: async ({ query }) => {
      await delay(300)

      const { id } = query
      const productIndex = allProducts.findIndex(p => p.id === id)

      if (productIndex === -1) {
        return createResponse(null, '产品不存在', 404)
      }

      allProducts.splice(productIndex, 1)

      return createResponse(null, '产品删除成功')
    }
  }
]
