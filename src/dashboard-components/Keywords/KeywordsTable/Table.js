import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { API } from 'aws-amplify';
import aws_exports from '../../../aws-exports';
import { connect } from 'react-redux';
import KeywordsTable from "./index";
import {setKeywords, setReports, setSenders, setUser} from "../../../reducers/UserOptions";
import { toast } from "react-toastify";
API.configure(aws_exports);
const apiKey = "RJnVqR4pjs5OmAIQKYEKG9pB9Iy88pbR7jcifvBE";
//const dispatch = useDispatch()
//const setKeywords = useCallback(
//    () => dispatch({ type: 'increment-counter' }),
//    [dispatch]
//)
//

function Table(props) {
    //props.tableData.data = props.keywords.data;
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
            let apiName = 'MobileHelmV5';
            let path = '/v5/keywords';
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
                        props.setKeywords({data: data, count: data.length});
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
            props.setKeywords({data: data, count: data.length});
            setGridData({ ...gridData, data, resolve, updatedAt });
            toast.success("Keyword Deleted Successfully.");
            */
            let apiName = 'MobileHelmV5';
            let path = '/v5/keywords/'+oldData.keyword+'/'+oldData.number;
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

            let apiName = 'MobileHelmV5';
            let path = '/v5/keywords/'+newData.keyword+'/'+newData.number;
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
                        props.setKeywords({data: data, count: data.length});
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
                data={data}
                columns={columns}
                title="Edit Keywords"
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
    setKeywords: (keywords) => dispatch(setKeywords(keywords))
});

export default connect(null, mapDispatchToProps)(Table);