import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import TrendingDownTwoToneIcon from '@material-ui/icons/TrendingDownTwoTone';
import TrendingFlatTwoToneIcon from '@material-ui/icons/TrendingFlat';
import {connect} from "react-redux";
let checkuser = true;
let checkreports = true;
const HeaderMenu = (props) => {

    const [user, setUser] = useState({});
    const [reports, setReports] = useState({
                                            lastMonth: {trending: "flat", total: 0, percent: "0%"},
                                            thisMonth: {trending: "flat", total: 0, percent: "0%"}
                                          });
    if(props.user.attributes && checkuser){
        setUser(props.user);
        checkuser = false
    }
    if(props.reports.count && checkreports){
        props.reports.data.sort(function (a, b) {
            var dateA = new Date(a.start_date), dateB = new Date(b.start_date)
            return dateA - dateB
        });
        let lastMonth = {trending: "flat", total: 0, percent: "0%"};
        let thisMonth = {trending: "flat", total: 0, percent: "0%"}
        if(props.reports.data.length > 2){

            let x = props.reports.data[props.reports.data.length-3].total;
            let offsetxy = 0;
            if(x === 0){ offset = 100; x = 1; }
            let y = props.reports.data[props.reports.data.length-2].total;
            let percentDiffxy = (((y-x)/x)*100)+offsetxy;
            let xyPercentFinal = (Math.round(percentDiffxy * 100) / 100).toFixed(2);

            if( x > y){
                lastMonth = {trending: "down", total: y, percent: "-"+ xyPercentFinal +"%"}
            }else if(x < y){
                lastMonth = {trending: "up", total: y, percent: xyPercentFinal+"%"}
            }else{
                lastMonth = {trending: "flat", total: y, percent: "0%"}
            }
            let a = props.reports.data[props.reports.data.length-2].total;
            let offsetab = 0;
            if(a === 0){ offset = 100; a = 1; }
            let b = props.reports.data[props.reports.data.length-1].total;
            let percentDiffab = (((b-a)/a)*100)+offsetab;
            let abPercentFinal = (Math.round(percentDiffab * 100) / 100).toFixed(2);
            if( a > b){
                thisMonth = {trending: "down", total: b, percent: "-"+abPercentFinal+"%"}
            }else if(a < b){
                thisMonth = {trending: "up", total: b, percent: abPercentFinal+"%"}
            }else{
                thisMonth = {trending: "flat", total: b, percent: "0%"}
            }

        }else if(props.reports.data.length > 1){
            let b = props.reports.data[props.reports.data.length-2].total;

            lastMonth = {trending: "flat", total: b, percent: "0%"};
            let x = props.reports.data[props.reports.data.length-2].total;
            var offset = 0;
            if(x === 0){ offset = 100; x = 1; }
            let y = props.reports.data[props.reports.data.length-1].total;
            let percentDiffxy = (((y-x)/x)*100)+offset;
            let xyPercentFinal = (Math.round(percentDiffxy * 100) / 100).toFixed(2);
            if( x > y){
                thisMonth = {trending: "down", total: y, percent: ((y-x)/x)*100+"%"}
            }else if(x < y){
                thisMonth = {trending: "up", total: y, percent: "-"+((y-x)/x)*100+"%"}
            }else{
                thisMonth = {trending: "flat", total: y, percent: "0%"}
            }
        }else if(props.reports.data.length === 1){
            let x = props.reports.data[props.reports.data.length-2].total;
            var offset = 0;
            if(x === 0){ offset = 100; x = 1; }
            let y = props.reports.data[props.reports.data.length-1].total;
            let percentDiffxy = (((y-x)/x)*100)+offset;
            let xyPercentFinal = (Math.round(percentDiffxy * 100) / 100).toFixed(2);

            lastMonth = {trending: "flat", total: 0, percent: "0%"}
            thisMonth = {trending: "up", total: y, percent: xyPercentFinal+"%"}
        }
        props.reports.lastMonth = lastMonth;
        props.reports.thisMonth = thisMonth;
        setTimeout(() => { setReports(props.reports) }, 1000);

        checkreports = false
    }
  return (
    <>
      <div className="app-header-widget pb-1">
        <Grid container spacing={0}>
          <Grid item xs={6}>
              {reports.data &&
              <div className="d-flex align-items-center pr-4">
                  {reports.lastMonth.trending === 'down'
                      ? <div className="font-size-lg text-success mr-2"><TrendingDownTwoToneIcon/></div>
                      : (reports.lastMonth.trending === 'up'
                              ? <div className="font-size-lg text-danger  mr-2"><TrendingUpTwoToneIcon/></div>
                              : <div className="font-size-lg text-success mr-2"><TrendingFlatTwoToneIcon/></div>
                      )
                  }

                  <div className="px-2">
                <span className="opacity-6 text-uppercase font-size-sm">
                  <small>Last Month</small>
                </span>
                      <div className="d-flex align-items-center justify-content-center pt-1">
                  <span className="font-weight-bold font-size-lg line-height-1">
                    <small className="opacity-6 pr-1">$</small>
                      {(Math.round(reports.lastMonth.total * 100) / 100).toFixed(2)}
                  </span>
                          {reports.lastMonth.percent.includes("-")
                              ?
                              <div className="badge badge-neutral-danger ml-2 text-danger">
                                  {reports.lastMonth.percent}
                              </div>

                              :
                              <div className="badge badge-neutral-success text-success ml-2">
                                  {reports.lastMonth.percent}
                              </div>
                          }
                      </div>
                  </div>
              </div>
              }
          </Grid>
          <Grid item xs={6}>
            <div className="d-flex align-items-center">
                {reports.thisMonth.trending === 'down'
                    ? <div className="font-size-lg text-success mr-2"><TrendingDownTwoToneIcon /></div>
                    : (reports.thisMonth.trending === 'up'
                            ? <div className="font-size-lg text-danger  mr-2"><TrendingUpTwoToneIcon /></div>
                            : ( reports.data ? <div className="font-size-lg text-success mr-2"><TrendingFlatTwoToneIcon /></div> : "Loading...")
                    )
                }
                { reports.data &&
                  <div className="px-2">
                    <span className="opacity-6 text-uppercase font-size-sm">
                      <small>This Month</small>
                    </span>
                      <div className="d-flex align-items-center justify-content-center pt-1">
                          <span className="font-weight-bold font-size-lg line-height-1">
                            <small className="opacity-6 pr-1">$</small>
                              {(Math.round(reports.thisMonth.total * 100) / 100).toFixed(2)}
                          </span>
                          {reports.thisMonth.percent.includes("-")
                              ?
                              <div className="badge badge-neutral-danger ml-2 text-danger">
                                  {reports.thisMonth.percent}
                              </div>

                              :
                              <div className="badge badge-neutral-success text-success ml-2">
                                  {reports.thisMonth.percent}
                              </div>
                          }
                      </div>
                  </div>
                }
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
    user: state.UserOptions.user,
    reports: state.UserOptions.reports
});


export default connect(mapStateToProps, null)(HeaderMenu);
