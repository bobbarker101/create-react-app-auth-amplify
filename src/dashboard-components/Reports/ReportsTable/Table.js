import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { API } from 'aws-amplify';
import aws_exports from '../../../aws-exports';
import { connect } from 'react-redux';
import {setReports} from "../../../reducers/UserOptions";
import { toast } from "react-toastify";
API.configure(aws_exports);
import Table2 from './Table2'


import { forwardRef } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import moment from "moment/moment";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const apiKey = "RJnVqR4pjs5OmAIQKYEKG9pB9Iy88pbR7jcifvBE";
//const dispatch = useDispatch()
//const setReports = useCallback(
//    () => dispatch({ type: 'increment-counter' }),
//    [dispatch]
//)
//

function Table(props) {
    //props.tableData.data = props.reports.data;
    const comonscol = [
        { title: "Name", field: "companyName" },
        { title: "Customer Type", field: "customerType" },
        { title: "Rate", field: "rate" },
        { title: "Total Messages", field: "messageCount" },
        { title: "Rate ID", field: "SK_rateId" },
        { title: "Date", field: "startEnd", type: 'date',
            render: rowData => moment(rowData.start_date).format('MM/DD/YYYY')},
    ];
    console.log(props.tableData)
    const reports = props.reports;
    //var comonscol = props.comonscol;
    const [gridData, setGridData] = useState(props.tableData);
    const [columns, setcolumns] = useState(comonscol);
    console.log(gridData)
    useEffect(() => {
        gridData.resolve();
        setcolumns(comonscol);
        console.log("RESOLVE AT:", gridData.updatedAt);
    }, [gridData, comonscol]);

    const setData = newdata => {
        setcolumns([]);
        const updatedAt = new Date();
        const data = newdata;
        setGridData({ ...gridData, data, resolve, updatedAt });
        toast.success(result.success);
    };

    const onRowAdd = newData =>
        new Promise((resolve, reject) => {
            console.log(newData);
            let apiName = 'PilotApi';
            let path = '/pilot/reports';
            let myInit = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                },
                body: {
                    "autoSubscribe": true,
                    "parentUserId": "100",
                    "keyword": newData.keyword,
                    "number": newData.number,
                    "responseMessage": newData.responseMessage,
                    "FK_parentUserId": "100"
                }
            };
            API.put(apiName, path, myInit)
                .then((result) => {
                    console.log("result");
                    console.log(result);
                    if(result.error){
                        toast.warning(result.error);
                    }else{
                        newData.subscriptionId = result.subscriptionId;
                        setcolumns([]);
                        const { data } = gridData;
                        const updatedAt = new Date();
                        data.push(newData);
                        props.setReports({data: data, count: data.length});
                        setGridData({ ...gridData, data, resolve, updatedAt });
                        toast.success(result.success);
                    }


                })
                .catch((error) => {
                    toast.warning("ERROR: " + JSON.stringify(error));
                    console.log('ERROR');
                    console.log(error);
                });
        });

    const onRowDelete = oldData =>
        new Promise((resolve, reject) => {
            //console.log(JSON.stringify(this.props));
/*
            setcolumns([]);
            const { data } = gridData;
            const updatedAt = new Date();
            const index = data.indexOf(oldData);
            data.splice(index, 1);
            props.setReports({data: data, count: data.length});
            setGridData({ ...gridData, data, resolve, updatedAt });
            toast.success("Keyword Deleted Successfully.");
            */
            let apiName = 'PilotApi';
            let path = '/pilot/reports/'+oldData.keyword+'/'+oldData.number;
            let myInit = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                },
                body: {}
            };
            API.del(apiName, path, myInit)
                .then((result) => {
                    console.log("result");
                    console.log(result);
                    if(result.error){
                        toast.warning(result.error);
                    }else{
                        setcolumns([]);
                        const { data } = gridData;
                        const updatedAt = new Date();
                        const index = data.indexOf(oldData);
                        data.splice(index, 1);
                        setGridData({ ...gridData, data, resolve, updatedAt });
                        toast.success(result.success);
                    }

                })
                .catch((error) => {
                    console.log('ERROR');
                    console.log(error);
                    toast.warning("ERROR: " + JSON.stringify(error));
                });


        });

    const onRowUpdate = (newData, oldData) =>
        new Promise((resolve, reject) => {
            console.log(newData);
            console.log(oldData);

            let apiName = 'PilotApi';
            let path = '/pilot/reports/'+newData.keyword+'/'+newData.number;
            let myInit = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                },
                body: {
                    PK_keywordId: newData.keyword,
                    SK_senderId: newData.number,
                    responseMessage: newData.responseMessage
                }
            };
            API.patch(apiName, path, myInit)
                .then((result) => {

                    console.log("result");
                    console.log(result);
                    if(result.error){
                        toast.warning(result.error);
                    }else{
                        setcolumns([]);
                        const { data } = gridData;
                        const updatedAt = new Date();
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        props.setReports({data: data, count: data.length});
                        setGridData({ ...gridData, data, resolve, updatedAt });
                        toast.success(result.success);
                    }

                })
                .catch((error) => {
                    console.log('ERROR');
                    console.log(error);
                    toast.warning("ERROR: " + JSON.stringify(error));
                });


        });

    function handleChange(event){
        //
        new Promise((resolve, reject) => {
            console.log(reports[event.target.value])
            //setcolumns([]);
            let data = reports[event.target.value]
            gridData.data = data;
            const updatedAt = new Date();
            setGridData({...gridData, data, resolve, updatedAt});
        })
    }

    const { data } = gridData;


    return (
        <div className="App">
            <MaterialTable
                icons={tableIcons}
                data={data}
                columns={columns}
                title="Edit Reports"
                editable={{
                    isEditable: rowData => true,
                    isDeletable: rowData => true,
                    onRowAdd: onRowAdd,
                    onRowUpdate: onRowUpdate,
                    onRowDelete: onRowDelete
                }}
                options={{
                    search: false,
                    filtering: false
                }}
                detailPanel={[
                {
                    tooltip: "Show Name",
                    render: (rowData) => {
                        console.log("rowdata")
console.log(rowData);
                        var dat = {
                            tableData: {
                                data: rowData.lineItems,
                                resolve: () => {},
                                updatedAt: new Date()
                            }
                        };
                        return (
                            <div
                                style={{
                                    background: '#d2ecf9',
                                    padding: '10px 10px 10px 20px',
                                }}
                            >
                                <Table2   tableData={dat.tableData} comonscol={comonscol} reports={reports} />
                            </div>
                        );
                    }
                }
            ]}
            />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setReports: (reports) => dispatch(setReports(reports))
});

export default connect(null, mapDispatchToProps)(Table);