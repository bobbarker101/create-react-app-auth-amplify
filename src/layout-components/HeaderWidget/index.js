import React from 'react';

import { Grid } from '@material-ui/core';

import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import TrendingDownTwoToneIcon from '@material-ui/icons/TrendingDownTwoTone';


const HeaderMenu = (props) => {

    let val1 = parseFloat(props.reports.totalPerMonth[Object.keys(props.reports.totalPerMonth)[Object.keys(props.reports.totalPerMonth).length-1]]).toFixed(2);
    let val2 = parseFloat(props.reports.totalPerMonth[Object.keys(props.reports.totalPerMonth)[Object.keys(props.reports.totalPerMonth).length-2]]).toFixed(2);
    let val3 = parseFloat(props.reports.totalPerMonth[Object.keys(props.reports.totalPerMonth)[Object.keys(props.reports.totalPerMonth).length-3]]).toFixed(2);
    //let start_date = moment(m+"/"+y, "M/YYYY").toISOString();
    //let end_date = moment(m+"/"+y, "M/YYYY").endOf('month').toISOString();
   // let startSortkey = (new Date(start_date).getFullYear())+("0"+(new Date(start_date).getMonth()+1)).slice(-2)+("0"+(new Date(start_date).getUTCDate())).slice(-2);
    //let endSortkey = (new Date(end_date).getFullYear())+("0"+(new Date(end_date).getMonth()+1)).slice(-2)+("0"+(new Date(end_date).getUTCDate())).slice(-2)
  return (
    <>
      <div className="app-header-widget pb-1">
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <div className="d-flex align-items-center pr-4">
                {(((val2 - val3) / val3) * 100).toFixed(2) > 0 ?
                    <div className="font-size-lg text-success mr-2">
                        <TrendingUpTwoToneIcon />
                    </div>
                    :
                    <div className="font-size-lg text-danger mr-2">
                        <TrendingDownTwoToneIcon />
                    </div>
                }
              <div className="px-2">
                <span className="opacity-6 text-uppercase font-size-sm">
                  <small>Last Month</small>
                </span>
                <div className="d-flex align-items-center justify-content-center pt-1">
                  <span className="font-weight-bold font-size-lg line-height-1">
                    <small className="opacity-6 pr-1">$</small>
                      {val2.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                    {(((val2 - val3) / val3) * 100).toFixed(2) > 0 ?
                      <div className="badge badge-neutral-success text-success ml-2">
                          {(((val2 - val3) / val3) * 100).toFixed(2)}%
                      </div>
                    :
                      <div className="badge badge-neutral-danger ml-2 text-danger">
                          {(((val2 - val3) / val3) * 100).toFixed(2)}%
                      </div>
                    }
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="d-flex align-items-center">
                {(((val1 - val2) / val2) * 100).toFixed(2) > 0 ?
                    <div className="font-size-lg text-success mr-2">
                        <TrendingUpTwoToneIcon />
                    </div>
                    :
                    <div className="font-size-lg text-danger mr-2">
                        <TrendingDownTwoToneIcon />
                    </div>
                }
              <div className="px-2">
                <span className="opacity-6 text-uppercase font-size-sm">
                  <small>This Month</small>
                </span>
                <div className="d-flex align-items-center justify-content-center pt-1">
                  <span className="font-weight-bold font-size-lg line-height-1">
                    <small className="opacity-6 pr-1">$</small>

                      {val1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                {(((val1 - val2) / val2) * 100).toFixed(2) > 0 ?
                  <div className="badge badge-neutral-success text-success ml-2">
                      {(((val1 - val2) / val2) * 100).toFixed(2)}%
                  </div>
                  :

                  <div className="badge badge-neutral-danger ml-2 text-danger">
                      {(((val1 - val2) / val2) * 100).toFixed(2)}%
                  </div>
                }
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default HeaderMenu;
