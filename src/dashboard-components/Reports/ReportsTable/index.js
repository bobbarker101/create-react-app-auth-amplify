import React, { useState } from 'react';
import clsx from 'clsx';
import Table from './Table'
import Table2 from './Table2'
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
  Select,
    ExpansionPanel,
    ExpansionPanelDetails,
    Typography,
    ExpansionPanelSummary,
    InputLabel,
    Box,
    FormControl
} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
export default function ReportsTable(props){

    //let reports = {
        //'fHB5oTG4eD8WOuArN7lVV633AWoOpxYA12AWBvr3': props.reports.data['fHB5oTG4eD8WOuArN7lVV633AWoOpxYA12AWBvr3']}
    let reports = Object.keys(props.reports.data).sort((a, b) => props.reports.data[a][0].companyName.localeCompare(props.reports.data[b][0].companyName, 'es', { sensitivity: 'base' })).reduce((r, k) => Object.assign(r, { [k]: props.reports.data[k] }), {})

   //console.log('rep');
    //console.log(reports)
    const [state, changeState] = useState({
        tableData: {
            data: props.reports.data['d78sgw0ZHP2vsIBf6cOF22rMRhz66DF687KI3J66'],
            resolve: () => {},
            updatedAt: new Date()
        },
        groups: [],
        lookedUp: false,
        expanded: null
    });

    //console.log("hhhhhhh")
    //console.log(state);

    const columns = [
        { title: "Name", field: "rateDisplayName" },
        { title: "Count", field: "count" },
        { title: "Rate", field: "rate", render: (expense) => '$'+expense.rate },
        { title: "Total", field: "total", render: (expense) => '$'+expense.total.toFixed(2) },
    ];

    const comonscol = columns.map((column) => {
        return { ...column };
    });
/*
   function handleChange(event) {
       console.log('event')
       //console.log(reports[event.target.value]);
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
    */

    const [matTable, setMatTable] = React.useState(null);
    console.log("start")

    console.log(matTable );



    const [company, setCompany] = React.useState('');
    const [date, setDate] = React.useState('');

    const handleChange3 = (event, val) => {
        setDate('');
        setCompany(event.target.value);
    };
    const handleChange4 = (event, val) => {
        setDate("");
        setTimeout(() => {
            let tabData = reports[company].find(item => item.SK_startEpochTime === event.target.value).lineItems ? reports[company].find(item => item.SK_startEpochTime === event.target.value).lineItems: [];
            setMatTable({
                data: tabData,
                resolve: () => {},
                updatedAt: new Date()
            });
            setDate(event.target.value);
        }, 1000);

        console.log("here");
        console.log(reports[company])
        console.log(reports[company].find(item => item.SK_startEpochTime === event.target.value))
    }
   // Object.keys(reports).map((key) => key); <Table2 tableData={dat} comonscol={comonscol} reports={reports}/>

  return (
    <>
      <Card>
        <div className="px-0 py-0 py-lg-5">
            <div className="ml-5 ml-lg-0">
                <div className="divider mb-4" />
                <Container>
                    <h4>Select a company</h4>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl >
                            <InputLabel id="demo-simple-select-label">Company</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={company}
                                label="API Key"
                                onChange={handleChange3}
                            >
                                {Object.keys(reports).map((key) =>  <MenuItem value={key}>{reports[key][0].companyName}</MenuItem> )};

                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl >
                            <InputLabel id="demo-simple-select-label">Date</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={date}
                                label="Dates"
                                onChange={handleChange4}
                            >
                                {company && reports[company].map((itemVal) =>
                                    <MenuItem value={itemVal.SK_startEpochTime}>{itemVal.startEnd}</MenuItem>
                                )};

                            </Select>
                        </FormControl>
                    </Box>
                    <div>
                        <div style={{}}>
                            {(company && date) &&

                                <div>
                                    <Table2 tableData={matTable} comonscol={comonscol} reports={reports}/>
                                </div>
                            }


                            {/*
                            <Table tableData={reports[company]}/>
                                        {company && props.reports.data[company].map((itemVal, key) => {
                                            //console.log(props.reports.data[key])

                                            //console.log("ownebibqw"+itemVal.SK_startEpochTime)

                                            return(
                                                <ExpansionPanel
                                                    expanded={expanded2 === "panel" + itemVal.SK_startEpochTime}
                                                    onChange={handleChange2("panel-" + itemVal.SK_startEpochTime)}
                                                >
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ChevronLeft/>}
                                                        aria-controls="panel{itemVal.SK_startEpochTime}-content"
                                                        id={"panel" + itemVal.SK_startEpochTime + "d" + "-header"}

                                                    >{matTable}
                                                        <Typography>{key}{itemVal.startEnd}</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>

                                                    </ExpansionPanelDetails>

                                                </ExpansionPanel>
                                            )

                                        })}
                                        */}
                                {/*
                                        <ExpansionPanel
                                            expanded={expanded === "panel" + key}
                                            onChange={handleChange("panel" + key)}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={<ChevronLeft/>}
                                                aria-controls="panel{key}-content"
                                                id={"panel" + key + "d" + "-header"}

                                            >
                                                <Typography>{key}</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Container>

                                                    {key}
                                                    {/*
                                                    {props.reports.data[key].map((itemVal) => {
                                                        console.log(props.reports.data[key])

                                                        console.log("ownebibqw"+itemVal.SK_startEpochTime)
                                                        return(
                                                            <ExpansionPanel
                                                                expanded={expanded2 === "panel" + itemVal.SK_startEpochTime}
                                                                onChange={handleChange2("panel" + itemVal.SK_startEpochTime)}
                                                            >
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ChevronLeft/>}
                                                                aria-controls="panel{itemVal.SK_startEpochTime}-content"
                                                                id={"panel" + itemVal.SK_startEpochTime + "d" + "-header"}

                                                                    >
                                                                    <Typography>{itemVal.startEnd}</Typography>
                                                            </ExpansionPanelSummary>
                                                                <ExpansionPanelDetails>
                                                                    <p>{itemVal.SK_startEpochTime}</p>
                                                                </ExpansionPanelDetails>

                                                                </ExpansionPanel>
                                                            )

                                                    })}
                                                </Container>
                                            </ExpansionPanelDetails>

                                        </ExpansionPanel>
                                */}

                        </div>

                    </div>
                </Container>
            </div>
        </div>
      </Card>
    </>
  );
}
