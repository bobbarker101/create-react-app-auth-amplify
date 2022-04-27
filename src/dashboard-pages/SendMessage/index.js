import React, { useState } from 'react';
import { PageTitle } from 'layout-components';

import SendMessageProfileForms from '../../dashboard-components/SendMessage/SendMessageProfileForms';
import SendMessagePageTitleActions from '../../dashboard-components/SendMessage/SendMessagePageTitleActions';

import { useSelector } from "react-redux";



export default function SendMessage() {
    const { subscriptions, subscribers, user, senders } = useSelector(state => state.UserOptions);
  return (
    <>
      <PageTitle
        titleHeading="SendMessage"
        titleDescription="Manage your profile settings from this example page.">
        <SendMessagePageTitleActions />
      </PageTitle>
        {(subscriptions.length>0 && subscribers.length>0) &&
        <SendMessageProfileForms  user={user} senders={senders} subscriptions={subscriptions} subscribers={subscribers}/>
        }
    </>
  );
}


