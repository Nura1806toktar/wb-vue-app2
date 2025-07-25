import axios from 'axios'

const API_BASE = 'http://109.73.206.144:6969/api'
const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

export const fetchOrders = async (params = {}) => {
  const response = await axios.get(`${API_BASE}/orders`, {
    params: { ...params, key: API_KEY }
  })
  return response.data
}

export const fetchSales = async (params = {}) => {
  const response = await axios.get(`${API_BASE}/sales`, {
    params: { ...params, key: API_KEY }
  })
  return response.data
}

export const fetchIncomes = async (params = {}) => {
  const response = await axios.get(`${API_BASE}/incomes`, {
    params: { ...params, key: API_KEY }
  })
  return response.data
}

export const fetchStocks = async (params = {}) => {
  const response = await axios.get(`${API_BASE}/stocks`, {
    params: { ...params, key: API_KEY }
  })
  return response.data
}
