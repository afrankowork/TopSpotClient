import React from 'react';
import {Modal, ModalFooter, ModalHeader, Label, ModalBody, Button, Input} from 'reactstrap';
import APIURL from '../helpers/environment'

type UpdateState = {

    notes: string
    modal: boolean
    

}

type AcceptedProps =  {
    restID: string,
    token: string | null,
    listDetails: Function
}


class UpdateItem extends React.Component<AcceptedProps, UpdateState>{
    constructor(props: AcceptedProps){
        super(props)
        this.toggle = this.toggle.bind(this)
        this.updateNotes = this.updateNotes.bind(this);
        this.state = {
            notes: '',
            modal: false,
            
        }
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        })
    }


    async updateNotes(){
        
        let tokenInfo = this.props.token
        console.log(tokenInfo)
        let requestHeaders: any = {'Content-Type':'application/json',
        'Authorization' : tokenInfo}
        const restFind = await fetch(
            `${APIURL}/rest`,
            { method: 'PUT', headers:  requestHeaders, body: JSON.stringify({notes: this.state.notes, id: this.props.restID})}
          );
            
          const data = await restFind.json();
          console.log(data)
          this.setState({
              modal: !this.state.modal
          })
         this.props.listDetails();
    }

    render(){
        return(
            <>
            <Button onClick={this.toggle}>Update</Button>
            <Modal isOpen={this.state.modal}>
                    <ModalHeader>Update Info</ModalHeader>
                    <ModalBody>
                        <Label htmlFor="notes">Add Notes</Label>
                        <Input onChange={(e) => this.setState({notes: e.target.value})} name="notes" value={this.state.notes}></Input>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.updateNotes}>Save Changes </Button> <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                </>
        )
    }

}

export default UpdateItem;