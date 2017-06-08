
import { LinkContainer } from 'react-router-bootstrap'
import React, { PropTypes } from 'react'
import AboutDlg from 'Dialogs/AboutDlg'
import './AppNavbar.scss'

import {
  DropdownButton,
  NavDropdown,
  MenuItem,
  NavItem,
  Navbar,
  Button,
  Modal,
  Nav
  } from 'react-bootstrap'

export default class AppNavbar extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  state = {
    aboutOpen: false
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  openAboutDlg () {

    this.setState(Object.assign({}, this.state, {
      aboutOpen: true
    }))
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    const { appState } = this.props;

    return (

      <Navbar className="forge-navbar" staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <NavItem className="forge-brand-item">
              <img height="30" src="/resources/img/banner.png"/>
            </NavItem>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>

          {
            appState.navbar.links.home &&

            <Nav>
              <LinkContainer to={{ pathname: '/', query: { } }}>
                <NavItem eventKey="home">
                  &nbsp; Home
                </NavItem>
              </LinkContainer>

              <LinkContainer to={{ pathname: '/posts'}}>
                <NavItem eventKey="posts">
                &nbsp; Posts
                </NavItem>
              </LinkContainer>
            </Nav>
          }

          <Nav pullRight>

            {
              appState.navbar.links.about &&

              <LinkContainer to={{ pathname: '/about'}}>
                <NavItem eventKey="about">
                  About ...
                </NavItem>
              </LinkContainer>
            }
          </Nav>

        </Navbar.Collapse>

        <AboutDlg
          close={()=>{ this.setState(Object.assign({}, this.state, {
            aboutOpen: false
          }))}}
          open={this.state.aboutOpen}
        />

      </Navbar>
    )
  }
}