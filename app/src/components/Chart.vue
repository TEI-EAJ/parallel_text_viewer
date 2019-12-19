<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "chart",
  props: ["data", "witness"],
  watch: {
    data: function() {
      this.init();
    },
    witness: function() {
      this.init();
    }
  },
  methods: {
    init() {
      let map = {};
      for (let wit in this.witness) {
        map[wit] = 0;
      }

      for (let index in this.data) {
        let obj = this.data[index].wits;
        let r_flg = false;
        for (let key in obj) {
          let wits = key.split(" ");

          if (r_flg) {
            for (let i = 0; i < wits.length; i++) {
              let wit = wits[i];
              map[wit] += 1;
            }
          }
          r_flg = true;
        }
      }

      let labels = [];
      let values = [];
      for (let label in map) {
        labels.push(label);
        values.push(map[label]);
      }

      let data = {
        labels: labels,
        datasets: [
          {
            label: "異文箇所",
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
                labelString: "Witness"
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