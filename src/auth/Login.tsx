import React from 'react';
import{Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../helpers/environment';
import {Redirect} from 'react-router-dom';


type UserState = {
    email: string,
    password: string,
    redirect: boolean,
    isError: boolean
   
}

type AcceptedProps = {
    updateToken: Function
    toggleLogin: Function
}


class Login extends React.Component<AcceptedProps, UserState>{
    constructor(props: AcceptedProps){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            redirect: false,
            isError: false
            
        }
    }

    handleSubmit(event: any) {
        event.preventDefault();
        this.setState({
            isError: false
        })
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({user: {email: this.state.email, password: this.state.password}}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        }).then((response) => response.json()).
        then((data) => {
            this.props.updateToken(data.sessionToken)
            
            data.sessionToken ? this.setState({
                redirect: true
            }) : this.setState({
                isError: true
            })})
            .catch((error) => {
                error ? 
                this.setState({
                    isError: true
                }) : console.log('nothing')
            })
            
    }

    
    
    
    render(){
        const {redirect} = this.state;

        if(redirect) {
            return <Redirect to='/restsearch' />
        }
        else {
        return(
            <div>
            <h1>Login</h1>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email: </Label>
                    <Input placeholder='Email' onChange={(e) => this.setState({email: e.target.value})} name='email' value={this.state.email} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password: </Label>
                    <Input placeholder='Password' onChange={(e) => this.setState({password: e.target.value})} name='password' value={this.state.password} type='password'/>
                </FormGroup>
                <Button type='submit'>Login</Button>
            </Form>
            <br/>
            <Button onClick={() => this.props.toggleLogin()}>Need to Sign Up? Click Here!</Button>
            {this.state.isError ? <p>Email or Password is incorrect. Try Again.</p> : <></>}
        </div>
        )
        }
    }

}

export default Login;