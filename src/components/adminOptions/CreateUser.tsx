import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, Label, Input} from 'reactstrap'
import APIURL from '../../helpers/environment'

type CreateState = {
    modal: boolean
    username: string
    email: string
    password: string
}

type AcceptedProps = {
    getUsers: Function
}

class CreateUser extends React.Component<AcceptedProps, CreateState>{
    constructor(props: AcceptedProps){
        super(props)
        this.registerUser = this.registerUser.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false,
            username: '',
            email: '',
            password: ''
        }
    }

    async registerUser(){
        const createUser = await fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({user: {email: this.state.email, username: this.state.username, password: this.state.password}}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        })
        this.setState({
            modal: !this.state.modal
        })
        this.props.getUsers();
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        })
    }

    render(){
        return(
            <>
            <Button id='editLine' onClick={this.toggle}>Create a User</Button>
            <Modal isOpen={this.state.modal}>
            <ModalBody>
                        <Label>Enter a Username</Label>
                        <Input placeholder="Username" onChange={(e) => this.setState({username: e.target.value})} name="notes" value={this.state.username}></Input>
                        <br/>
                        <Label>Enter an Email</Label>
                        <Input  placeholder="wow@gmail.com"  onChange={(e) => this.setState({email: e.target.value})} value={this.state.email}></Input>
                        <Label>Enter a Password</Label>
                        <Input  placeholder="password"  onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}></Input>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.registerUser}>Save User </Button> <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
            </Modal>
            </>
        )
    }
}

export default CreateUser;