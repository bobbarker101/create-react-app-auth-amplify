import React from 'react';

import { PageTitle } from 'layout-components';



import TncTable from '../../dashboard-components/Tnc/TncTable';
import { useSelector } from "react-redux";

export default function Rates() {
    const { tnc } = useSelector(state => state.UserOptions);
  return (
    <>
      <PageTitle
        titleHeading="Terms and Conditions"
        titleDescription="Add, edit and delete your Terms and Conditions page.">
      </PageTitle>
        {(tnc.length>0) &&
            <RatesTable tnc={tnc} />
        }

    </>
  );
}
