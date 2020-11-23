import { render } from '@testing-library/react';
import React from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import Signup from './Signup';
import Login from './Login';

type LoginState = {
    isLogin: boolean;
}

type AcceptedProps = {
    updateToken: Function;
    
    
}

class Auth extends React.Component<AcceptedProps,LoginState> {

    constructor(props: AcceptedProps){
        super(props)
        this.toggleLogin = this.toggleLogin.bind(this);
        this.state = {
            isLogin: true
        }
    }

    toggleLogin(){
        this.setState({
            isLogin: !this.state.isLogin
        })
    }


render(){
    return(
        <div>
            <Container className='authContainer'>
            <Row>
                <Col md='4'>
                <h1>Top Spots</h1>
                </Col>
                <Col md='4'>
                    <p>
                        Top Spots is meant to answer the question of Where are we eating tonight? 
                        I have spent too long on trying to decide where to eat and find a place that suits
                        everyone. Top Spots is meant to show users the top restaurants in their area or if they
                        are traveling to then show them options in the city they will be heading to. Below we have a
                        button that allows us to grab your geolocation to display the top 10 restaurants near you. If not
                        all good you can search for restaurants and provide a location
                    </p>
                    
              
                </Col>
                <Col md='4'>
                    {this.state.isLogin ? <Login updateToken={this.props.updateToken} toggleLogin={this.toggleLogin}/> : <Signup updateToken={this.props.updateToken} toggleLogin={this.toggleLogin}/>}
                </Col>       
            </Row>
            </Container>
        </div>
    )
}

}

export default Auth;
