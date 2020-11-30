import React from 'react';
import APIURL from '../../helpers/environment';
import {Button} from 'reactstrap';

type AcceptedProps = {
    id: string,
    token: string | null,
    locationDetails: Function
}

class DeleteComment extends React.Component<AcceptedProps>{
    constructor(props: AcceptedProps){
        super(props)
        this.deleteComment = this.deleteComment.bind(this);
    }

    async deleteComment(){
        let tokenInfo = this.props.token
        console.log(tokenInfo)
        let requestHeaders: any = {'Content-Type':'application/json',
        'Authorization' : tokenInfo}
        const restFind = await fetch(
            `${APIURL}/comment`,
            { method: 'DELETE', headers:  requestHeaders, body: JSON.stringify({id: this.props.id})}
          );
            
          
         
          this.props.locationDetails();
    }

    render(){
        return(
            <><Button id='delComm' onClick={this.deleteComment}>Delete</Button></>
            )
    }

}

export default DeleteComment;