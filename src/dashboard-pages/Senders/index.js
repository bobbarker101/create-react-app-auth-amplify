import React from 'react';

import { PageTitle } from 'layout-components';



import SendersTable from '../../dashboard-components/Senders/SendersTable';
import { useSelector } from "react-redux";

export default function Senders() {
    const { senders } = useSelector(state => state.UserOptions);
  return (
    <>
      <PageTitle
        titleHeading="Senders"
        titleDescription="Add, edit and delete your senders on this page.">
      </PageTitle>
        {senders.length>0 &&
            <SendersTable senders={senders} />
        }

    </>
  );
}
