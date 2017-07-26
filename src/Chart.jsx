import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';

class Chart extends Component {
  componentWillMount() {
    ReactHighcharts.Highcharts.setOptions({
      global: {
        useUTC: false,
        timezone: 'America/Chicago',
      },
    });
  }

  render() {
    const config = {
      chart: {
        type: 'bar',
      },
      title: {
        text: `As of ${moment().format('dddd, MMMM Do YYYY')}`,
      },
      xAxis: {
        categories: ['Alerts Management', 'Pipeline Report', 'Leads Management'],
      },
      yAxis: {
        type: 'datetime',
        title: {
          text: 'Time Span',
        },
        // labels: {
        //   formatter: function () {
        //     const time = this.value;
        //     console.log(time);
        //     return moment(time).format('MMM D');
        //   },
        // },
      },
      tooltip: {
        pointFormatter() {
          const time = this.y;
          const name = this.series.name;
          const timeLeft = moment(time).diff(moment(), 'days');
          return `${name}: ${moment(time).format('MMM D')} (${timeLeft} days left)`;
        },
      },
      // legend: {
      //   reversed: true,
      // },
      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },
      // data: {
      //   dateFormat: 'YYYY-mm-dd',
      // },
      series: [{
        name: 'Release',
        data: [parseInt(moment().add(1, 'month').format('x'))],
      }, {
        name: 'QAT',
        data: [parseInt(moment().add(4, 'd').format('x'))],
      }, {
        name: 'Testing',
        data: [parseInt(moment().add(2, 'd').format('x'))],
      }, {
        name: 'Development',
        data: [parseInt(moment().format('x')), parseInt(moment().format('x')), parseInt(moment().format('x'))],
      }],
    };

    return <ReactHighcharts config={config} />;
  }
}

export default Chart;
