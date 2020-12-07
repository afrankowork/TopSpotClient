import React from 'react';
import APIURL from '../../helpers/environment';
import {Button} from 'reactstrap';

type AcceptedProps = {
    id: string,
    getUsers: Function
}

class DeleteUser extends React.Component<AcceptedProps>{
    constructor(props: AcceptedProps){
        super(props)
        this.deleteUser = this.deleteUser.bind(this);
    }

    async deleteUser(){
        
        let requestHeaders: any = {'Content-Type':'application/json'}
        const restFind = await fetch(
            `${APIURL}/user/deluser`,
            { method: 'DELETE', headers:  requestHeaders, body: JSON.stringify({id: this.props.id})}
          );
            
          
         
          this.props.getUsers();
    }

    render(){
        return(
            <><Button color="danger" id='delUser' onClick={this.deleteUser}>Delete</Button></>
            )
    }

}

export default DeleteUser;
