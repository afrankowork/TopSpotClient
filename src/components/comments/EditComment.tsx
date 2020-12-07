import React from 'react';
import {Modal, ModalBody, Label, ModalFooter, Input, Button} from 'reactstrap';
import APIURL from '../../helpers/environment';

type EditState = {
    modal: boolean
    comment: string
    starRating: string
} 


type AcceptedProps = {
    id: string,
    comment: string,
    token: string | null,
    locationDetails: Function,
    star: number
}

class EditComment extends React.Component<AcceptedProps, EditState>{

    constructor(props:AcceptedProps){
        super(props)
        this.toggle = this.toggle.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.state = {
            modal: false,
            comment: '',
            starRating: ''
        }
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        })
    }

    async updateComment(){
        let tokenInfo = this.props.token
        console.log(tokenInfo)
        let requestHeaders: any = {'Content-Type':'application/json',
        'Authorization' : tokenInfo}
        const restFind = await fetch(
            `${APIURL}/comment`,
            { method: 'PUT', headers:  requestHeaders, body: JSON.stringify({comment: this.state.comment, id: this.props.id, starRating: this.state.starRating})}
          );
            
          const data = await restFind.json();
          console.log(data)
          this.setState({
              modal: !this.state.modal
          })
          this.props.locationDetails();
    }
    
    
    
    
    render(){
        return(
            <>
            <Button id='editLine' onClick={this.toggle}>Edit</Button>
            <Modal isOpen={this.state.modal}>
            <ModalBody>
                        <Label htmlFor="notes">Add/Update Notes</Label>
                    <Input placeholder={this.props.comment} onChange={(e) => this.setState({comment: e.target.value})} name="notes" value={this.state.comment}>{this.props.comment}</Input>
                        <br/>
                        <Label htmlFor="notes">Add/Update Star Rating</Label>
                        <Input  placeholder={this.props.star.toString()} type="number" min="0" max="5" onChange={(e) => this.setState({starRating: e.target.value})} value={this.state.starRating}>{this.props.star}</Input>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.updateComment}>Save Changes </Button> <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
            </Modal>
            </>
        )
    }
}

export default EditComment;