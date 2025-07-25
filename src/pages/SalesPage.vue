<template>
  <div>
    <h1>Sales</h1>

    <!-- Filter Section -->
    <div class="mb-3 d-flex align-items-center gap-2">
      <label>Start Date:</label>
      <input type="date" v-model="dateFrom" class="form-control w-auto" />
      <label>End Date:</label>
      <input type="date" v-model="dateTo" class="form-control w-auto" />
      <button @click="loadSales(1)" class="btn btn-primary">Search</button>
    </div>

    <!-- Chart -->
    <SalesChart v-if="sales.length" :data="sales" />

    <!-- Table -->
    <table class="table table-bordered table-striped mt-3" v-if="sales.length">
      <thead class="table-dark">
        <tr>
          <th>Date</th>
          <th>Sale ID</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sales" :key="item.sale_id || item.g_number">
          <td>{{ item.date }}</td>
          <td>{{ item.g_number }}</td>
          <td>{{ item.nm_id }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.total_price }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Empty / Loading -->
    <p v-if="loading">Loading...</p>
    <p v-if="!loading && sales.length === 0">No data found.</p>

    <!-- Pagination -->
    <div v-if="!loading" class="mt-3">
      <button class="btn btn-secondary" :disabled="page === 1" @click="loadSales(page - 1)">Previous</button>
      <span class="mx-2">{{ page }} / page</span>
      <button class="btn btn-secondary" :disabled="sales.length < limit" @click="loadSales(page + 1)">Next</button>
    </div>
  </div>
</template>

<script setup>
import SalesChart from '../components/SalesChart.vue'
import { ref, onMounted } from 'vue'
import { fetchSales } from '../api'

const dateFrom = ref('2025-07-01')
const dateTo = ref('2025-07-24')

const sales = ref([])
const loading = ref(false)

const page = ref(1)
const limit = 20

const loadSales = async (newPage = 1) => {
  page.value = newPage
  loading.value = true
  try {
    const response = await fetchSales({
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
      page: newPage,
      limit: limit
    })
    sales.value = response.data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadSales()
})
</script>
