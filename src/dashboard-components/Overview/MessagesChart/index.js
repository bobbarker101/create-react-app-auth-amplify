import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Menu, Button, List, ListItem } from '@material-ui/core';

import CountUp from 'react-countup';
import Chart from 'react-apexcharts';

export default function LivePreviewExample(props) {
  console.log(props)
    const labels =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const chart6Options = {
        chart: {
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            strokeDashArray: '5',
            borderColor: 'rgba(125, 138, 156, 0.3)'
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        fill: {
            color: '#4191ff',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0,
                stops: [0, 100]
            }
        },
        yaxis:{
            labels: {
                formatter: function (value) {

                    return "$"+value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//labels[value.substring(4, 6)-1];
                }
            }
        },
        xaxis: {
            type:"string",
            labels: {
                formatter: function (value) {
                    let valr = value-1;

                    return labels[parseInt(valr.toString().substring(4, 6))-1];//labels[value.substring(4, 6)-1];
                }
            }
        },
        colors: ['#4191ff'],
        legend: {
            show: false
        },
        labels: Object.keys(props.reports.totalPerMonth)
    };
    //chart6Options.yaxis.labels.formatter = val => val.toFixed(2)
    const chart6Data = [
        {
            name: 'Revenue',
            data: Object.values(props.reports.totalPerMonth)
        }
    ];
    const chart7Options = {
        chart: {
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            strokeDashArray: '5',
            borderColor: 'rgba(125, 138, 156, 0.3)'
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        fill: {
            color: '#4191ff',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0,
                stops: [0, 100]
            }
        },
        yaxis:{
            labels: {
                  formatter: function (value) {

                      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//labels[value.substring(4, 6)-1];
                  }
              }
            },
        xaxis: {
            type:"string",
            labels: {
                formatter: function (value) {
                    let valr = value-1;

                    return labels[parseInt(valr.toString().substring(4, 6))-1];//labels[value.substring(4, 6)-1];
                }
            }
        },
        colors: ['#4191ff'],
        legend: {
            show: false
        },
        labels: Object.keys(props.reports.messagesPerMonth)
    };
    //chart6Options.yaxis.labels.formatter = val => val.toFixed(2)
    const chart7Data = [
        {
            name: 'Messages',
            data: Object.values(props.reports.messagesPerMonth)
        }
    ];






  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


    let val1 = parseFloat(props.reports.totalPerMonth[Object.keys(props.reports.totalPerMonth)[Object.keys(props.reports.totalPerMonth).length-1]]).toFixed(2);
    let val2 = parseFloat(props.reports.totalPerMonth[Object.keys(props.reports.totalPerMonth)[Object.keys(props.reports.totalPerMonth).length-2]]).toFixed(2);
    let val3 = parseFloat(props.reports.totalPerMonth[Object.keys(props.reports.totalPerMonth)[Object.keys(props.reports.totalPerMonth).length-3]]).toFixed(2);
    let messagesVal1 = props.reports.messagesPerMonth[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-1]];
    let messagesVal2 = props.reports.messagesPerMonth[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-2]];
    let messagesVal3 = props.reports.messagesPerMonth[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-3]];
    let month1 = labels[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-1].substring(4, 6)-1];
    let month2 = labels[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-2].substring(4, 6)-1];
    let month3 = labels[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-3].substring(4, 6)-1];

  return (
    <>
      <Card className="p-4 p-lg-5 mb-5">
        <div className="d-block d-lg-flex text-center text-lg-left align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
            <div className="display-4 line-height-1 font-weight-bold mr-3">
                Revenue and Messages
            </div>
          </div>
        </div>
        <div className="rounded p-4 bg-secondary text-center border-light mb-5 border-1">
          <Grid container spacing={6}>
            <Grid item md={4}>
              <div className="text-dark pb-1">{month3}</div>
              <div className="font-size-lg d-flex align-items-center justify-content-center text-second">
                <span className="mr-2 badge badge-circle badge-dark">
                  Badge dark
                </span>
                <small className="opacity-6 pr-1">$</small>
                <span>
                  <CountUp
                    start={0}
                    end={val3}
                    duration={4}
                    separator=","
                    decimals={2}
                    decimal="."
                    prefix=""
                    suffix=""
                  />
                </span>
              </div>
            </Grid>
            <Grid item md={4}>
              <div className="text-dark pb-1">{month2}</div>
              <div className="font-size-lg d-flex align-items-center justify-content-center text-second">
                <div className="badge badge-first mr-2 badge-circle">
                  Badge first
                </div>
                <small className="opacity-6 pr-1">$</small>
                <span>
                  <CountUp
                    start={0}
                    end={val2}
                    duration={6}
                    deplay={2}
                    separator=","
                    decimals={2}
                    decimal="."
                  />
                </span>
              </div>
            </Grid>
            <Grid item md={4}>
              <div className="text-dark pb-1">{month1}</div>
              <div className="font-size-lg d-flex align-items-center justify-content-center text-second">
                <span className="mr-2 badge badge-circle badge-warning">
                  Badge warning
                </span>
                <small className="opacity-6 pr-1">$</small>
                <span>
                  <CountUp
                    start={0}
                    end={val1}
                    duration={6}
                    deplay={2}
                    separator=","
                    decimals={2}
                    decimal="."
                  />
                </span>
              </div>
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={6}>
          <Grid item xl={4}>
            <Card className="card-box mb-4 p-3">
              <div className="display-3 text-black font-weight-bold">{messagesVal3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              <div className="divider mt-2 mb-3 border-2 w-25 bg-first rounded border-first" />
              <div className="font-weight-bold opacity-7 text-uppercase">
                  {labels[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-3].substring(4, 6)-1]}
              </div>
            </Card>
          </Grid>
            <Grid item xl={4}>
                <Card className="card-box mb-4 p-3">
                    <div className="display-3 text-black font-weight-bold">{messagesVal2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    <div className="divider mt-2 mb-3 border-2 w-25 bg-first rounded border-first" />
                    <div className="font-weight-bold opacity-7 text-uppercase">
                        {labels[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-2].substring(4, 6)-1]}
                    </div>
                </Card>
            </Grid>
            <Grid item xl={4}>
                <Card className="card-box mb-4 p-3">
                    <div className="display-3 text-black font-weight-bold">{messagesVal1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    <div className="divider mt-2 mb-3 border-2 w-25 bg-first rounded border-first" />
                    <div className="font-weight-bold opacity-7 text-uppercase">
                        {labels[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-1].substring(4, 6)-1]}
                    </div>
                </Card>
            </Grid>
        </Grid>
          <div className="d-block d-lg-flex text-center text-lg-left align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                  <div className="display-4 line-height-1 font-weight-bold mr-3">
                      Revenue
                  </div>
              </div>
          </div>
          <Chart
              options={chart6Options}
              series={chart6Data}
              type="area"
              height={211}
          />
          <div className="d-block d-lg-flex text-center text-lg-left align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                  <div className="display-4 line-height-1 font-weight-bold mr-3">
                      Messages
                  </div>
              </div>
          </div>
          <Chart
              options={chart7Options}
              series={chart7Data}
              type="area"
              height={211}
          />

      </Card>
    </>
  );
}
