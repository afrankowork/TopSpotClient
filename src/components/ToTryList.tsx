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
        
        
        return this.state.data.map((rest: any, index: number) => {
            let restName = rest.restName;
            restName = restName.replace(/\s+/g,'-').toLowerCase();
            let restLink = `https://www.opentable.com/`
            console.log(restName);
            return(<div id='listIndv'>
                <br/>
                <h1>{index+1}. {rest.restName}</h1>
                <br/>
                <p className='boldText'>Address: {rest.address}</p>
                <br/>
                <p className='boldText'>Phone: {rest.phone}</p>
                <br/>
                <p className='boldText'>Hours: {rest.hours}</p>
                <br/>
                <a target="blank" href={restLink}>Book a Reservation</a>
                <br/>
                <br/>
                <p className='boldText'>Notes: {rest.notes}</p>
                <br/>
                <div id='buttonFlex'>
                <UpdateItem restID={rest.id} token={this.state.token} listDetails={this.listDetails}/>
                      
                <DeleteItem restID={rest.id} token={this.state.token} listDetails={this.listDetails} />
                </div>
                
            </div>)
        })
    }




    render(){

        if(this.props.token == null) {
            return(
                <div>
                    Must Be Signed In To Access This Feature
                </div>
            )
        }
        else {
        return(
            <div id='tryLaterContainer'>
                <h2 id='headerList'>Try Later List</h2>
                {this.listMapper()}
            </div>
        ) }}
       



}

export default ToTryList;