import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavbarText,
    
  } from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router, 
    Route, Link, Switch
} from 'react-router-dom';

import Auth from '../auth/Auth';
import RestSearch from'./RestSearch';
import RestDetail from './RestDetail';
import ToTryList from './ToTryList';
import NameSearch from './NameSearch';
import '../App.css';


type OpenState = {
    isOpen: boolean;
}

type AcceptedProps = {
    updateToken: Function;
    deleteToken: Function;
}



class SiteBar extends React.Component<AcceptedProps, OpenState> {
    
    constructor(props: AcceptedProps) {
        super(props)
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this); //Figure out what the bind does
        this.state = {
            isOpen: false
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    delete() {
        this.props.deleteToken()
    }

    
    render() {
        return(
            <div>
                <Router>
            <Navbar id="navbarStyle" expand="md">
            <NavbarBrand href="/">Home</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                <NavLink href="/restsearch">Top Rated Spots!</NavLink>
                <NavLink href="/namesearch">Search By Name!</NavLink>
                <NavLink href="/totrylist">Try Later!</NavLink>
            </Nav>
            {localStorage.getItem('token') ?
            <NavbarText>
                <a href="/" onClick={this.delete}>Logout</a>
            </NavbarText> : <> </>} 
        </Collapse>
      </Navbar>
      <Switch>
            <Route exact path='/'>
                <Auth updateToken={this.props.updateToken} />
            </Route>
            <Route exact path='/restsearch'>
                <RestSearch />
            </Route>
            {/* Route for more details page to display comments */}
            <Route exact path='/restsearch/:id' component={RestDetail}/>

            <Route exact path='/totrylist'>
                <ToTryList token={localStorage.getItem('token')}/>
            </Route>

            <Route exact path='/namesearch'>
                <NameSearch />
            </Route>

            
                
            

        </Switch>
            </Router>
      </div>
        )
    }


}

export default SiteBar;