import React from 'react';

import clsx from 'clsx';

import { connect } from 'react-redux';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';

import HeaderUserbox from '../../layout-components/HeaderUserbox';
import HeaderSearch from '../../layout-components/HeaderSearch';
import HeaderWidget from '../../layout-components/HeaderWidget';
import {setReports, setUser} from '../../reducers/UserOptions';
import { Auth } from "aws-amplify/lib-esm/index";
import { API } from "aws-amplify/lib-esm/index";
import aws_exports from "../../aws-exports";
API.configure(aws_exports);
var userlookedup = false;



const Header = (props) => {

  const {
    headerShadow,
    headerBgTransparent,
    sidebarToggleMobile,
    setSidebarToggleMobile,
    user,
      reports
  } = props;

  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };


  return (
    <>
      <div
        className={clsx('app-header', {
          'app-header--shadow': headerShadow,
          'app-header--opacity-bg': headerBgTransparent
        })}>
        <div className="app-header--pane">
          <button
            className={clsx(
              'navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn',
              { 'is-active': sidebarToggleMobile }
            )}
            onClick={toggleSidebarMobile}>
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
          <HeaderSearch />
          <HeaderWidget />
        </div>
        <div className="app-header--pane">

          <HeaderUserbox />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerBgTransparent: state.ThemeOptions.headerBgTransparent,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
    user: state.UserOptions.user,
    reports: state.UserOptions.reports
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
    setUser: (user) => dispatch(setUser(user)),
    setReports: (reports) => dispatch(setReports(reports))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
