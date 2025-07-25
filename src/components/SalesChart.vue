<template>
  <div class="mb-4">
    <h4 class="text-center mb-3">📈 Quantity of Sold Products (by Sale ID)</h4>
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
  labels: props.data.map(i => i.g_number?.toString() || 'N/A'),
  datasets: [
    {
      label: 'Quantity',
      data: props.data.map(i => Number(i.quantity) || 0),
      backgroundColor: '#4FC3F7'
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
        text: 'Sale ID'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Quantity'
      },
      beginAtZero: true
    }
  }
}
</script>
