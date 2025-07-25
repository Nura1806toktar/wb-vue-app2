<template>
  <div>
    <h1>Incomes</h1>

    <!-- Filter -->
    <div class="mb-3 d-flex align-items-center gap-2">
      <label>Start Date:</label>
      <input type="date" v-model="dateFrom" class="form-control w-auto" />
      <label>End Date:</label>
      <input type="date" v-model="dateTo" class="form-control w-auto" />
      <button @click="loadIncomes(1)" class="btn btn-primary">Search</button>
    </div>

    <!-- Chart -->
    <IncomesChart v-if="incomes.length" :data="incomes" />

    <!-- Table -->
    <table class="table table-bordered table-striped mt-3" v-if="incomes.length">
      <thead class="table-dark">
        <tr>
          <th>Date</th>
          <th>Income ID</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in incomes" :key="item.g_number">
          <td>{{ item.date }}</td>
          <td>{{ item.g_number }}</td>
          <td>{{ item.nm_id }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.total_price }}</td>
        </tr>
      </tbody>
    </table>

    <!-- No Data / Loading -->
    <p v-if="loading">Loading...</p>
    <p v-if="!loading && incomes.length === 0">No data found.</p>

    <!-- Pagination -->
    <div v-if="!loading" class="mt-3">
      <button class="btn btn-secondary" :disabled="page === 1" @click="loadIncomes(page - 1)">Previous</button>
      <span class="mx-2">{{ page }} / page</span>
      <button class="btn btn-secondary" :disabled="incomes.length < limit" @click="loadIncomes(page + 1)">Next</button>
    </div>
  </div>
</template>

<script setup>
import IncomesChart from '../components/IncomesChart.vue'
import { ref, onMounted } from 'vue'
import { fetchIncomes } from '../api'

const dateFrom = ref('2025-07-01')
const dateTo = ref('2025-07-25')

const incomes = ref([])
const loading = ref(false)

const page = ref(1)
const limit = 20

const loadIncomes = async (newPage = 1) => {
  page.value = newPage
  loading.value = true
  try {
    const response = await fetchIncomes({
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
      page: newPage,
      limit: limit
    })
    incomes.value = response.data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadIncomes()
})
</script>
