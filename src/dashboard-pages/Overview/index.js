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
import { useSelector } from "react-redux";

export default function Overview() {
    const { keywords, senders,  reports} = useSelector(state => state.UserOptions);
  return (
    <>
      <PageTitle
        titleHeading="Welcome back, Satoshi"
        titleDescription="This page shows an overview for your account summary.">
        <OverviewPageTitleActions />
      </PageTitle>
        <OverviewWatchlist />
        {(reports.data && senders.length > 0 && keywords.data ) &&
        <OverviewHeaderChart reports={reports} senders={senders} keywords={keywords}  />

        }
        {(reports.data ) &&
        <MessagesChart reports={reports} senders={senders} keywords={keywords}  />

        }
      <Grid container spacing={6}>
        <Grid item xl={5} className="d-flex">
          <OverviewPortfolio />

        </Grid>
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

      <OverviewVerification />
    </>
  );
}
