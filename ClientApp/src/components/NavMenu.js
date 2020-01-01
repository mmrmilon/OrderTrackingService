import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    
    render() {
        console.log('Display Name: ' + this.displayName);
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/"><i className="fa fa-truck fa-flip-horizontal"></i>&nbsp;Order Tracking</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/" activeClassName="active">&nbsp;<i className="fa fa-home"></i>&nbsp;</NavLink>
                                </NavItem>
                                {/*<NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter" activeClassName="active">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data" activeClassName="active">Fetch data</NavLink>
                                </NavItem>
                                */}
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/syncdata" activeClassName="active">Sync Data</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/order" activeClassName="active">Order</NavLink>
                                </NavItem>
                                <LoginMenu>
                                </LoginMenu>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
