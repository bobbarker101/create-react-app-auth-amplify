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

export default function RatesTable(props){

    let rates = props.rates;
    const [state, changeState] = useState({
        tableData: {
            data: props.rates.length>0 ? props.rates : [],
            resolve: () => {},
            updatedAt: new Date()
        },
        groups: [],
        lookedUp: false
    });


    const comonscol = [
        { title: "Name", field: "customerName" },
        { title: "Cost", field: "cost" },
        { title: "Rate", field: "rate" },
        { title: "Rate Display Name", field: "rateDisplayName" },
        { title: "Rate ID", field: "SK_rateId" },
        { title: "Effective Date", field: "effectiveDate", type: 'date',
            render: rowData => moment(rowData.effectiveDate).format('MM/DD/YYYY')},
    ];

  return (
    <>
      <Card>
        <div className="px-0 py-0 py-lg-5">
            <div className="ml-5 ml-lg-0">
                <div className="divider mb-4" />
                <Container>
                    <Grid container spacing={8} justify="center" >
                        {rates.length>0 &&
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
