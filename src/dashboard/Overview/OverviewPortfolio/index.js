import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button, List, ListItem } from '@material-ui/core';

import CountUp from 'react-countup';
import PerfectScrollbar from 'react-perfect-scrollbar';

import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import TrendingDownTwoToneIcon from '@material-ui/icons/TrendingDownTwoTone';

import clsx from 'clsx';

export default function LivePreviewExample(data) {
  console.log('data');
  console.log(data);
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };
  //const [anchorEl, setAnchorEl] = useState(null);
  //const handleClick = (event) => {
  // setAnchorEl(event.currentTarget);
  //};
  //const handleClose = () => {
  //  setAnchorEl(null);
  //};
  const [activeTab, setActiveTab] = useState('0');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <Card className="w-100 mb-5">
        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-0">
          <List
            component="div"
            className="w-100 nav-line justify-content-center d-flex nav-line-alt nav-tabs-primary">
            {data.dataFromParent.length > 0 &&
              data.dataFromParent.map(function (headerObj, HeaderIndex) {
                if (headerObj.total) {
                  var date = new Date(headerObj.start_date);
                  var month = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                  ][date.getMonth()];
                  var dateTabs = month + ' ' + date.getFullYear();
                  return (
                    <ListItem
                      button
                      disableRipple
                      className="px-5 py-4"
                      selected={activeTab === `${HeaderIndex}`}
                      onClick={() => {
                        toggle(`${HeaderIndex}`);
                      }}>
                      <span className="font-weight-bold text-uppercase">
                        {dateTabs}
                      </span>
                      <div className="divider" />
                    </ListItem>
                  );
                }
              })}
          </List>
        </div>
        {data.dataFromParent.length > 0 &&
          data.dataFromParent.map(function (obj, index) {
            if (obj.total) {
              return (
                <div
                  className={clsx('tab-item-wrapper overflow-visible', {
                    active: activeTab === `${index}`
                  })}
                  index={index}>
                  <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-4">
                    <div>
                      <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                        {obj.companyName}
                      </h6>
                      <p className="text-black-50 mb-0">{obj.startEnd}</p>
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="divider" />
                  <h3 className="display-3 mt-5 mb-0 text-center font-weight-bold">
                    <small className="opacity-6">$</small>
                    <span className="pl-1">
                      <CountUp
                        start={0}
                        end={obj.total ? obj.total : 0}
                        duration={6}
                        separator=","
                        delay={1}
                        decimals={2}
                        decimal="."
                        prefix=""
                        suffix=""
                      />
                    </span>
                  </h3>
                  <small className="text-center d-block font-weight-bold text-muted text-uppercase">
                    Total balance
                  </small>
                  <div className="divider mt-5" />
                  <div className="divider" />
                  <div className="scroll-area-sm shadow-overflow">
                    <PerfectScrollbar>
                      <List component="div" className="list-group-flush">
                        {data.dataFromParent[0].lineItems &&
                          data.dataFromParent[0].lineItems.map(function (
                            objItems,
                            indexItems
                          ) {
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
                                    <div className="font-weight-bold">
                                      {objItems.rateDisplayName}
                                    </div>
                                    <span className="text-first d-block">
                                      Count {objItems.count}
                                    </span>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <div className="text-right mr-3">
                                    <div className="font-weight-bold font-size-lg">
                                      ${objItems.total}
                                    </div>
                                    <div className="font-weight-bold text-black opacity-4">
                                      Rate ${objItems.rate}
                                    </div>
                                  </div>
                                  <div className="font-size-lg text-success">
                                    <TrendingUpTwoToneIcon />
                                    <TrendingDownTwoToneIcon />
                                  </div>
                                </div>
                              </ListItem>
                            );
                          })}
                      </List>
                    </PerfectScrollbar>
                  </div>
                  <div className="card-footer p-3 text-center">
                    <Button
                      size="small"
                      className="py-2 px-4 btn-primary"
                      onClick={() => openInNewTab()}>
                      <span className="btn-wrapper--label text-uppercase font-weight-bold">
                        PDF Invoice
                      </span>
                    </Button>
                  </div>
                </div>
              );
            }
          })}
      </Card>
    </>
  );
}
