import React, { Suspense, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, Button } from '@material-ui/core';
import _ from "lodash"
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import TrendingDownTwoToneIcon from '@material-ui/icons/TrendingDownTwoTone';
import GridOnTwoToneIcon from '@material-ui/icons/GridOnTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import { useSelector } from "react-redux";
const OverviewWatchList = (props) => {
  console.log('WatchList');
  console.log(useSelector(state => state.UserOptions.user));
    const { reports, user, senders, keywords } = useSelector(state => state.UserOptions);

  if(reports.data){
      reports.data = reports.data.sort(function (a, b) {
          var dateA = new Date(a.start_date), dateB = new Date(b.start_date)
          return dateA - dateB
      });
  }

let months = [
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
  const ethChartOptions = {
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
    colors: ['#4191ff'],
    stroke: {
      color: '#4191ff',
      width: 2,
      curve: 'smooth'
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
        width: 1
      }
    },
    yaxis: {
      min: 0
    },
    legend: {
      show: false
    }
  };
  const ethChartData = [
    {
      name: 'Keywords Created',
      data: []
    }
  ];

  const btcChartOptions = {
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
    colors: ['#f4772e'],
    stroke: {
      color: '#f4772e',
      width: 2,
      curve: 'smooth'
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
        width: 1
      }
    },
    yaxis: {
      min: 0
    },
    legend: {
      show: false
    }
  };
  const btcChartData = [
    {
      name: 'Messages Per Month',
      data: []
    }
  ];


  const tetherChartOptions = {
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
    colors: ['#070919'],
    stroke: {
      color: '#070919',
      width: 2,
      curve: 'smooth'
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
        width: 1
      }
    },
    yaxis: {
      min: 0
    },
    legend: {
      show: false
    }
  };
  const tetherChartData = [
    {
      name: 'Estimated Invoice',
      data: []
    }
  ];
    if(keywords.data){
        let latestIndex = 12;
        keywords.ethChartOptions = ethChartOptions;
        keywords.ethChartData = ethChartData;
        var grut = _.countBy(keywords.data, ({lastUpdated})=> {
            latestIndex = new Date(lastUpdated).getMonth();
            return keywords.ethChartOptions.xaxis.categories[(new Date(lastUpdated).getMonth())]+" "+(new Date(lastUpdated).getFullYear())
        })
        keywords.ethChartOptions.xaxis.categories = Object.keys(grut);
        keywords.ethChartData[0].data = Object.values(grut);
        /*
          if(Object.keys(grut).length< 5){
              console.log(ethChartOptions.xaxis.categories)
              console.log(ethChartOptions.xaxis.categories[latestIndex-Object.keys(grut).length])
              props.keywords.ethChartOptions.xaxis.categories.push(ethChartOptions.xaxis.categories[latestIndex-Object.keys(grut).length])
              props.keywords.ethChartData[0].data.push(0);
          }
          */
        console.log(keywords)

    }
    if(reports.data) {

        reports.totalChartOptions = tetherChartOptions;
        reports.totalChartData = tetherChartData;

        reports.totalChartOptions.xaxis.categories = _.map(reports.data, function (value, key) {
            return months[(new Date(value.end_date).getMonth())] + " " + (new Date(value.end_date).getFullYear());
        })
        reports.totalChartData[0].data = _.map(reports.data, "total");
    }

    //const [keywords, setKeywords] = useState(props.keywords.data ? props.keywords : {});
    //const [reports, setReports] = useState(props.reports.totalChartData ? props.reports : {});

