import React from 'react';

import { PageTitle } from 'layout-components';
import { Grid } from '@material-ui/core';

import OverviewPortfolio from '../../dashboard-components/Overview/OverviewPortfolio';
import OverviewActivity from '../../dashboard-components/Overview/OverviewActivity';
import OverviewNews from '../../dashboard-components/Overview/OverviewNews';
import OverviewVerification from '../../dashboard-components/Overview/OverviewVerification';
import OverviewWatchlist from '../../dashboard-components/Overview/OverviewWatchlist';
import OverviewPriceWatch from '../../dashboard-components/Overview/OverviewPriceWatch';
import OverviewWallets from '../../dashboard-components/Overview/OverviewWallets';
import OverviewPageTitleActions from '../../dashboard-components/Overview/OverviewPageTitleActions';
import OverviewHeaderChart from '../../dashboard-components/Overview/OverviewHeaderChart';
import MessagesChart from '../../dashboard-components/Overview/MessagesChart';
import MessagesPieChart from '../../dashboard-components/Overview/MessagesPieChart';
import AmountPieChart from '../../dashboard-components/Overview/AmountPieChart';
import { useSelector } from "react-redux";

export default function Overview() {
    const { keywords, senders,  reports} = useSelector(state => state.UserOptions);
  return (
    <>
      <PageTitle
        titleHeading="Welcome back"
        titleDescription="This page shows an overview for your account summary.">
          {/*
        <OverviewPageTitleActions />
        */}
      </PageTitle>
        {/*}
        <OverviewWatchlist />
        {(reports.data && senders.length > 0 && keywords.data ) &&
        <OverviewHeaderChart reports={reports} senders={senders} keywords={keywords}  />

        }
        */}
        {(reports.data ) &&
        <MessagesChart reports={reports} senders={senders} keywords={keywords}  />

        }

      <Grid container spacing={3}>
          {/*
          <Grid item xl={5} className="d-flex">
              <OverviewPortfolio />

          </Grid>
          <Grid item xl={6}>
              <OverviewPriceWatch />
              <OverviewWallets />
          </Grid>
          */}
          <Grid item xl={6} >
              {(reports.data ) &&
              <AmountPieChart reports={reports} senders={senders} keywords={keywords}  />

              }

          </Grid>
          <Grid item xl={6}>
              {(reports.data ) &&
              <MessagesPieChart reports={reports} senders={senders} keywords={keywords}  />

              }
          </Grid>
      </Grid>

        {/*

      </Grid>

      <OverviewVerification />
      */}
    </>
  );
}
