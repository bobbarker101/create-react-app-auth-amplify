import React from 'react';

import { PageTitle } from 'layout-components';



import RatesTable from '../../dashboard-components/Rates/RatesTable';
import { useSelector } from "react-redux";

export default function Rates() {
    const { rates } = useSelector(state => state.UserOptions);
  return (
    <>
      <PageTitle
        titleHeading="Rates"
        titleDescription="Add, edit and delete your rates on this page.">
      </PageTitle>
        {(rates.length>0) &&
            <RatesTable rates={rates} />
        }

    </>
  );
}