/*
    if(reports.data){
        props.reports.data = props.reports.data.sort(function (a, b) {
            var dateA = new Date(a.start_date), dateB = new Date(b.start_date)
            return dateA - dateB
        });
        props.reports.totalChartOptions = tetherChartOptions;
        props.reports.totalChartData = tetherChartData;

        props.reports.totalChartOptions.xaxis.categories = _.map(props.reports.data, function(value, key){
            return months[(new Date(value.end_date).getMonth())]+" "+(new Date(value.end_date).getFullYear());
        })
        props.reports.totalChartData[0].data = _.map(props.reports.data, "total");
        setReports(props.reports)
    }
    */
    const SuspenseLoading = () => {
        const [show, setShow] = useState(false);

        useEffect(() => {
            let timeout = setTimeout(() => setShow(true), 9000);


            return () => {
                clearTimeout(timeout);
            };
        }, []);

        return (
            <>
                <AnimatePresence>
                    {show && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}>
                            <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
                                <div className="d-flex align-items-center flex-column px-4">
                                    <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
                                </div>
                                <div className="text-muted font-size-xl text-center pt-3">
                                    Please wait while we load the live preview examples
                                    <span className="font-size-lg d-block text-dark">
                    This live preview instance can be slower than a real
                    production build!
                  </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    };
  return (
    <>
        <Suspense fallback={<SuspenseLoading />}>
      <Card className="mb-5">
        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              Usage Charts
            </h6>
            <p className="text-black-50 mb-0">
              List of system usage for the past few months.
            </p>
          </div>
          <div className="d-flex align-items-center">
            <Button className="btn-neutral-dark d-flex align-items-center justify-content-center d-40 active mr-2 border-0 p-0 rounded-pill">
              <GridOnTwoToneIcon className="w-50" />
            </Button>
            <Button className="btn-neutral-dark d-flex align-items-center justify-content-center d-40 border-0 p-0 rounded-pill">
              <ListAltTwoToneIcon className="w-50" />
            </Button>
          </div>
        </div>
        <div className="divider" />
        <div className="divider" />
        <div className="grid-menu grid-menu-3col">
          <Grid container spacing={0}>
            <Grid item lg={4}>
              <div className="px-4 pt-4">
                <div className="d-flex align align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="d-30 text-white d-flex align-items-center btn-pill justify-content-center rounded-pill mr-2 bg-first">
                      <FontAwesomeIcon icon={['fab', 'ethereum']} />
                    </div>
                    <div className="font-weight-bold font-size-lg">
                      Created Keywords
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
                <div className="d-flex my-3 justify-content-between align-items-center">

                </div>
                  {keywords.data &&
                  <div>
                      <Chart
                          options={keywords.ethChartOptions}
                          series={keywords.ethChartData}
                          type="line"
                          height={100}
                      />
                  </div>
                  }
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className="px-4 pt-4">
                <div className="d-flex align align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="d-30 text-white d-flex align-items-center btn-pill justify-content-center rounded-pill mr-2 bg-warning">
                      <FontAwesomeIcon icon={['fab', 'bitcoin']} />
                    </div>
                    <div className="font-weight-bold font-size-lg">Messages</div>
                  </div>
                  <div>
                  </div>
                </div>
                  {(reports.chart33Data &&reports.chart33Options) &&
                  <div>
                      <Chart
                          options={reports.chart33Options}
                          series={reports.chart33Data}
                          type="line"
                          height={100}
                      />
                  </div>
                  }
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className="px-4 pt-4">
                <div className="d-flex align align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="d-30 text-white d-flex align-items-center btn-pill justify-content-center rounded-pill mr-2 bg-second">
                      <FontAwesomeIcon icon={['fas', 'dollar-sign']} />
                    </div>
                    <div className="font-weight-bold font-size-lg">EST. Invoice</div>
                  </div>
                  <div>
                    <div className="badge badge-neutral-dark">12M</div>
                  </div>
                </div>
                  {(reports.totalChartOptions && reports.totalChartData) &&
                  <div>
                      <Chart
                          options={reports.totalChartOptions}
                          series={reports.totalChartData}
                          type="line"
                          height={100}
                      />
                  </div>
                  }
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="divider" />
        <div className="divider" />
        <div className="card-footer p-3 text-center">
          <Button size="small" className="py-2 px-4 btn-primary">
            <span className="btn-wrapper--label text-uppercase font-weight-bold">
              Discover more assets
            </span>
          </Button>
        </div>
      </Card>
        </Suspense>
    </>
  );
}
const mapStateToProps = (state) => ({
    user: state.UserOptions.user,
    reports: state.UserOptions.reports,
    keywords: state.UserOptions.keywords
});


export default connect(mapStateToProps, null)(OverviewWatchList)