import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Menu, Button, List, ListItem } from '@material-ui/core';

import CountUp from 'react-countup';
import Chart from 'react-apexcharts';

export default function LivePreviewExample(props) {

    const chartPie = {

        series: Object.values(props.reports.data).map(function(key) {return key[key.length-1].messageCount;}),
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            labels: Object.values(props.reports.data).map(function(key) {return key[key.length-1].companyName.slice(0, 10) + " - " + key[key.length-1].messageCount;})
        },


    };


  return (
    <>
      <Card className="p-4 p-lg-5 mb-5">
        <div className="d-block d-lg-flex text-center text-lg-left align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
            <div className="display-4 line-height-1 font-weight-bold mr-3">
                Messages This Month
            </div>
          </div>
        </div>

          <div className="App">
              <Chart options={chartPie.options} series={chartPie.series} type="donut" />

          </div>
      </Card>
    </>
  );
}
