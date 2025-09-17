import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    chartHeader: Array,
    data: Array,
    region: String,
    resolution: String
  }

  connect() {
    this.loadGoogleCharts()
  }

  loadGoogleCharts() {
    // Check if Google Charts is already loaded
    if (window.google && window.google.charts) {
      this.initializeChart()
      return
    }
  }

  initializeChart() {
    google.charts.load('current', {
      'packages': ['geochart']
    })

    google.charts.setOnLoadCallback(() => {
      this.drawChart()
    })
  }

  drawChart() {
    if (!this.dataValue || this.dataValue.length === 0) {
      console.warn('No data provided for geo chart')
      return
    }

    const chartData = [this.chartHeaderValue] || [['', '']]

    this.dataValue.forEach(item => {
      chartData.push([item[0], item[1]])
    })

    const data = google.visualization.arrayToDataTable(chartData)

    const options = {
      region: this.regionValue || 'US',
      resolution: this.resolutionValue || 'provinces',
      colorAxis: {
        colors: ["#c1d9ff", "#3b82f6"]
      }
    }

    const chart = new google.visualization.GeoChart(this.element)
    chart.draw(data, options)
  }
}
