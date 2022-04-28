import React, { useState } from 'react';
import clsx from 'clsx';
import Table from './Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export default function SendersTable(props){

    let senders = props.senders;
    const [state, changeState] = useState({
        tableData: {
            data: props.senders.length>0 ? props.senders : [],
            resolve: () => {},
            updatedAt: new Date()
        },
        groups: [],
        lookedUp: false
    });


    const comonscol = [
        { title: "Name", field: "senderDisplayName"},
        { title: "Sender ID", field: "PK_senderId", editable: 'onAdd' },
        //{ title: "User ID", field: "SK_userId", editable: 'onAdd'},
        { title: "Country", field: "country" },
        { title: "Route", field: "route", editable: 'never' },
        { title: "Sender Type", field: "senderType", lookup: {"ShortCodes":'sc', "LongCodes":'lc'}},
        //{ title: "TermsUrl", field: "termsUrl"},
       // { title: "Subscription ID", field: "inboundUrl", editable: 'never' },
        //{ title: "Response Message", field: "lastUpdate" },
        { title: "Carrier Surcharge", field: "carrierSurcharge" },

    ];

  return (
    <>
      <Card>
        <div className="px-0 py-0 py-lg-5">
            <div className="ml-5 ml-lg-0">
                <div className="divider mb-4" />
                <Container>
                    <Grid container spacing={8} justify="center" >
                        {senders.length>0 &&
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
