<template>
  <div class="mb-4">
    <h4 class="text-center mb-3">📦 Stock Levels by Product</h4>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  data: Array
})

const chartData = computed(() => ({
  labels: props.data.map(i => i.nm_id?.toString() || 'N/A'),
  datasets: [
    {
      label: 'Stock (Quantity)',
      data: props.data.map(i => Number(i.quantity_full) || 0),
      backgroundColor: '#9575CD'
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Product ID'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Quantity in Stock'
      },
      beginAtZero: true
    }
  }
}
</script>
