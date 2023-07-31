import React, { useState } from 'react';

import clsx from 'clsx';
import { data } from "./data";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  Grid,
  InputLabel,
  InputAdornment,
  Card,
  Menu,
  MenuItem,
  Button,
  List,
  ListItem,
  TextField,
  FormControl,
  Select
} from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';

import Trend from 'react-trend';

import FilterListTwoToneIcon from '@material-ui/icons/FilterListTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';

import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import RadioButtonUncheckedTwoToneIcon from '@material-ui/icons/RadioButtonUncheckedTwoTone';

import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import _ from 'lodash';

export default function LivePreviewExample(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const [anchorElFilter, setAnchorElFilter] = useState(null);

  const handleClickFilter = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorElFilter(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [status, setStatus] = useState('');

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const [type, setType] = useState('');

  const handleType = (event) => {
    setType(event.target.value);
  };
    const [expandedRows, setExpandedRows] = useState(null);

    // expand table row
    const handleExpandRow = (userId) => {
        let currentExpandedRows = null;
        const isRowExpanded = currentExpandedRows === userId ? userId : null;
        const newExpandedRows = isRowExpanded
            ? null
            : (currentExpandedRows = userId);
        if (expandedRows !== userId) {
            setExpandedRows(newExpandedRows);
        } else {
            setExpandedRows(null);
        }
    };
    const [searchOpen, setSearchOpen] = useState(false);
    const [reportNum, setReportNum] = useState(1);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

    const result_id = Object.keys(props.reports.data).map((key) => {
        if (expandedRows === key) {

            return (
                <tr>
                    <td colSpan="4" className="collaps-viewer">
                        {props.reports.data[key].length > 0 ? (
                            <li>
                                {`The Phone Number of `}
                                <br/>{" "}
                            </li>
                        ) : (
                            <div className="no-data"> No activity found! </div>
                        )}
                    </td>
                </tr>
            )
        }else{null}
    });

  return (
    <>
      <Card>
        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-0 text-black">
              Recent Transactions
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <div>
              <Button
                onClick={handleClickFilter}
                variant="text"
                className="btn-outline-primary d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill">
                <FilterListTwoToneIcon className="w-50" />
              </Button>
              <Menu
                anchorEl={anchorElFilter}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElFilter)}
                classes={{ list: 'p-0' }}
                onClose={handleCloseFilter}>
                <div className="dropdown-menu-xxl overflow-hidden p-0">
                  <div className="p-3">
                    <Grid container spacing={6}>
                      <Grid item md={6}>
                        <FormControl
                          variant="outlined"
                          size="small"
                          className="w-100">
                          <InputLabel id="type-select-label">Type</InputLabel>
                          <Select
                            labelId="type-select-label"
                            id="type-select-label-id"
                            fullWidth
                            label="Type"
                            value={type}
                            onChange={handleType}>
                            <MenuItem value={0}>All types</MenuItem>
                            <MenuItem value={1}>Deposit</MenuItem>
                            <MenuItem value={2}>Buy Crypto</MenuItem>
                            <MenuItem value={3}>Sell Crypto</MenuItem>
                            <MenuItem value={4}>Withdraw</MenuItem>
                            <MenuItem value={5}>Transfer Funds</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={6}>
                        <FormControl
                          variant="outlined"
                          size="small"
                          className="w-100">
                          <InputLabel id="status-select-label">
                            Status
                          </InputLabel>
                          <Select
                            labelId="status-select-label"
                            id="status-select-label-id"
                            fullWidth
                            label="Status"
                            value={status}
                            onChange={handleStatus}>
                            <MenuItem value={0}>All statuses</MenuItem>
                            <MenuItem value={1}>Pending</MenuItem>
                            <MenuItem value={2}>Completed</MenuItem>
                            <MenuItem value={3}>Rejected</MenuItem>
                            <MenuItem value={4}>Processing</MenuItem>
                            <MenuItem value={5}>Cancelled</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="divider" />
                  <div className="p-3 text-center bg-secondary">
                    <Button className="btn-primary" size="small">
                      Filter results
                    </Button>
                  </div>
                  <div className="divider" />
                  <div className="p-3">
                    <Grid container spacing={6}>
                      <Grid item md={6}>
                        <List
                          component="div"
                          className="nav-neutral-danger flex-column p-0">
                          <ListItem
                            button
                            className="d-flex rounded-sm justify-content-center"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            <DeleteTwoToneIcon className="mr-2" />
                            <span>Cancel</span>
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item md={6}>
                        <List
                          component="div"
                          className="nav-neutral-success flex-column p-0">
                          <ListItem
                            button
                            className="d-flex rounded-sm justify-content-center"
                            href="#/"
                            onClick={(e) => e.preventDefault()}>
                            <SaveTwoToneIcon className="mr-2" />
                            <span>Save filter</span>
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Menu>
            </div>
            <div>
              <Button
                onClick={handleClick}
                variant="text"
                className="btn-outline-primary d-flex align-items-center justify-content-center d-40 p-0 rounded-pill">
                <SettingsTwoToneIcon className="w-50" />
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                classes={{ list: 'p-0' }}
                onClose={handleClose}>
                <div className="dropdown-menu-lg overflow-hidden p-0">
                  <div className="font-weight-bold px-4 pt-3">Results</div>
                  <List
                    component="div"
                    className="nav-neutral-first nav-pills-rounded flex-column p-2">
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <div className="mr-2">
                        <RadioButtonUncheckedTwoToneIcon />
                      </div>
                      <span className="font-size-md">
                        <b>10</b> results per page
                      </span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <div className="mr-2">
                        <RadioButtonUncheckedTwoToneIcon />
                      </div>
                      <span className="font-size-md">
                        <b>20</b> results per page
                      </span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <div className="mr-2">
                        <RadioButtonUncheckedTwoToneIcon />
                      </div>
                      <span className="font-size-md">
                        <b>30</b> results per page
                      </span>
                    </ListItem>
                  </List>
                  <div className="divider" />
                  <div className="font-weight-bold px-4 pt-4">Order</div>
                  <List
                    component="div"
                    className="nav-neutral-first nav-pills-rounded flex-column p-2">
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <div className="mr-2">
                        <ArrowUpwardTwoToneIcon />
                      </div>
                      <span className="font-size-md">Ascending</span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <div className="mr-2">
                        <ArrowDownwardTwoToneIcon />
                      </div>
                      <span className="font-size-md">Descending</span>
                    </ListItem>
                  </List>
                </div>
              </Menu>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="px-4 py-3">
          <div
            className={clsx(
              'search-wrapper search-wrapper--alternate search-wrapper--grow',
              { 'is-active': searchOpen }
            )}>
            <TextField
              variant="outlined"
              size="small"
              id="input-with-icon-textfield22-2"
              onFocus={openSearch}
              onBlur={closeSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
        <div className="divider" />
          <table className="table table-striped table-borderless text-nowrap mb-0">
              <thead className="bg-white font-size-sm text-uppercase">
              <tr>
                  <th className="bg-white text-left px-4">Company</th>
                  <th className="bg-white text-center">Messages</th>
                  <th className="bg-white text-center">Cost</th>
                  <th className="bg-white text-center">Invoice Total</th>
                  <th className="bg-white text-center">Profit</th>
                  <th className="bg-white text-center">Percent Profit</th>
                  <th className="bg-white text-right px-4">Status</th>
              </tr>
              </thead>
              {Object.keys(props.reports.data).map((key, index) => (
                  <tbody>
                  <tr key={index} onClick={() => handleExpandRow(index)}>
                      <td >
                          <div className="d-flex align-items-center">
                              <div>
                                  <div className="font-weight-bold">{props.reports.data[key][0].companyName}</div>
                                  <div className="opacity-7">{props.reports.data[key][props.reports.data[key].length-reportNum].startEnd}</div>
                              </div>
                          </div>
                      </td>
                      <td className="text-center">
                          <span>{props.reports.data[key][props.reports.data[key].length-reportNum].messageCount}</span>
                      </td>
                      <td className="text-center">
                          <span>{(props.reports.data[key][props.reports.data[key].length-reportNum].costTotal || 0).toFixed(2)}</span>
                      </td>
                      <td className="text-center">
                          <span>{(props.reports.data[key][props.reports.data[key].length-reportNum].total || 0).toFixed(2)}</span>
                      </td>
                      <td className="text-center">
                          <span>{(props.reports.data[key][props.reports.data[key].length-reportNum].profitTotal || 0).toFixed(2)}</span>
                      </td>
                      <td className="text-center">
                          <span>{(props.reports.data[key][props.reports.data[key].length-reportNum].profitPercent || 0).toFixed(2)}</span>
                      </td>
                      <td className="text-center">
                          <span>Processing</span>
                      </td>
                  </tr>
                  {expandedRows === index ? (
                      <tr>
                          <td colSpan="4" className="collaps-viewer">
                              {props.reports.data[key][props.reports.data[key].length-reportNum].lineItems ? (
                                  <table>
                                      <thead>
                                      <tr>
                                          <th>Item</th>
                                          <th>Count</th>
                                          <th>Cus Rate</th>
                                          <th>TW Rate</th>
                                          <th>Revenue</th>
                                          <th>Cost</th>
                                          <th>Gross</th>

                                          <th>AGR %</th>
                                      </tr>
                                      </thead>
                                      {props.reports.data[key][props.reports.data[key].length-reportNum].lineItems.map((item, index2) => (

                                          <tbody>
                                          <tr key={index} onClick={() => handleExpandRow(index)}>

                                              <td>{item.rateDisplayName}</td>
                                              <td>{item.count}</td>
                                              <td>{item.rate}</td>
                                              <td>{item.cost}</td>
                                              <td>${item.total.toFixed(5)}</td>
                                              <td>${(item.costTotal).toFixed(5)}</td>
                                              <td>${(item.total-item.costTotal).toFixed(5)}</td>
                                              <td>{item.total?(((item.total-item.costTotal)/item.total)*100).toFixed(2):0}%</td>

                                          </tr>

                                          </tbody>
                                      ))}
                                      <tbody>
                                        <tr >

                                            <td><b>Total</b></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><b>${_.sumBy(props.reports.data[key][props.reports.data[key].length-reportNum].lineItems, 'total').toFixed(2)}</b></td>
                                            <td><b>${_.sumBy(props.reports.data[key][props.reports.data[key].length-reportNum].lineItems, 'costTotal').toFixed(2)}</b></td>
                                            <td><b>${(_.sumBy(props.reports.data[key][props.reports.data[key].length-reportNum].lineItems, 'total')
                                                -_.sumBy(props.reports.data[key][props.reports.data[key].length-reportNum].lineItems, 'costTotal')).toFixed(2)}</b></td>
                                            <td><b>{(((_.sumBy(props.reports.data[key][props.reports.data[key].length-reportNum].lineItems, 'total')
                                            -_.sumBy(props.reports.data[key][props.reports.data[key].length-reportNum].lineItems, 'costTotal'))
                                                /(_.sumBy(props.reports.data[key][props.reports.data[key].length-reportNum].lineItems, 'total')))*100).toFixed(2)}%</b></td>

                                        </tr>

                                      </tbody>
                                  </table>
                              ) : (
                                  <div className="no-data"> No activity found! </div>

                              )}
                          </td>
                      </tr>
                  ) : null}
                  </tbody>
              ))}
          </table>
        <div className="card-footer p-4 d-flex justify-content-center">{/*
          <Pagination className="pagination-primary" count={10} />
        */}</div>

      </Card>
    </>
  );
}
