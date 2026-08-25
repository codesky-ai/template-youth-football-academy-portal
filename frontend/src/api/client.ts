import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001/api'

// إعداد العميل الأساسي لـ API
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': 'ar'
  }
})

// إعداد اعتراض الطلبات
apiClient.interceptors.request.use(
  (config) => {
    // إضافة توكن التوثيق إذا كان متوفراً
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// إعداد اعتراض الاستجابات
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // معالجة الأخطاء العامة
    if (error.response?.status === 401) {
      // إزالة التوكن والتوجه لصفحة تسجيل الدخول
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }

    console.error('خطأ في API:', error)
    return Promise.reject(error)
  }
)

export default apiClient