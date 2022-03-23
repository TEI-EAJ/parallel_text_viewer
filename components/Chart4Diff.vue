<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'Chart4Diff',
  extends: Bar,
  props: ['data'],
  watch: {
    data() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const labels = []
      const values = []

      for (const index in this.data) {
        const obj = this.data[index]
        const wits = obj.wits
        const value = Object.keys(wits).length

        labels.push(obj.index)
        values.push(value)
      }

      const data = {
        labels,
        datasets: [
          {
            label: '異なり数',
            data: values,
            borderWidth: 1,
          },
        ],
      }

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: '異文番号',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }

      this.renderChart(data, options)
    },
  },
}
</script>
