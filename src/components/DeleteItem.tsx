import React from 'react';
import {Button} from 'reactstrap';


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
            `http://localhost:3000/rest/${this.props.restID}`,
            { method: 'DELETE', headers:  requestHeaders,}
          );

            this.props.listDetails();
    }

    render(){
        return(
            <div>
                <Button onClick={this.deleteItem}>Delete</Button>
            </div>
        )
    }

}

export default DeleteItem