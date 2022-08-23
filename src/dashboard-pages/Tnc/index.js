import React from 'react';

import { PageTitle } from 'layout-components';
import projectLogo from '../../assets/images/MobileHelmsvn.png';//react.svg';



import TncTable from '../../dashboard-components/Tnc/TncTable';
import { useSelector } from "react-redux";

export default function Tnc() {
    const { tnc } = useSelector(state => state.UserOptions);
  return (
    <>
      <PageTitle
        titleHeading="Terms and Conditions"
        titleDescription="Add, edit and delete your Terms and Conditions page.">
      </PageTitle>
        {(tnc.length>0) ?
            <TncTable tnc={tnc} />
            :
            <div style={{boxShadow: 'none'}}className="app-sidebar-logo--icon">

                <img
                    alt="MobileHelm"
                    src={projectLogo}
                />
                <h5 style={{marginLeft: '10px', marginTop: '10px'}}>Loading...</h5>
            </div>
        }

    </>
  );
}
