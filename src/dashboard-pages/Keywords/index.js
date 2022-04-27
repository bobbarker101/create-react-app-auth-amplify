import React from 'react';

import { PageTitle } from 'layout-components';



import KeywordsTable from '../../dashboard-components/Keywords/KeywordsTable';
import { useSelector } from "react-redux";

export default function Keywords() {
    const { keywords, senders } = useSelector(state => state.UserOptions);
  return (
    <>
      <PageTitle
        titleHeading="Keywords"
        titleDescription="Add, edit and delete your keywords on this page.">
      </PageTitle>
        {(keywords.data && senders.length>0) &&
            <KeywordsTable keywords={keywords} senders={senders}/>
        }

    </>
  );
}
