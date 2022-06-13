import React from 'react';

import clsx from 'clsx';
import { Auth } from 'aws-amplify';

import { connect, useSelector } from 'react-redux';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import projectLogo from '../../assets/images/MobileHelmsvn.png';//react.svg';
import logo2 from '../../assets/images/cobrand2.png';
import { NavLink } from 'react-router-dom';

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

  const signOut = () => {
    Auth.signOut()
      .then(data => window.location.reload())
      .catch(err => console.log(err));
  }
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

            {reports.data
                ?
                  <HeaderWidget reports={reports}/>

                :
                <div style={{boxShadow: 'none'}}className="app-sidebar-logo--icon">

                    <img
                        alt="MobileHelm"
                        src={projectLogo}
                    />
                    <h5 style={{marginLeft: '10px', marginTop: '10px'}}>Loading...</h5>
                </div>
            }
        </div>
        <div className="app-header--pane">
          <button  onClick={signOut}>
            Logout
          </button>
            {/*
            <NavLink
                to="/"
                onClick={(e) => Auth.signOut().catch(err => console.log(err))}
                title="Home"
                className="app-sidebar-logo">
                <div className="app-sidebar-logo--icon">
                    <img
                        alt="MobileHelm"
                        src={projectLogo}
                    />
                </div>
                <div className="app-sidebar-logo--text">
                    <img
                        alt="Txtwire Mobilehelm"
                        src={logo2}
                        style={{ maxWidth: 200 }}
                    />
                </div>
            </NavLink>

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
