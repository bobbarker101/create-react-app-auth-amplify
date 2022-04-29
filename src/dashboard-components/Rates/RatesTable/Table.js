import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { API } from 'aws-amplify';
import aws_exports from '../../../aws-exports';
import { connect } from 'react-redux';
import {setRates, setReports, setSenders, setUser} from "../../../reducers/UserOptions";
import { toast } from "react-toastify";
API.configure(aws_exports);
import { forwardRef } from 'react';

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
//const setRates = useCallback(
//    () => dispatch({ type: 'increment-counter' }),
//    [dispatch]
//)
//

function Table(props) {
    //props.tableData.data = props.rates.data;
    var comonscol = props.comonscol;
    const [gridData, setGridData] = useState(props.tableData);
    const [columns, setcolumns] = useState(props.comonscol);
    console.log(gridData)
    useEffect(() => {
        gridData.resolve();
        setcolumns(comonscol);
        console.log("RESOLVE AT:", gridData.updatedAt);
    }, [gridData, comonscol]);

    const onRowAdd = newData =>
        new Promise((resolve, reject) => {
            console.log(newData);
            let apiName = 'PilotApi';
            let path = '/pilot/rates';
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
                        props.setRates({data: data, count: data.length});
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
            props.setRates({data: data, count: data.length});
            setGridData({ ...gridData, data, resolve, updatedAt });
            toast.success("Keyword Deleted Successfully.");
            */
            let apiName = 'PilotApi';
            let path = '/pilot/rates/'+oldData.keyword+'/'+oldData.number;
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
            let path = '/pilot/rates/'+newData.keyword+'/'+newData.number;
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
                        props.setRates({data: data, count: data.length});
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

    const { data } = gridData;

    return (
        <div className="App">
            <MaterialTable
                icons={tableIcons}
                data={data}
                columns={columns}
                title="Edit Rates"
                editable={{
                    isEditable: rowData => true,
                    isDeletable: rowData => true,
                    onRowAdd: onRowAdd,
                    onRowUpdate: onRowUpdate,
                    onRowDelete: onRowDelete
                }}
            />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setRates: (rates) => dispatch(setRates(rates))
});

export default connect(null, mapDispatchToProps)(Table);