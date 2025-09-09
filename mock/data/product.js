// 产品相关 Mock 数据
import Mock from 'mockjs'

// 生成产品数据模板
const productTemplate = {
  id: '@id',
  name: '@ctitle(3, 8)',
  description: '@cparagraph(2, 4)',
  price: '@float(10, 9999, 2, 2)',
  originalPrice: '@float(10, 9999, 2, 2)',
  category: '@pick(["电子产品", "服装", "家居", "图书", "食品", "运动"])',
  brand: '@pick(["苹果", "华为", "小米", "三星", "耐克", "阿迪达斯", "无印良品"])',
  images: '@image("300x300", "@color", "@name")',
  stock: '@integer(0, 1000)',
  sales: '@integer(0, 10000)',
  rating: '@float(3, 5, 1, 1)',
  status: '@pick([0, 1])', // 0: 下架, 1: 上架
  tags: '@pick(["热销", "新品", "推荐", "限时优惠", "包邮"], 1, 3)',
  createdAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
  updatedAt: '@datetime("yyyy-MM-dd HH:mm:ss")'
}

// 生成产品列表数据
export const generateProducts = (count = 100) => {
  return Mock.mock({
    [`list|${count}`]: [productTemplate]
  }).list
}

// 预定义的产品数据
export const mockProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: '苹果最新旗舰手机，搭载A17 Pro芯片，支持5G网络',
    price: 7999.00,
    originalPrice: 8999.00,
    category: '电子产品',
    brand: '苹果',
    images: 'https://picsum.photos/300/300?random=1',
    stock: 50,
    sales: 1200,
    rating: 4.8,
    status: 1,
    tags: ['热销', '新品'],
    createdAt: '2024-01-01 10:00:00',
    updatedAt: '2024-01-15 14:30:00'
  },
  {
    id: '2',
    name: 'MacBook Pro 14英寸',
    description: '专业级笔记本电脑，M3 Pro芯片，适合专业用户',
    price: 15999.00,
    originalPrice: 17999.00,
    category: '电子产品',
    brand: '苹果',
    images: 'https://picsum.photos/300/300?random=2',
    stock: 20,
    sales: 800,
    rating: 4.9,
    status: 1,
    tags: ['推荐', '包邮'],
    createdAt: '2024-01-02 09:15:00',
    updatedAt: '2024-01-14 16:45:00'
  },
  {
    id: '3',
    name: 'Nike Air Max 270',
    description: '经典运动鞋，舒适透气，适合日常穿着和运动',
    price: 899.00,
    originalPrice: 1099.00,
    category: '服装',
    brand: '耐克',
    images: 'https://picsum.photos/300/300?random=3',
    stock: 100,
    sales: 2500,
    rating: 4.6,
    status: 1,
    tags: ['热销', '限时优惠'],
    createdAt: '2024-01-03 11:20:00',
    updatedAt: '2024-01-13 13:10:00'
  }
]

// 合并预定义数据和生成数据
export const allProducts = [...mockProducts, ...generateProducts(97)]
