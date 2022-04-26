import React, { useState } from 'react';
import { PageTitle } from 'layout-components';
import { Grid, List, ListItem } from '@material-ui/core';
import OverviewPortfolio from '../../dashboard/Overview/OverviewPortfolio';
import OverviewActivity from '../../dashboard/Overview/OverviewActivity';
import OverviewNews from '../../dashboard/Overview/OverviewNews';
import OverviewVerification from '../../dashboard/Overview/OverviewVerification';
import OverviewWatchlist from '../../dashboard/Overview/OverviewWatchlist';
import OverviewPriceWatch from '../../dashboard/Overview/OverviewPriceWatch';
import OverviewWallets from '../../dashboard/Overview/OverviewWallets';
import OverviewPageTitleActions from '../../dashboard/Overview/OverviewPageTitleActions';
import { API } from 'aws-amplify';
import aws_exports from '../../aws-exports';

export default function Overview() {
  //const stats = useState({ reports: [], rates: [] });
  //_isMounted = false;
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  console.log(toggle);
  const [state, changeState] = useState({
    totalPerMonth: [],
    reports: []
  });
  //const names = ['James', 'Paul', 'John', 'George', 'Ringo'];
  let apiName = 'PilotApi';
  let path = '/pilot/reports';
  let myInit = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'VDuW0I43yyaBrYL689kdt5wbD7DFdskI4MkHWNhH'
    }
  };
  console.log(state);
  API.configure(aws_exports);
  //const stats = { reports: [], rates: [] };
  API.get(apiName, path, myInit)
    .then((result) => {
      console.log('result');
      console.log(result);
      //
      if (state.reports.length < 1) {
        changeState((state) => ({
          totalPerMonth: result.totalPerMonth,
          reports: result.data
        }));
      }
      //state.reports = result.data;
      //this.setState(result);
    })
    .catch((error) => {
      console.log('ERROR');
      console.log(error);
      return error;
    });
  if (state.reports.length < 1) {
    return <h1>Your code if fetch() still fetching</h1>;
  }
  return (
    <>
      <PageTitle
        titleHeading="Welcome"
        titleDescription="This page shows an overview of reports.">
        <OverviewPageTitleActions />
      </PageTitle>
      <List
        component="div"
        className="w-100 nav-line justify-content-center d-flex nav-line-alt nav-tabs-primary">
        {Object.keys(state.totalPerMonth).map(function (key, index) {
          var month = [
            'unknown',
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
          ][key.substring(0, 1)];
          return (
            <ListItem
              button
              disableRipple
              className="px-5 py-4"
              selected={activeTab === `${state.totalPerMonth[key]}`}
              onClick={() => {
                toggle(`${state.totalPerMonth[key]}`);
              }}>
              <span className="font-weight-bold text-uppercase">
                {month + ' ' + key.substring(1, 3)}
              </span>
              <div className="divider" />
            </ListItem>
          );
        })}
      </List>
      <Grid container spacing={6}>
        {Object.keys(state.reports).map(function (obj, index) {
          if (state.reports[obj].length > 0) {
            return (
              <Grid item xl={6} className="d-flex">
                <OverviewPortfolio
                  key={
                    state.reports[obj].PK_userId +
                    '_' +
                    state.reports[obj].SK_startEpochTime
                  }
                  dataFromParent={state.reports[obj]}
                />
              </Grid>
            );
          }
        })}
        <Grid item xl={7}>
          <OverviewPriceWatch />
          <OverviewWallets />
        </Grid>
        <Grid item xl={6}>
          <OverviewActivity />
        </Grid>
        <Grid item xl={6}>
          <OverviewNews />
        </Grid>
      </Grid>
      <OverviewWatchlist />
      <OverviewVerification />
    </>
  );
}
