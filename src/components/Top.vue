<template>
  <div class="top">
    <select v-model="selectedPair">
      <option disabled value>Please select one</option>
      <option v-for="currency in currencies" v-bind:key="currency.id">{{currency.name}}</option>
    </select>
    <button v-on:click="addDefaultChartSetEmit">add default charts</button>
    <button v-on:click="removeAllEmit">remove all charts</button>
    <br/>
    <select v-model="selectedTimeframe">
      <option disabled value>Please select one</option>
      <option v-for="tf in timeframes" v-bind:key="tf.id">{{tf.name}}</option>
    </select>
    <button v-on:click="addChartEmit">add single chart</button>
  </div>
</template>

<script>
const axios = require("axios");

// const oandaAccountNubmber = "101-001-584348-001";
// const oadnaToken =
//   "c7bd82e41ed938084545e60f2c3de3ce-2381d7802d83065e76654bba0d2ef598";

const oandaAccountNubmber = process.env.VUE_APP_OANDA_ACCOUNT_NUMBER;
const oadnaToken = process.env.VUE_APP_OANDA_TOKEN;
const oandaBaseUrlPractice = "https://api-fxpractice.oanda.com/";
const oandaBaseUrl = oandaBaseUrlPractice;

export default {
  data: function() {
    return {
      currencies: [],
      timeframes: [
        { id: 0, name: "S5" },
        { id: 1, name: "S10" },
        { id: 2, name: "S15" },
        { id: 3, name: "S30" },
        { id: 4, name: "M1" },
        { id: 5, name: "M4" },
        { id: 6, name: "M5" },
        { id: 7, name: "M10" },
        { id: 8, name: "M15" },
        { id: 9, name: "M30" },
        { id: 10, name: "H1" },
        { id: 11, name: "H2" },
        { id: 12, name: "H3" },
        { id: 13, name: "H4" },
        { id: 14, name: "H6" },
        { id: 15, name: "H8" },
        { id: 16, name: "H12" },
        { id: 17, name: "D" },
        { id: 18, name: "W" },
        { id: 19, name: "M" }
      ],
      selectedPair: "",
      selectedTimeframe: ""
    };
  },
  methods: {
    addChartEmit: function() {
      this.$emit("addChart", this.selectedPair, this.selectedTimeframe);
    },
    addDefaultChartSetEmit: function() {
        this.$emit("addDefaultChartSet", this.selectedPair);
    },
    removeAllEmit: function(){
        this.$emit("removeAllCharts");
    }
  },
  mounted: function() {
    axios
      .get(
        oandaBaseUrlPractice +
          "v3/accounts/" +
          oandaAccountNubmber +
          "/instruments",
        {
          headers: {
            Authorization: "Bearer " + oadnaToken,
            Accept: "application/json"
          }
        }
      )
      .then(response => {
        console.log("!!! INSTRUMENTS: " + JSON.stringify(response));
        var i = 0;
        const newCurrencies = response.data.instruments.map(function(item) {
          return { id: i++, name: item.name };
        });

        this.currencies = newCurrencies.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>