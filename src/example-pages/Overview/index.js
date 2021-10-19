import React, { useState } from 'react';
import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';
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
    rates: [],
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
      console.log(result.data);
      //
      if (state.reports.length < 1) {
        changeState((state) => ({
          rates: [],
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
