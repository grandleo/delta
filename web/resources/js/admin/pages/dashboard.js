"use strict";
import Chart from 'chart.js';

var ctx = document.getElementById('orderChart');
if (ctx) {
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Созданных заказов',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(46,212,122,0.17)',
          'rgba(46,212,122,0.23)',
          'rgba(46,212,122,0.37)',
          'rgba(46,212,122,0.29)',
          'rgba(46,212,122,0.29)',
          'rgba(46,212,122,0.26)'
        ],
        borderColor: [
          '#2ED47A',
        ],
        borderWidth: 2
      }]
    },
    options: {
        legend: {
            labels: {
                usePointStyle: true ,
                boxWidth:3,
                align:'left',
                position:'center',
            }
        },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}

console.log();
