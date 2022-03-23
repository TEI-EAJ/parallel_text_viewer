<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'BarChart',
  extends: Bar,
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    witness: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    data: {
      handler() {
        this.init()
      },
      deep: true,
    },
    witness: {
      handler() {
        this.init()
      },
      deep: true,
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const data2 = this.data
      const witness = this.witness
      const map = {}
      for (const wit in witness) {
        map[wit] = 0
      }

      for (const index in data2) {
        const obj = this.data[index].wits
        let r_flg = false
        let text_org = ''
        for (const key in obj) {
          const wits = key.split(' ')

          if (r_flg) {
            let text_target = obj[key].text
            if (text_target == null) {
              text_target = ''
            }

            const a = this.levenshtein(text_org, text_target)

            for (let i = 0; i < wits.length; i++) {
              const wit = wits[i]
              map[wit] += a
            }
          } else {
            text_org = obj[key].text
          }
          r_flg = true
        }
      }

      const labels = []
      const values = []
      for (const label in map) {
        labels.push(label)
        values.push(map[label])
      }

      const data = {
        labels,
        datasets: [
          {
            label: '編集距離',
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
                labelString: 'Witness',
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
    levenshtein(s1, s2) {
      // http://kevin.vanzonneveld.net
      // +            original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
      // +            bugfixed by: Onno Marsman
      // +             revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
      // + reimplemented by: Brett Zamir (http://brett-zamir.me)
      // + reimplemented by: Alexander M Beedie
      // *                example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
      // *                returns 1: 3

      if (s1 == s2) {
        return 0
      }

      const s1_len = s1.length
      const s2_len = s2.length
      if (s1_len === 0) {
        return s2_len
      }
      if (s2_len === 0) {
        return s1_len
      }

      // BEGIN STATIC
      let split = false
      try {
        split = !'0'[0]
      } catch (e) {
        split = true // Earlier IE may not support access by string index
      }
      // END STATIC
      if (split) {
        s1 = s1.split('')
        s2 = s2.split('')
      }

      let v0 = new Array(s1_len + 1)
      let v1 = new Array(s1_len + 1)

      let s1_idx = 0
      let s2_idx = 0
      let cost = 0
      for (s1_idx = 0; s1_idx < s1_len + 1; s1_idx++) {
        v0[s1_idx] = s1_idx
      }
      let char_s1 = ''
      let char_s2 = ''
      for (s2_idx = 1; s2_idx <= s2_len; s2_idx++) {
        v1[0] = s2_idx
        char_s2 = s2[s2_idx - 1]

        for (s1_idx = 0; s1_idx < s1_len; s1_idx++) {
          char_s1 = s1[s1_idx]
          cost = char_s1 == char_s2 ? 0 : 1
          let m_min = v0[s1_idx + 1] + 1
          const b = v1[s1_idx] + 1
          const c = v0[s1_idx] + cost
          if (b < m_min) {
            m_min = b
          }
          if (c < m_min) {
            m_min = c
          }
          v1[s1_idx + 1] = m_min
        }
        const v_tmp = v0
        v0 = v1
        v1 = v_tmp
      }
      return v0[s1_len]
    },
  },
}
</script>
