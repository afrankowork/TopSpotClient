import { render } from '@testing-library/react';
import React from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import Signup from './Signup';
import Login from './Login';
import logo from '../assets/logo.png'


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
        <>
        <div id='landContainer'>
            <div id='landHeader'>
                
                <img id='landImg' height='650px' width='650px' src={logo} alt=""/>
            </div>
           
            <div id='landForm'>
                {this.state.isLogin ? <Login updateToken={this.props.updateToken} toggleLogin={this.toggleLogin}/> : <Signup updateToken={this.props.updateToken} toggleLogin={this.toggleLogin}/>}
            </div>       
        </div>
        <footer id='sticky-footer'>
            <div id='landFooter'>
                <div id='firstPar'>
                    <h4>The Purpose</h4>
                    <p>-Top Spots is intended to form users of highly rated restaurants in their area or by search.
                        The hope is to prevent the debacle of not being able to choose a place to eat. Also, to help
                        travelers in a new location find a great spot!
                    </p>
                </div>
                <div id='secondPar'>
                    <h4>How to Use</h4>
                    <p>-Users are advised to make an account to gain full access to all the features. Once an account is created users are taken to a search screen. Here, a user will enter the name of a city to see the best spots there. If they want more details on a specific restaurant a link is provided also with the ability to save restaurants to try later, where notes can be added</p>
                </div>
                
            </div>
        </footer>
        </>
    )
}

}

export default Auth;
