import React, { useState, forwardRef }  from "react";
import { makeData, Logo, Tips } from "./Utils";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Bar } from "react-chartjs-2";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

// Import React Table
import ReactTable from "material-table";
//import "react-table/react-table.css";
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
    chart: {
        marginLeft: theme.spacing(2)
    }
}));
const columns = [
    {
        Header: "Name",
        columns: [
            {
                Header: "First Name",
                accessor: "firstName"
            },
            {
                Header: "Last Name",
                id: "lastName",
                accessor: d => d.lastName
            }
        ]
    },
    {
        Header: "Info",
        columns: [
            {
                Header: "Age",
                accessor: "age"
            },
            {
                Header: "Status",
                accessor: "status"
            }
        ]
    },
    {
        Header: "Stats",
        columns: [
            {
                Header: "Visits",
                accessor: "visits"
            }
        ]
    }
];


export default function ExpandableTable(props) {
    //alert(JSON.stringify(props))
    const [state, setState] = useState({data: makeData()});

       // const { data } = state;
        return (
            <div>
                <ReactTable
                    icons={tableIcons}
                    title="Basic Tree Data Preview"
                    data={[
                        {
                            id: 1,
                            name: "a",
                            surname: "Baran",
                            birthYear: 1987,
                            birthCity: 63,
                            sex: "Male",
                            type: "adult"
                        },
                        {
                            id: 2,
                            name: "b",
                            surname: "Baran",
                            birthYear: 1987,
                            birthCity: 34,
                            sex: "Female",
                            type: "adult",
                            parentId: 1
                        },
                        {
                            id: 3,
                            name: "c",
                            surname: "Baran",
                            birthYear: 1987,
                            birthCity: 34,
                            sex: "Female",
                            type: "child",
                            parentId: 1
                        },
                        {
                            id: 4,
                            name: "d",
                            surname: "Baran",
                            birthYear: 1987,
                            birthCity: 34,
                            sex: "Female",
                            type: "child",
                            parentId: 3
                        },
                        {
                            id: 5,
                            name: "e",
                            surname: "Baran",
                            birthYear: 1987,
                            birthCity: 34,
                            sex: "Female",
                            type: "child"
                        },
                        {
                            id: 6,
                            name: "f",
                            surname: "Baran",
                            birthYear: 1987,
                            birthCity: 34,
                            sex: "Female",
                            type: "child",
                            parentId: 5
                        }
                    ]}
                    columns={[
                        { title: "Adı", field: "name" },
                        { title: "Soyadı", field: "surname" },
                        { title: "Cinsiyet", field: "sex" },
                        { title: "Tipi", field: "type", removable: false },
                        { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
                        {
                            title: "Doğum Yeri",
                            field: "birthCity",
                            lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
                        }
                    ]}
                    parentChildData={(row, rows) =>
                        rows.find(a => a.id === row.parentId)
                    }
                    options={{
                        selection: true
                    }}
                    onSelectionChange={rows => {
                        alert("Selected id is:  " + rows[0].id);
                    }}
                />
                {state.data &&
                <ReactTable
                    data={state.data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    detailPanel={row => {
                        return (
                            <div style={{padding: "20px"}}>
                                <em>
                                    You can put any component you want here, even another React
                                    Table!
                                </em>
                                <br/>
                                <br/>
                                <ReactTable
                                    data={state.data}
                                    ref={el => {
                                        if (el) {
                                            console.log(row.index + ' created');
                                        } else {
                                            console.log(row.index + ' destroyed');
                                        }
                                    }}
                                    columns={columns}
                                    defaultPageSize={3}
                                    showPagination={false}

                                />
                            </div>
                        );
                    }}
                />
                }
                <br />
            </div>
        );

}
