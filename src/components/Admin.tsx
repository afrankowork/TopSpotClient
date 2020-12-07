import React from 'react';
import APIURL from '../helpers/environment';
import {Table,Button} from 'reactstrap';
import DeleteUser from './adminOptions/DeleteUser';
import CreateUser from './adminOptions/CreateUser';

type AdminState = {
    users: Array<any>
    comments: Array<any>
}

type AcceptedProps = {

}


class Admin extends React.Component<AcceptedProps, AdminState>{
    constructor(props: AcceptedProps){
        super(props)
        this.getUsers = this.getUsers.bind(this)
        this.state = {
            users: [],
            comments: []
        }
    }


    async getUsers(){
        this.setState({users: []})
        let requestHeaders: any = {'Content-Type':'application/json'}
        const userFind = await fetch(
            `${APIURL}/user/getusers/`,
            {method: 'GET',
            headers: requestHeaders }
          );
        
          const info = await userFind.json();
          this.setState({users: info.users})
          console.log(this.state.users)
        }

          

    userMapper(){
      return this.state.users.map((user: any) => {
          return (
              <tr>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                  <DeleteUser id={user.id} getUsers={this.getUsers}/>
                  </td>
              </tr>
          )
      })
    }

   

    componentDidMount() {
        this.getUsers()
    }



    render(){
        return(
            <div>
                 <br/>
                <br/>
                <h3 id='adminHeader'>List of All Users</h3>
                <CreateUser getUsers={this.getUsers}/>
                <Table id='adminTable'>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>User Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userMapper()}
                    </tbody>
                </Table>
                <br/>
                <br/>
            
            </div>
        )
    }


}

export default Admin;