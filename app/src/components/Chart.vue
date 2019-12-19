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
        let text_org = ""
        for (let key in obj) {
          let wits = key.split(" ");

          if (r_flg) {

            let text_target = obj[key].text
            if(text_target == null){
              text_target = ""
            }

            let a = this.levenshtein(text_org, text_target)

            for (let i = 0; i < wits.length; i++) {
              let wit = wits[i];
              map[wit] += a;
            }
          } else {
            text_org = obj[key].text
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
            label: "編集距離",
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
    },
    levenshtein (s1, s2) {
    // http://kevin.vanzonneveld.net
    // +            original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +            bugfixed by: Onno Marsman
    // +             revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + reimplemented by: Alexander M Beedie
    // *                example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
    // *                returns 1: 3

    if (s1 == s2) {
        return 0;
    }

    var s1_len = s1.length;
    var s2_len = s2.length;
    if (s1_len === 0) {
        return s2_len;
    }
    if (s2_len === 0) {
        return s1_len;
    }

    // BEGIN STATIC
    var split = false;
    try{
        split=!('0')[0];
    } catch (e){
        split=true; // Earlier IE may not support access by string index
    }
    // END STATIC
    if (split){
        s1 = s1.split('');
        s2 = s2.split('');
    }

    var v0 = new Array(s1_len+1);
    var v1 = new Array(s1_len+1);

    var s1_idx=0, s2_idx=0, cost=0;
    for (s1_idx=0; s1_idx<s1_len+1; s1_idx++) {
        v0[s1_idx] = s1_idx;
    }
    var char_s1='', char_s2='';
    for (s2_idx=1; s2_idx<=s2_len; s2_idx++) {
        v1[0] = s2_idx;
        char_s2 = s2[s2_idx - 1];

        for (s1_idx=0; s1_idx<s1_len;s1_idx++) {
            char_s1 = s1[s1_idx];
            cost = (char_s1 == char_s2) ? 0 : 1;
            var m_min = v0[s1_idx+1] + 1;
            var b = v1[s1_idx] + 1;
            var c = v0[s1_idx] + cost;
            if (b < m_min) {
                m_min = b; }
            if (c < m_min) {
                m_min = c; }
            v1[s1_idx+1] = m_min;
        }
        var v_tmp = v0;
        v0 = v1;
        v1 = v_tmp;
    }
    return v0[s1_len];
}
  },
  mounted() {
    this.init();
  }
};
</script>