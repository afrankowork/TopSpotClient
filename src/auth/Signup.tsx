import React from 'react';
import{Form, FormGroup, Label, Input, Button} from 'reactstrap';

type UserState = {
    username: string;
    email: string;
    password: string;
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
        }
    }

    handleSubmit(event: any)  {
        event.preventDefault();
        fetch('http://localhost:3000/user/register', {
            method: 'POST',
            body: JSON.stringify({user: {email: this.state.email, username: this.state.username, password: this.state.password}}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        }).then((response) => response.json()).
        then((data) => {
            this.props.updateToken(data.sessionToken)})
    
    }

    




    render(){
        return(
            <div>
            <h1>Signup</h1>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e) => this.setState({email: e.target.value})} name='email' value={this.state.email} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => this.setState({username: e.target.value})} name='username' value={this.state.username} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => this.setState({password: e.target.value})} name='password' value={this.state.password} type='password'/>
                </FormGroup>
                <Button type='submit'>Signup</Button>
            </Form>
            <br/>
            <Button onClick={() =>this.props.toggleLogin()}>Already Signed Up? Click Here!</Button> 

        </div>
        )
    }


}

export default Signup;