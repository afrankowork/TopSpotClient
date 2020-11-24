import React from 'react';
import {Modal, ModalBody, Label, ModalFooter, Input, Button} from 'reactstrap';
import APIURL from '../../helpers/environment';

type EditState = {
    modal: boolean
    comment: string
} 


type AcceptedProps = {
    id: string,
    comment: string,
    token: string | null,
    locationDetails: Function
}

class EditComment extends React.Component<AcceptedProps, EditState>{

    constructor(props:AcceptedProps){
        super(props)
        this.toggle = this.toggle.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.state = {
            modal: false,
            comment: ''
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
            { method: 'PUT', headers:  requestHeaders, body: JSON.stringify({comment: this.state.comment, id: this.props.id})}
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
            <p onClick={this.toggle}>Edit</p>
            <Modal isOpen={this.state.modal}>
            <ModalBody>
                        <Label htmlFor="notes">Add Notes</Label>
                        <Input onChange={(e) => this.setState({comment: e.target.value})} name="notes" value={this.state.comment}></Input>
                        
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