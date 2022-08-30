import React, { useState } from 'react';
import clsx from 'clsx';
import Table from './Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import projectLogo from '../../../assets/images/MobileHelmsvn.png';//react.svg';

import {
  Switch,
  Grid,
  Container,
  Card,
  MenuItem,
  Button,
  List,
  ListItem,
  TextField,
  Select
} from '@material-ui/core';

export default function TncTable(props){

    let tnc = props.tnc;
    const [state, changeState] = useState({
        tableData: {
            data: props.tnc.length>0 ? props.tnc : [],
            resolve: () => {},
            updatedAt: new Date()
        },
        groups: [],
        lookedUp: false
    });


    const comonscol = [
        { title: "SenderId", field: "PK_senderId", validate: rowData => Boolean(rowData.PK_senderId), editable: 'onAdd'},
        { title: "Company Name", field: "companyName", validate: rowData => Boolean(rowData.companyName)},
        { title: "Description", field: "description", validate: rowData => Boolean(rowData.description)  },
        { title: "Keyword", field: "keyword", validate: rowData => Boolean(rowData.keyword)},
        { title: "Logo URL (Optional)", field: "logoUrl"},
        { title: "Privacy Policy Url (Optional)", field: "privacyPolicyUrl"},
        { title: "Support Email", field: "supportEmail", validate: rowData => Boolean(rowData.supportEmail) },
    ];

  return (
    <>
      <Card>
        <div className="px-0 py-0 py-lg-5">
            <div className="ml-5 ml-lg-0">
                <div className="divider mb-4" />
                <Container>
                    <Grid container spacing={8} justify="center" >

                        {tnc.length>0 ?
                                <div>
                                    <Table tableData={state.tableData} comonscol={comonscol}/>
                                </div>
                            :
                                <div style={{boxShadow: 'none'}}className="app-sidebar-logo--icon">

                                    <img
                                    alt="MobileHelm"
                                    src={projectLogo}
                                    />
                                    <h5 style={{marginLeft: '10px', marginTop: '10px'}}>Loading...</h5>
                                </div>
                        }
                    </Grid>
                </Container>
            </div>
        </div>
      </Card>
    </>
  );
}
