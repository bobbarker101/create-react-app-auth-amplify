import React, { useState } from 'react';
import clsx from 'clsx';
import Table from './Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
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
        { title: "SenderId", field: "PK_senderId"},
        { title: "Company Name", field: "companyName"},
        { title: "Description", field: "description"  },
        { title: "Keyword", field: "keyword"},
        { title: "Logo URL", field: "logoUrl"},
        { title: "Privacy Policy Url", field: "privacyPolicyUrl"},
        { title: "Support Email", field: "supportEmail" },
    ];

  return (
    <>
      <Card>
        <div className="px-0 py-0 py-lg-5">
            <div className="ml-5 ml-lg-0">
                <div className="divider mb-4" />
                <Container>
                    <Grid container spacing={8} justify="center" >
                        {tnc.length>0 &&
                            <div>
                                <Table tableData={state.tableData} comonscol={comonscol}/>
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
