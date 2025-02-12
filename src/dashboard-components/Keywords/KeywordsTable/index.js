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

export default function KeywordsTable(props){

    let keywords = props.keywords;
    let senders = props.senders;
    console.log("olOOOOLd")
    console.log(props);
    const [state, changeState] = useState({
        tableData: {
            data: props.keywords.length>0 ? props.keywords : [],
            resolve: () => {},
            updatedAt: new Date()
        },
        groups: [],
        lookedUp: false
    });

    const codeLookup = {}
    senders.map((sender) => codeLookup[sender.PK_senderId] = sender.PK_senderId);
    console.log("doubled ");
    console.log(codeLookup);

    const comonscol = [
        { title: "Keyword", field: "keyword", editable: 'onAdd' },
        { title: "Number", field: "number", lookup: codeLookup, editable: 'onAdd'},
        { title: "Response Message", field: "responseMessage", width: "60%" },
        { title: "Subscription ID", field: "subscriptionId", editable: 'never' },

    ];

  return (
    <>
      <Card>
        <div className="px-0 py-0 py-lg-5">
            <div className="ml-5 ml-lg-0">
                <div className="divider mb-4" />
                <Container>
                    <Grid container spacing={8} justify="center" >
                        {keywords.length>0 &&
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
