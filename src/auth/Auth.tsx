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
        
            <Container className='authContainer'>
            <Row>
                <Col id='colOne'>
                <h1 id="headerIntro">Top Spots</h1>
                
                </Col>
                <Col id='colTwo'>
                    <p id='introText'>
                        Top Spots allows users to narrow down a place to eat by looking at the best user rated restaurants in their area.
                        Click <i>Top Rated Spots</i> above and find the best restaurants near you! To gain access to all the features make an account over to the right!
                    </p>
                </Col>
                <Col  id='colThree'>
                    {this.state.isLogin ? <Login updateToken={this.props.updateToken} toggleLogin={this.toggleLogin}/> : <Signup updateToken={this.props.updateToken} toggleLogin={this.toggleLogin}/>}
                </Col>       
            </Row>
            </Container>
        
    )
}

}

export default Auth;
