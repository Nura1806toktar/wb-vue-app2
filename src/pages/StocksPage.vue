<template>
  <div>
    <h1>Stocks</h1>

    <!-- Filter -->
    <div class="mb-3 d-flex align-items-center gap-2">
      <label>Date:</label>
      <input type="date" v-model="dateFrom" class="form-control w-auto" />
      <button @click="loadStocks(1)" class="btn btn-primary">Search</button>
    </div>

    <!-- Chart -->
    <StocksChart v-if="stocks.length" :data="stocks" />

    <!-- Table -->
    <table class="table table-bordered table-striped mt-3" v-if="stocks.length">
      <thead class="table-dark">
        <tr>
          <th>Date</th>
          <th>Product</th>
          <th>Stock (Full Quantity)</th>
          <th>Warehouse</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in stocks" :key="item.g_number || item.nm_id">
          <td>{{ item.date }}</td>
          <td>{{ item.nm_id }}</td>
          <td>{{ item.quantity_full }}</td>
          <td>{{ item.warehouse_name }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Empty / Loading -->
    <p v-if="loading">Loading...</p>
    <p v-if="!loading && stocks.length === 0">No data found.</p>

    <!-- Pagination -->
    <div v-if="!loading" class="mt-3">
      <button class="btn btn-secondary" :disabled="page === 1" @click="loadStocks(page - 1)">Previous</button>
      <span class="mx-2">{{ page }} / page</span>
      <button class="btn btn-secondary" :disabled="stocks.length < limit" @click="loadStocks(page + 1)">Next</button>
    </div>
  </div>
</template>

<script setup>
import StocksChart from '../components/StocksChart.vue'
import { ref, onMounted } from 'vue'
import { fetchStocks } from '../api'

const dateFrom = ref('2025-07-25') // Default: today

const stocks = ref([])
const loading = ref(false)

const page = ref(1)
const limit = 20

const loadStocks = async (newPage = 1) => {
  page.value = newPage
  loading.value = true
  try {
    const response = await fetchStocks({
      dateFrom: dateFrom.value,
      page: newPage,
      limit: limit
    })
    stocks.value = response.data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStocks()
})
</script>
