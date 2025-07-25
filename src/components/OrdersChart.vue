<template>
  <div>
    <h2>Graph by number of orders (quantity) </h2>
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

// Chart.js-ті тіркеу
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Проп арқылы дерек аламыз
const props = defineProps({
  data: Array
})

import { computed } from 'vue'

const chartData = computed(() => ({
  labels: props.data.map(i => i.date),
  datasets: [
    {
      label: 'Quantity',
      data: props.data.map(i => i.quantity),
      backgroundColor: '#42A5F5'
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
  }
}
</script>
