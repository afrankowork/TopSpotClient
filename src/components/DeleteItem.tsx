import React from 'react';
import {Button} from 'reactstrap';
import APIURL from '../helpers/environment';

type AcceptedProps = {
    restID: string, 
    token: string | null
    listDetails: Function
}

class DeleteItem extends React.Component<AcceptedProps>{
    constructor(props: AcceptedProps){
        super(props)
        this.deleteItem = this.deleteItem.bind(this);
    }

   deleteItem(){
        let requestHeaders: any = {'Content-Type':'application/json',
        'Authorization' : this.props.token}
        fetch(
            `${APIURL}/rest/${this.props.restID}`,
            { method: 'DELETE', headers:  requestHeaders,}
          );

            this.props.listDetails();
    }

    render(){
        return(
            <div>
                <Button id='btnDelete' onClick={this.deleteItem}>Delete</Button>
            </div>
        )
    }

}

export default DeleteItem