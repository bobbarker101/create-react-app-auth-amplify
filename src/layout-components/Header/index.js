import React from 'react';

import clsx from 'clsx';
import { Auth } from 'aws-amplify';

import { connect, useSelector } from 'react-redux';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';

import HeaderUserbox from '../../layout-components/HeaderUserbox';
import HeaderSearch from '../../layout-components/HeaderSearch';
import HeaderWidget from '../../layout-components/HeaderWidget';

const Header = (props) => {
    const { reports } = useSelector(state => state.UserOptions);
  const {
    headerShadow,
    headerBgTransparent,
    sidebarToggleMobile,
    setSidebarToggleMobile
  } = props;
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
   // console.log('reports')
//console.log(reports)
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
            {/*
          <HeaderSearch />
          */}
            {reports.data &&

            <HeaderWidget reports={reports}/>
            }
        </div>
        <div className="app-header--pane">
          <button onClick={Auth.signOut()}>
            Logout
          </button>
            {/*
          <HeaderUserbox />
          */}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerBgTransparent: state.ThemeOptions.headerBgTransparent,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
