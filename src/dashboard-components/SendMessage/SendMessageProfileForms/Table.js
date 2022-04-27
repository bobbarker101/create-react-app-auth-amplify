import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { API } from 'aws-amplify';
import aws_exports from '../../../aws-exports';
API.configure(aws_exports);
const apiKey = "RJnVqR4pjs5OmAIQKYEKG9pB9Iy88pbR7jcifvBE";

const Table = ({ tableData, comonscol, selectedRow, setSelectedRow }) => {
    const [gridData, setGridData] = useState(tableData);
    const [columns, setcolumns] = useState(comonscol);

    useEffect(() => {
        gridData.resolve();
        setcolumns(comonscol);
        console.log("RESOLVE AT:", gridData.updatedAt);
    }, [gridData, comonscol]);

    const onRowAdd = newData =>
        new Promise((resolve, reject) => {
            console.log(newData);
            let apiName = 'MobileHelmV5';
            let path = '/v5/subscriptions';
            let myInit = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                },
                body: {
                    subscriptionGroupName: newData.subscriptionGroupName,
                    senderId: newData.number
                }
            };
            API.put(apiName, path, myInit)
                .then((result) => {
                    console.log("result");
                    console.log(result);
                    newData.subscriptionId = result.subscriptionId;
                    setcolumns([]);
                    const { data } = gridData;
                    const updatedAt = new Date();
                    data.push(newData);
                    setGridData({ ...gridData, data, resolve, updatedAt });
                })
                .catch((error) => {
                    console.log('ERROR');
                    console.log(error);
                    return error;
                });
        });

    const onRowDelete = oldData =>
        new Promise((resolve, reject) => {
            console.log(oldData);
            let apiName = 'MobileHelmV5';
            let path = '/v5/subscriptions/'+oldData.subscriptionId;
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
                    setcolumns([]);
                    const { data } = gridData;
                    const updatedAt = new Date();
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    setGridData({ ...gridData, data, resolve, updatedAt });
                })
                .catch((error) => {
                    console.log('ERROR');
                    console.log(error);
                    return error;
                });
        });

    const onRowUpdate = (newData, oldData) =>
        new Promise((resolve, reject) => {
            let apiName = 'MobileHelmV5';
            let path = '/v5/subscriptions/'+newData.subscriptionId;
            let myInit = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                },
                body: {
                    subscriptionGroupName: newData.subscriptionGroupName,
                    senderId: newData.number
                }
            };
            API.put(apiName, path, myInit)
                .then((result) => {
                    console.log("result");
                    console.log(result);
                    setcolumns([]);
                    const { data } = gridData;
                    const updatedAt = new Date();
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    setGridData({ ...gridData, data, resolve, updatedAt });
                })
                .catch((error) => {
                    console.log('ERROR');
                    console.log(error);
                    return error;
                });

        });

    const { data } = gridData;
    return (
        <div className="App">
            <MaterialTable
                data={data}
                columns={columns}
                title="Groups"
               // editable={{
                  //  isEditable: rowData => true,
                    //isDeletable: rowData => true,
                    //onRowAdd: onRowAdd,
                    //onRowUpdate: onRowUpdate,
                    //onRowDelete: onRowDelete
                //}}
                onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.path[0])}//selectedRow.tableData.id)}
                options={{

                    rowStyle: (rowData) =>{
                        return ({
                            backgroundColor: selectedRow === rowData.tableData.id ? "#6ABAC9" : "#FFF",
                        })
                    },
                }}
                parentChildData={(row, rows) => {

                    if(row.PK_subscriptionId) {
                        return rows.find(a => a.subscriptionId === row.PK_subscriptionId)
                    }

                }}
            />
        </div>
    );
};

export default Table;
