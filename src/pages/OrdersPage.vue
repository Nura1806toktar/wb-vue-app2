<template>
  <div class="container my-4">
    <h2 class="mb-4 text-center">📦 Orders Page</h2>

    <!-- FILTERS -->
    <div class="card p-3 mb-4">
      <div class="row g-3 align-items-center">
        <div class="col-md-4">
          <label class="form-label">Start Date:</label>
          <input type="date" class="form-control" v-model="dateFrom" />
        </div>
        <div class="col-md-4">
          <label class="form-label">End Date:</label>
          <input type="date" class="form-control" v-model="dateTo" />
        </div>
        <div class="col-md-4 d-flex align-items-end">
          <button @click="loadOrders(1)" class="btn btn-primary w-100">Search</button>
        </div>
      </div>
    </div>

    <!-- CHART -->
    <OrdersChart v-if="orders.length" :data="orders" class="mb-4" />

    <!-- TABLE -->
    <div v-if="orders.length" class="table-responsive mb-3">
      <table class="table table-bordered table-striped">
        <thead class="table-dark">
          <tr>
            <th>Date</th>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.g_number">
            <td>{{ item.date }}</td>
            <td>{{ item.g_number }}</td>
            <td>{{ item.nm_id }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.total_price }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- STATUS MESSAGES -->
    <div v-if="loading" class="text-center text-muted">Loading...</div>
    <div v-else-if="orders.length === 0" class="alert alert-warning text-center">No data found.</div>

    <!-- PAGINATION -->
    <div v-if="!loading" class="d-flex justify-content-center gap-2 mt-3">
      <button :disabled="page === 1" @click="loadOrders(page - 1)" class="btn btn-outline-secondary">← Previous</button>
      <span class="align-self-center">{{ page }} page</span>
      <button :disabled="orders.length < limit" @click="loadOrders(page + 1)" class="btn btn-outline-secondary">Next →</button>
    </div>
  </div>
</template>

<script setup>
import OrdersChart from '../components/OrdersChart.vue'
import { ref, onMounted } from 'vue'
import { fetchOrders } from '../api'

const dateFrom = ref('2025-07-01')
const dateTo = ref('2025-07-24')

const orders = ref([])
const loading = ref(false)

const page = ref(1)
const limit = 20

const loadOrders = async (newPage = 1) => {
  page.value = newPage
  loading.value = true
  try {
    const response = await fetchOrders({
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
      page: newPage,
      limit: limit
    })
    orders.value = response.data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadOrders()
})
</script>
