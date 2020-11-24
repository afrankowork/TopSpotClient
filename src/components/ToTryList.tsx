import React from 'react';
import {Button, Modal, ModalBody, ModalHeader, Input, ModalFooter, Label} from 'reactstrap'
import UpdateItem from './UpdateItem';
import DeleteItem from './DeleteItem';
import APIURL from '../helpers/environment';

type ListState = {
    token: string | null
    data: Array<any>
    modal: boolean
    notes: string
    
  
}

type AcceptedProps = {
    token: string | null
}


class ToTryList extends React.Component<AcceptedProps, ListState>{

    constructor(props: AcceptedProps){
        super(props)
        
        this.listDetails = this.listDetails.bind(this)
        this.state = {
            data: [],
            modal: false,
            notes: '',
            token: localStorage.getItem('token')
            
           
        }
    }

    async listDetails(){
        
        let requestHeaders: any = {'Content-Type':'application/json',
        'Authorization' : localStorage.getItem('token')}
        const restFind = await fetch(
            `${APIURL}/rest`,
            {method: 'GET',
            headers: requestHeaders }
          );

        const restdata = await restFind.json();
        if(restdata != null) {
        this.setState({
            data: restdata.list
        })} else {
            console.log('cha chang')
        }
        
    }

    componentDidMount(){
        this.listDetails();
    }

    


    listMapper() {
        
        
        return this.state.data.map((rest: any) => {
            
            return(<div>
                <br/>
                <h1>Name: {rest.restName}</h1>
                <p>Address: {rest.address}</p>
                <p>Visited: {rest.visited}</p>
                <p>Notes: {rest.notes}</p>
                <UpdateItem restID={rest.id} token={this.state.token} listDetails={this.listDetails}/> 
                <DeleteItem restID={rest.id} token={this.state.token} listDetails={this.listDetails} />
                
                
            </div>)
        })
    }




    render(){
        return(
            <div>
                {this.listMapper()}
            </div>
        )
    }



}

export default ToTryList;