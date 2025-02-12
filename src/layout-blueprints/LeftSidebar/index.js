import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Sidebar, Header, Footer } from '../../layout-components';
import { Auth } from 'aws-amplify';
import { setUser } from '../../reducers/UserOptions';
import aws_exports from '../../aws-exports';
import {API} from "aws-amplify/lib-esm/index";
import {setSidebarToggleMobile} from "../../reducers/ThemeOptions";
API.configure(aws_exports);
var userlookedup = false;
const LeftSidebar = (props) => {

  const {
    children,
    sidebarToggle,
    sidebarToggleMobile,
    sidebarFixed,
    headerFixed,
    headerSearchHover,
    headerDrawerToggle,
    footerFixed,
    contentBackground,
  } = props;

  return (
    <>
      <div
        className={clsx('app-wrapper', contentBackground, {
          'header-drawer-open': headerDrawerToggle,
          'app-sidebar-collapsed': sidebarToggle,
          'app-sidebar-mobile-open': sidebarToggleMobile,
          'app-sidebar-fixed': sidebarFixed,
          'app-header-fixed': headerFixed,
          'app-footer-fixed': footerFixed,
          'search-wrapper-open': headerSearchHover
        })}>
        <div>
          <Sidebar />
        </div>
        <div className="app-main">
          <Header />
          <div className="app-content">
            <div className="app-content--inner">
              <div className="app-content--inner__wrapper">{children}</div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

LeftSidebar.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = (state) => {

    return ({
        sidebarToggle: state.ThemeOptions.sidebarToggle,
        sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
        sidebarFixed: state.ThemeOptions.sidebarFixed,
        headerFixed: state.ThemeOptions.headerFixed,
        headerSearchHover: state.ThemeOptions.headerSearchHover,
        headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,

        footerFixed: state.ThemeOptions.footerFixed,

        contentBackground: state.ThemeOptions.contentBackground,
        user: state.UserOptions.user
    })
}
const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
