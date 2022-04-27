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

import { API } from 'aws-amplify';
import aws_exports from '../../../aws-exports';
API.configure(aws_exports);

export default function KeywordsTable(props){

let keywords = props.keywords;
let senders = props.senders;
    console.log("olOOOOLd")
    console.log(props);
    const [state, changeState] = useState({
        tableData: {
            data: props.keywords.data ? props.keywords.data : [],
            resolve: () => {},
            updatedAt: new Date()
        },
        groups: [],
        lookedUp: false
    });
    //const names = ['James', 'Paul', 'John', 'George', 'Ringo'];
    /*
    const tableData = {
        data: [
             { param: "Admin", val: "0.03" },
             { param: "Margin", val: "0.4" },
             { param: "Price", val: "5080" }
         ],

        data: state.groups,
        resolve: () => {},
        updatedAt: new Date()
    };

    let apiName = 'MobileHelmV5';
    let path = '/v5/subscriptions';
    let myInit = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'RJnVqR4pjs5OmAIQKYEKG9pB9Iy88pbR7jcifvBE'
        }
    };
    if(!state.lookedUp) {
        changeState((state) => ({
            tableData: {
                data: props.keywords.data,
                resolve: () => {
                },
                updatedAt: new Date()
            },
            lookedUp: true
        }));

    }

*/
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
    const [activeTab, setActiveTab] = useState('1');
//console.log(this.state);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [checked1, setChecked1] = useState(false);

  const toggleCheck1 = () => {
    setChecked1(!checked1);
  };

  const [checked2, setChecked2] = useState(false);

  const toggleCheck2 = () => {
    setChecked2(!checked2);
  };

  const [country, setCountry] = useState('');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };




  return (
    <>
      <Card>
        <div className="px-0 py-0 py-lg-5">
            <div className="ml-5 ml-lg-0">
                <div className="divider mb-4" />
                <Container>
                    <Grid container spacing={8} justify="center" >
                        {keywords.data &&
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
