import React from 'react';

import { PageTitle } from 'layout-components';



import ReportsTable from '../../dashboard-components/Reports/ReportsTable';
import { useSelector } from "react-redux";

export default function Reports() {
    const { reports } = useSelector(state => state.UserOptions);
    console.log(reports)
  return (
    <>
      <PageTitle
        titleHeading="Reports"
        titleDescription="Add, edit and delete your reports on this page.">
      </PageTitle>
        {reports.data &&
            <ReportsTable reports={reports} />
        }

    </>
  );
}
