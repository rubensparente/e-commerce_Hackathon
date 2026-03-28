import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== PRODUTOS ====================
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

export const getDiscountedProducts = async () => {
  try {
    const response = await api.get('/products/discounted');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos com desconto:', error);
    return [];
  }
};

export const searchProducts = async (query: string) => {
  try {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Erro na busca:', error);
    return [];
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
};

export const getProductsByCategory = async (categoryId: number) => {
  try {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    return [];
  }
};

// ==================== CATEGORIAS ====================
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};

export const getCategoryById = async (id: number) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    return null;
  }
};

// ==================== AUTENTICAÇÃO ====================
export const login = async (email: string, password: string, role: string = 'client') => {
  try {
    const response = await api.post('/auth/login', { email, password, role });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { error: 'Erro no login' };
  }
};

export const register = async (userData: any) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { error: 'Erro no cadastro' };
  }
};

// ==================== ADMIN ====================
export const getAdminDashboard = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dashboard:', error);
    return null;
  }
};

export const createProduct = async (productData: any) => {
  try {
    const response = await api.post('/admin/products', productData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, productData: any) => {
  try {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
};

export const createCategory = async (categoryData: any) => {
  try {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};

export const updateCategory = async (id: number, categoryData: any) => {
  try {
    const response = await api.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    throw error;
  }
};

export const createOffer = async (offerData: any) => {
  try {
    const response = await api.post('/admin/offers', offerData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar oferta:', error);
    throw error;
  }
};

export const updateOffer = async (id: number, offerData: any) => {
  try {
    const response = await api.put(`/admin/offers/${id}`, offerData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar oferta:', error);
    throw error;
  }
};

export const deleteOffer = async (id: number) => {
  try {
    const response = await api.delete(`/admin/offers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar oferta:', error);
    throw error;
  }
};

export default api;