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

export default function ReportsTable(props){

    let reports = props.reports.data
    console.log('rep');
    console.log(reports)
    const [state, changeState] = useState({
        tableData: {
            data: reports['d78sgw0ZHP2vsIBf6cOF22rMRhz66DF687KI3J66'],
            resolve: () => {},
            updatedAt: new Date()
        },
        groups: [],
        lookedUp: false
    });
    console.log("hhhhhhh")
    console.log(state);

    const comonscol = [
        { title: "Name", field: "companyName" },
        { title: "Customer Type", field: "customerType" },
        { title: "Rate", field: "rate" },
        { title: "Total Messages", field: "messageCount" },
        { title: "Rate ID", field: "SK_rateId" },
        { title: "Date", field: "startEnd", type: 'date',
            render: rowData => moment(rowData.start_date).format('MM/DD/YYYY')},
    ];

   function handleChange(event) {
       console.log('event')
       console.log(reports[event.target.value]);
       //Table.setData(reports[event.target.value])
       //Table.setData(reports[event.target.value]);
       event.preventDefault();
       /*
       changeState({
           tableData: {
               data: [],
               resolve: () => {},
               updatedAt: new Date()
           },
           groups: [],
           lookedUp: false
       });
       */
       changeState(
           state.tableData =  {
               data: [],
               resolve: () => {},
               updatedAt: new Date(),
           }
       );
       console.log(state);
       changeState(
           state.tableData =  {
               data: reports[event.target.value],
               resolve: () => {},
               updatedAt: new Date(),
            }
       );
      // matTab();
       console.log(state);

    }



  return (
    <>
      <Card>
        <div className="px-0 py-0 py-lg-5">
            <div className="ml-5 ml-lg-0">
                <div className="divider mb-4" />
                <Container>
                    <div>
                        <Grid container spacing={8} justify="center" >
                            {state.tableData &&
                                <div>
                                    <Table tableData={state.tableData} comonscol={comonscol} reports={reports} />
                                </div>
                            }
                        </Grid>
                    </div>
                </Container>
            </div>
        </div>
      </Card>
    </>
  );
}
