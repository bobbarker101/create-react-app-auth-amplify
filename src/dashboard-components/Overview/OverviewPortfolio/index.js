import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button, List, ListItem, Tooltip } from '@material-ui/core';

import CountUp from 'react-countup';
import PerfectScrollbar from 'react-perfect-scrollbar';

import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import TrendingDownTwoToneIcon from '@material-ui/icons/TrendingDownTwoTone';
import { connect } from 'react-redux';
import moment from 'moment';

function TabGroup({ data }) {
    const [active, setActive] = useState({});
    return (
        <>
            <div className="d-flex align-items-center">

                {data.map((type) => (
                    <Tooltip title={`View stats for ${ moment(type.start_date).format('MMM YYYY') }`} arrow placement="top">
                        <Button className="btn-link mx-1 px-1 py-2 font-weight-bold text-primary"
                                key={type.start_date}
                                active={active.startEnd === type.startEnd}
                                onClick={() => setActive(type)}
                        >
                            <span>{moment(type.start_date).format('MMM YYYY')}</span>
                        </Button>
                    </Tooltip>
                ))}
            </div>
            <p />
            <p> Your payment selection: {active.startEnd} </p>
        </>
    );
}
function ListItems({ lineItems }) {
    //console.log(data);
    //const [active, setActive] = useState(data[0]);
    //console.log("active")
    const [active, setActive] = useState({});
    return (
        <ListItem className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center mr-4">
                <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-warning">
                    <FontAwesomeIcon
                        icon={['fab', 'bitcoin']}
                        className="font-size-lg"
                    />
                </div>
                <div>
                    <div className="font-weight-bold">BTC</div>
                    <span className="text-warning d-block">Bitcoin</span>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div className="text-right mr-3">
                    <div className="font-weight-bold font-size-lg">
                        2.4895 BTC
                    </div>
                    <div className="font-weight-bold text-black opacity-4">
                        $16,497
                    </div>
                </div>
                <div className="font-size-lg text-success">
                    <TrendingUpTwoToneIcon />
                </div>
            </div>
        </ListItem>
    );
}
const OverviewPortfolio = ({reports, keywords}) => {
  console.log("HHHHHH  H")
    console.log(reports);
  //console.log(props.reports.data);
    const [active, setActive] = useState(reports.data ? reports.data[0] : {});
    let latestInvoice = [];


    if(reports.data){
        if(reports.data.length > 2 )
            latestInvoice = [reports.data[reports.data.length-3], reports.data[reports.data.length-2], reports.data[reports.data.length-1]];
        else if(props.reports.data.length > 1)
            latestInvoice = [reports.data[reports.data.length-2], props.reports.data[reports.data.length-1]];
        else
            latestInvoice = [reports.data[reports.data.length-1]];
        //if(!reports.data)
            //reports(latestInvoice);
    }


  return (
    <>
      <Card className="w-100 mb-5">
        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">
              Reports
            </h6>
            <p className="text-black-50 mb-0">Past 3 months</p>
          </div>
            {latestInvoice.length > 0  &&
            <div className="d-flex align-items-center">
                {latestInvoice.map((type, index) => (
                    <Tooltip key={index} title={`View stats for ${ moment(type.end_date).format('MMM YYYY') }`} arrow placement="top">
                        <Button className="btn-link mx-1 px-1 py-2 font-weight-bold text-primary"
                                key={index}
                                onClick={() => setActive(type)}
                        >
                            <span>{moment(type.end_date).format('MMM YYYY')}</span>
                        </Button>
                    </Tooltip>
                ))}
            </div>
            }
        </div>
        <div className="divider" />
        <div className="divider" />
          {active.total  &&
            <h3 className="display-3 mt-5 mb-0 text-center font-weight-bold">
              <small className="opacity-6">$</small>
              <span className="pl-1">
                <CountUp
                  start={0}
                  end={active.total}
                  duration={6}
                  separator=""
                  delay={1}
                  decimals={3}
                  decimal="."
                  prefix=""
                  suffix=""
                />
              </span>
            </h3>
          }
        <small className="text-center d-block font-weight-bold text-muted text-uppercase">
          Total balance
        </small>

        <div className="divider mt-5" />
        <div className="divider" />
        <div className="scroll-area-sm shadow-overflow">
          <PerfectScrollbar>
              {active.PK_userId &&
              <List component="div" className="list-group-flush">
                  {active.lineItems.map(function (val, index) {
                      console.log(val);
                      console.log(index);
                      return <ListItem key={index} className="d-flex justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center mr-4">
                              <div
                                  className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill mr-3 bg-first">
                                  <FontAwesomeIcon
                                      icon={['fab', 'ethereum']}
                                      className="font-size-lg"
                                  />
                              </div>
                              <div>
                                  <div className="font-weight-bold">{val.rateDisplayName}</div>
                                  <span className="text-warning d-block">rate ${val.rate}</span>
                              </div>
                          </div>
                          <div className="d-flex align-items-center">
                              <div className="text-right mr-3">
                                  <div className="font-weight-bold font-size-lg">
                                      ${val.total}
                                  </div>
                                  <div className="font-weight-bold text-black opacity-4">
                                      Count {val.count}
                                  </div>
                              </div>
                          </div>
                      </ListItem>;
                  })}
              </List>
              }:{
            <div>
                Loading...
            </div>
          }
          </PerfectScrollbar>
        </div>
        <div className="card-footer p-3 text-center">
          <Button size="small" className="py-2 px-4 btn-primary">
            <span className="btn-wrapper--label text-uppercase font-weight-bold">
              PDF Invoice
            </span>
          </Button>
        </div>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => ({
    user: state.UserOptions.user,
    reports: state.UserOptions.reports,
    keywords: state.UserOptions.keywords
});


export default connect(mapStateToProps)(OverviewPortfolio)