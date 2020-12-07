import React from 'react';
import{Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import APIURL from '../helpers/environment'
import {Redirect} from 'react-router-dom';
type UserState = {
    username: string;
    email: string;
    password: string;
    redirect: boolean;
    
}

type AcceptedProps = {
    updateToken:  Function
    toggleLogin: Function
}


class Signup extends React.Component<AcceptedProps, UserState> {
    constructor(props: AcceptedProps) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            username: '',
            password: '',
            email: '',
            redirect: false
           
        }
    }

    handleSubmit(event: any)  {
        event.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({user: {email: this.state.email, username: this.state.username, password: this.state.password}}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        }).then((response) => response.json()).
        then((data) => {
            this.props.updateToken(data.sessionToken)
            data.sessionToken ? this.setState({
                redirect: true
            }): this.setState({
                redirect: false
            })})
            
        }

    




    render(){
        const {redirect} = this.state;

        if(redirect) {
            return <Redirect to='/restsearch'/>
        }
        else{
        return(
            <div>
            <h1>Signup</h1>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input placeholder="email@email.com"onChange={(e) => this.setState({email: e.target.value})} name='email' value={this.state.email} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input placeholder="Username" onChange={(e) => this.setState({username: e.target.value})} name='username' value={this.state.username} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input placeholder="Password" onChange={(e) => this.setState({password: e.target.value})} name='password' value={this.state.password} type='password'/>
                </FormGroup>
                <Button type='submit'>Signup</Button>
            </Form>
            <br/>
            <Button onClick={() =>this.props.toggleLogin()}>Already Signed Up? Click Here!</Button> 

        </div>
        )
        }
    }


}

export default Signup;