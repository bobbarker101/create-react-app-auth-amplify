import React, { useState } from 'react';

import clsx from 'clsx';

import { Collapse } from '@material-ui/core';

import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import AttachMoneyTwoTone from '@material-ui/icons/AttachMoneyTwoTone';
import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import SendTwoTone from '@material-ui/icons/SendTwoTone';

import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';

import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';

import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';
import ViewColumnTwoToneIcon from '@material-ui/icons/ViewColumnTwoTone';
import AccountBalanceTwoToneIcon from '@material-ui/icons/AccountBalanceTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import AttachMoneyTwoToneIcon from '@material-ui/icons/AttachMoneyTwoTone';
import FilterListTwoToneIcon from '@material-ui/icons/FilterListTwoTone';

import { SidebarWidget } from '../../layout-components';

const SidebarMenu = (props) => {
  const { setSidebarToggleMobile } = props;

  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  const [pagesOpen, setPagesOpen] = useState(false);
  const togglePages = (event) => {
    setPagesOpen(!pagesOpen);
    event.preventDefault();
  };

  return (
    <>
      <PerfectScrollbar>
        <div className="sidebar-navigation">
          <SidebarWidget />
          <div className="sidebar-header">
            <span>Navigation</span>
          </div>
          <ul>
            <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple"
                to="/Overview">
                <span className="sidebar-icon">
                  <AccountBalanceTwoToneIcon />
                </span>
                Overview
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoToneIcon />
                </span>
              </NavLink>
            </li>
              <li>
                  <NavLink
                      onClick={toggleSidebarMobile}
                      activeClassName="active"
                      className="nav-link-simple"
                      to="/Reports">
                <span className="sidebar-icon">
                  <TrendingUpTwoToneIcon />
                </span>
                      Reports
                      <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoToneIcon />
                </span>
                  </NavLink>
              </li>
            <li>
              <NavLink
                onClick={toggleSidebarMobile}
                activeClassName="active"
                className="nav-link-simple"
                to="/Keywords">
                <span className="sidebar-icon">
                  <VerifiedUserTwoToneIcon />
                </span>
                Keywords
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoToneIcon />
                </span>
              </NavLink>
            </li>
              <li>
                  <NavLink
                      onClick={toggleSidebarMobile}
                      activeClassName="active"
                      className="nav-link-simple"
                      to="/Senders">
                <span className="sidebar-icon">
                  <SendTwoTone />
                </span>
                      Senders
                      <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoToneIcon />
                </span>
                  </NavLink>
              </li>
              <li>
                  <NavLink
                      onClick={toggleSidebarMobile}
                      activeClassName="active"
                      className="nav-link-simple"
                      to="/Rates">
                <span className="sidebar-icon">
                  <AttachMoneyTwoTone />
                </span>
                      Rates
                      <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoToneIcon />
                </span>
                  </NavLink>
              </li>
          </ul>
          <div className="sidebar-header">
            <span>Others</span>
          </div>

        </div>
      </PerfectScrollbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
