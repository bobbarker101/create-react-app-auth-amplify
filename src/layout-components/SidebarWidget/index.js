import React from 'react';

import { Button } from '@material-ui/core';

import TrendingDownTwoToneIcon from '@material-ui/icons/TrendingDownTwoTone';
import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';

import Chart from 'react-apexcharts';
const SidebarWidget = (props) => {
  const chart33Options = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      color: '#3c44b1',
      curve: 'smooth',
      width: 2
    },
    fill: {
      color: '#3c44b1',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      crosshairs: {
        width: 0
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chart33Data = [
    {
      name: 'Transactions',
      data: [47, 45, 54, 38, 56, 24, 65]
    }
  ];
    let val1 = props.reports.messagesPerMonth[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-1]];
    let val2 = props.reports.messagesPerMonth[Object.keys(props.reports.messagesPerMonth)[Object.keys(props.reports.messagesPerMonth).length-2]];

  return (
    <>
      <div className="app-sidebar--widget">
        <div className="sidebar-header align-items-center font-weight-bold d-flex justify-content-between text-primary">
          <span>Messages</span>
          <div>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="text-capitalize font-weight-normal text-first"
              title="View details">
              See all
            </a>
          </div>
        </div>
        <div className="app-sidebar-spacer">
          <div className="d-flex justify-content-between mt-2 mb-1">
            <div className="d-flex">
                {(((val1 - val2) / val2) * 100).toFixed(2) > 0 ?
                    <div className="font-size-lg text-success ">
                        <TrendingUpTwoToneIcon />
                    </div>
                    :
                    <div className="font-size-lg text-danger">
                        <TrendingDownTwoToneIcon />
                    </div>
                }
              <div className="text-left ml-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="font-weight-bold">{val1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</div>
                    {(((val1 - val2) / val2) * 100) > 0 ?
                        <div className="badge badge-neutral-success text-success ml-2">
                            {(((val1 - val2) / val2) * 100).toFixed(2)}%
                        </div>
                        :

                        <div className="badge badge-neutral-danger ml-2 text-danger">
                            {(((val1 - val2) / val2) * 100).toFixed(2)}%
                        </div>
                    }
                </div>
                <div className="text-black opacity-4 font-size-sm">This Month</div>
              </div>
            </div>
          </div>
            {/*
          <div className="d-flex mt-3 justify-content-between">
            <Button href="/Reports" className="px-4 py-2 text-uppercase btn-danger">
              <span className="font-size-xs font-weight-bold px-1">
                Reports
              </span>
            </Button>
            <Button className="px-4 py-2 text-uppercase btn-success">
              <span className="font-size-xs font-weight-bold px-1">
                Withdraw
              </span>
            </Button>
          </div>
          */}
        </div>
        <div>
          <Chart
            options={chart33Options}
            series={chart33Data}
            type="area"
            height={80}
          />
        </div>
      </div>
    </>
  );
};

export default SidebarWidget;
