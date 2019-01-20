<template>
  <div class="forex-chart">
    <p>
      {{ pair }} / {{ timeline }}
      <button v-on:click="remove">X</button>
    </p>
    <highcharts class="stock" :constructor-type="'stockChart'" :options="stockOptions"></highcharts>
  </div>
</template>

<script>
const axios = require("axios");

const oandaAccountNubmber = process.env.VUE_APP_OANDA_ACCOUNT_NUMBER;
const oadnaToken = process.env.VUE_APP_OANDA_TOKEN;
const oandaBaseUrlPractice = "https://api-fxpractice.oanda.com/";
const oandaBaseUrl = oandaBaseUrlPractice;

export default {
  props: ["cid", "pair", "timeline"],
  methods: {
    remove: function(event) {
      this.$emit("remove", this.cid);
    }
  },
  mounted: function() {
    axios
      .get(
        oandaBaseUrlPractice +
          "v3/instruments/" +
          this.pair +
          "/candles" +
          "?count=500&price=A&granularity=" +
          this.timeline,
        {
          headers: {
            Authorization: "Bearer " + oadnaToken,
            Accept: "application/json"
          }
        }
      )
      .then(response => {
        console.log(response);

        const RFC_3339 = "YYYY-MM-DDTHH:mm:sssssssssZ";

        const cdata = response.data.candles.map(function(element) {
          const candle = [];
          candle.push(Date.parse(element.time));
          candle.push(Number(element.ask.o));
          candle.push(Number(element.ask.h));
          candle.push(Number(element.ask.l));
          candle.push(Number(element.ask.c));
          return candle;
        });
        console.log(cdata);
        console.log({ data: cdata });
        this.stockOptions.series[0].data = cdata;
      })
      .catch(error => {
        console.log(error);
      });
  },
  data: function() {
    return {
      stockOptions: {
        rangeSelector: {
          selected: 1
        },

        yAxis: [
          {
            labels: {
              align: "right",
              x: -3
            },
            title: {
              text: "OHLC"
            },
            height: "48%",
            lineWidth: 2,
            resize: {
              enabled: true
            }
          },
          {
            labels: {
              align: "right"
            },
            title: {
              text: "rsi"
            },
            min: 10, 
            max: 90,
            height: "48%",
            lineWidth: 2,
            top: "200",
            plotLines: [
              {
                color: "blue", // Color value
                dashStyle: "solid", // Style of the plot line. Default to solid
                value: 70, // Value of where the line will appear
                width: 2 // Width of the line
              },
               {
                color: "blue", // Color value
                dashStyle: "solid", // Style of the plot line. Default to solid
                value: 30, // Value of where the line will appear
                width: 2 // Width of the line
              }
            ]
          }
        ],
        tooltip: {
          split: true
        },
        series: [
          {
            id: this.pair,
            type: "candlestick",
            name: this.pair,
            data: []
          },
          {
            type: "rsi",
            yAxis: 1,
            linkedTo: this.pair,
            styles: {
              strokeWidth: 2,
              stroke: "green",
              dashstyle: "solid"
            },
            marker: {
              enabled: false
            }
          },
          { type: "bb", linkedTo: this.pair }
        ]
      }
    };
  }
};
</script>

<style scoped>
.stock {
  width: 100%;
  margin: 0 auto;
}
</style>