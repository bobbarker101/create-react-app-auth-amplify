import React, { useState } from 'react';

import { Button } from '@material-ui/core';

import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import TrendingDownTwoToneIcon from '@material-ui/icons/TrendingDownTwoTone';
import TrendingFlatTwoToneIcon from '@material-ui/icons/TrendingFlat';

import { connect } from 'react-redux';

import Chart from 'react-apexcharts';
import { toast } from "react-toastify";

let checkuser = true;
let checkreports = true;
const SidebarWidget = (props) => {

    const [user, setUser] = useState({});
    const [reports, setReports] = useState({
        lastMonth: {trending: "flat", total: 0, percent: "0%"},
        thisMonth: {trending: "flat", total: 0, percent: "0%"}
    });
    const displayMessage = () => {
        toast.success("Coming soon");
    };
    let monthValues = [
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
    ];
    let dateResult = [];
    if(props.user.attributes && checkuser){
        setUser(props.user);
        checkuser = false
    }


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
      categories: reports.labels,
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
      name: 'Messages',
        data: []
    }
  ];

    if(props.reports.data && checkreports){
        //sort the dates of invoices
        props.reports.data.sort(function (a, b) {
            var dateA = new Date(a.start_date), dateB = new Date(b.start_date)
            return dateA - dateB
        });
        props.reports.chart33Options = chart33Options;
        props.reports.chart33Options.xaxis.categories = [];
        props.reports.chart33Data = chart33Data;
        for( let i = 1; i < props.reports.data.length-1; i++ ){
            let data = props.reports.data;
            let monthNum = parseInt(data[data.length-i].SK_startEpochTime.toString().slice(0,  -4));
            let month = monthValues[monthNum-1];
            let year = data[data.length-i].SK_startEpochTime.toString().replace(monthNum.toString(), "");


            props.reports.chart33Options.xaxis.categories.push(monthValues[props.reports.data[props.reports.data.length-i].SK_startEpochTime.toString().slice(0,  -4)-1] + " " +  year),
            props.reports.chart33Data[0].data.push(props.reports.data[props.reports.data.length-i].messageCount)
        }
            props.reports.chart33Options.xaxis.categories.reverse();
            props.reports.chart33Data[0].data.reverse();
        setTimeout(() => {setReports(props.reports); console.log(props.reports.chart33Options.xaxis.categories.length)}, 1000);





        let thisMonth = {trending: "flat", total: 0, percent: "0%"}
        if(props.reports.chart33Data[0].data.length > 1) {
            let a = props.reports.chart33Data[0].data[props.reports.chart33Data[0].data.length - 2];
            let offsetab = 0;
            if (a === 0) {
                offset = 100;
                a = 1;
            }
            let b = props.reports.chart33Data[0].data[props.reports.chart33Data[0].data.length - 1];
            let percentDiffab = (((b - a) / a) * 100) + offsetab;
            let abPercentFinal = (Math.round(percentDiffab * 100) / 100).toFixed(2);
            if (a > b) {
                thisMonth = {trending: "down", total: b, percent: "-" + abPercentFinal + "%"}
            } else if (a < b) {
                thisMonth = {trending: "up", total: b, percent: abPercentFinal + "%"}
            } else {
                thisMonth = {trending: "flat", total: b, percent: "0%"}
            }
        }
        props.reports.chart33Data[0].thisMonth = thisMonth;
        //chart33Data[0].data = [props.reports.data[props.reports.data.length-1].messageCount, props.reports.data[props.reports.data.length-2].messageCount]

        /*
        dateResult = props.reports.data
            .reduce((result, value, index, array) => {
                console.log(result);
                console.log(value);

                let sortKeyArray = value.SK_startEpochTime.toString().split("")
                let year = sortKeyArray[sortKeyArray.length - 4]
                    + sortKeyArray[sortKeyArray.length - 3]
                    + sortKeyArray[sortKeyArray.length - 2]
                    + sortKeyArray[sortKeyArray.length - 1];
                //props.reports.messagePerMonth
                let month = value.SK_startEpochTime.toString().slice(0,  -4);
                console.log("month")
                console.log()
                return monthValues[month-1]+ " " + month+"/"+year;
            }, []);
            */
        checkreports = false
        //console.log("props4")
        //console.log(dateResult)
    }

  return (
    <>
      <div className="app-sidebar--widget">
        <div className="sidebar-header align-items-center font-weight-bold d-flex justify-content-between text-primary">
          <span>Watch list</span>
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
              {reports.data &&
                <div className="d-flex">
                      {reports.chart33Data[0].thisMonth.trending === 'down'
                          ? <div className="font-size-lg text-success mr-2"><TrendingDownTwoToneIcon/></div>
                          : (reports.chart33Data[0].thisMonth.trending === 'up'
                                  ? <div className="font-size-lg text-danger  mr-2"><TrendingUpTwoToneIcon/></div>
                                  : <div className="font-size-lg text-success mr-2"><TrendingFlatTwoToneIcon/></div>
                          )
                      }

                    <div className="text-left ml-3">

                        <div className="d-flex align-items-center justify-content-between">
                            <div className="font-weight-bold">{reports.chart33Data[0].data[reports.chart33Data[0].data.length-1]}</div>
                            {reports.chart33Data[0].thisMonth.percent.includes("-")
                                ?
                                <div className="badge badge-neutral-danger ml-2 text-danger">
                                    {reports.chart33Data[0].thisMonth.percent}
                                </div>

                                :
                                <div className="badge badge-neutral-success text-success ml-2">
                                    {reports.chart33Data[0].thisMonth.percent}
                                </div>
                            }
                        </div>
                        <div className="text-black opacity-4 font-size-sm">
                            ${(Math.round(reports.data[reports.data.length-1].total * 100) / 100).toFixed(2)}
                        </div>
                    </div>
                </div>
              }
          </div>
          <div className="d-flex mt-3 justify-content-between">
            <Button onClick={displayMessage} className="px-4 py-2 text-uppercase btn-success">
              <span className="font-size-xs font-weight-bold px-1">
                Pay Bill
              </span>
            </Button>
          </div>
        </div>
        <div>
            {reports.data
                ?
                    reports.chart33Data[0].data.length > 1
                        ?  <Chart
                            options={reports.chart33Options}
                            series={reports.chart33Data}
                            type="area"
                            height={80}
                            />
                          :
                            <div>
                                Loading...
                            </div>

                :
                <div> Loading...</div>
            }
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
    user: state.UserOptions.user,
    reports: state.UserOptions.reports
});


export default connect(mapStateToProps, null)(SidebarWidget);
