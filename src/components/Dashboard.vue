<template>
  <div class="container mt-5">
    <h2>Dashboard</h2>
    <div class="row">
      <div class="col-md-6">
        <h3>Ships Scrapped per Month</h3>
        <LineChart :chartData="scrappedData" />
      </div>
      <div class="col-md-6">
        <h3>Materials Recovered</h3>
        <BarChart :chartData="materialsData" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import LineChart from './charts/LineChart.vue';
import BarChart from './charts/BarChart.vue';

export default {
  components: {
    LineChart,
    BarChart,
  },
  setup() {
    const scrappedData = ref({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Ships Scrapped',
          backgroundColor: '#ffd700',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    });

    const materialsData = ref({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Materials Recovered',
          backgroundColor: '#343a40',
          data: [280, 480, 400, 190, 860, 270, 900],
        },
      ],
    });

    return {
      scrappedData,
      materialsData,
    };
  },
};
</script>
