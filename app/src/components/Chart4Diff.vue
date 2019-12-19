<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "chart",
  props: ["data"],
  watch: {
    data: function() {
      this.init();
    }
  },
  methods: {
    init() {
      let labels = [];
      let values = [];

      for (let index in this.data) {
        let obj = this.data[index];
        let wits = obj.wits;
        let value = Object.keys(wits).length;

        labels.push(obj.index);
        values.push(value);
      }

      let data = {
        labels: labels,
        datasets: [
          {
            label: "異なり数",
            data: values,
            borderWidth: 1
          }
        ]
      };

      let options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "異文番号"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };

      this.renderChart(data, options);
    }
  },
  mounted() {
    this.init();
  }
};
</script>