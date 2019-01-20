<template>
  <div id="app">
    <top @addChart="addChart" @addDefaultChartSet="addDefaultChartSet" @removeAllCharts="removeAllCharts"></top>
    <div class="box">
      <div v-for="ch in charts" v-bind:key="ch.id">
        <chart id="chart" :pair="ch.pair" :timeline="ch.timeline" :cid="ch.id" @remove="remove"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./components/Chart.vue";
import Top from "./components/Top.vue";

export default {
  name: "app",
  components: { chart: Chart, top: Top},
  methods: {
    remove(cid) {
      for (var i = this.charts.length - 1; i >= 0; i--) {
        if (this.charts[i].id === cid) this.charts.splice(i, 1);
      }
    },
    addChart(newPair, newTimeframe){
      this.charts.push({ id: this.currentIndex++, pair: newPair, timeline: newTimeframe});
    }, 
    addDefaultChartSet(newPair){
      this.charts.push({ id: this.currentIndex++, pair: newPair, timeline: "M5"});
      this.charts.push({ id: this.currentIndex++, pair: newPair, timeline: "M30"});
      this.charts.push({ id: this.currentIndex++, pair: newPair, timeline: "H1"});
      this.charts.push({ id: this.currentIndex++, pair: newPair, timeline: "H4"});
      this.charts.push({ id: this.currentIndex++, pair: newPair, timeline: "D"});
      this.charts.push({ id: this.currentIndex++, pair: newPair, timeline: "W"});
    },
    removeAllCharts(){
      this.charts = [];
      this.currentIndex = 0;
    }
  },
  data: function() {
    return {
      currentIndex: 6,
      charts: [
        { id: 0, pair: "EUR_USD", timeline: "D" },
        { id: 1, pair: "USD_JPY", timeline: "H1" },
        { id: 2, pair: "GBP_USD", timeline: "M" },
        { id: 3, pair: "GBP_JPY", timeline: "H1" },
        { id: 4, pair: "USD_CAD", timeline: "M5" },
        { id: 5, pair: "AUD_JPY", timeline: "H1" }
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#chart {
  width: 100%;
  margin: 1rem;
}

.box {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 4fr));
}
</style>
