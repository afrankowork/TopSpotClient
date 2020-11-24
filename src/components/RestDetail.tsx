import React, { Props } from 'react';
import { Container, Row, Col, FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import food from '../assets/food.svg';
import EditComment from './comments/EditComment'
import APIURL from '../helpers/environment'

type DetailState = {
    show: boolean
    comm: string
    data: any
    id: number
    rating: string
    token: string | null
    comments: Array<any>
    showComm: boolean
    
    
}

type AcceptedProps = {
    
}

interface IData {

    name?: string
}





class RestDetail extends React.Component<AcceptedProps, DetailState>{

    constructor(props: any) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.toggleTwo = this.toggleTwo.bind(this);
        this.submitComm = this.submitComm.bind(this);
        this.sendRest = this.sendRest.bind(this);
        this.locationDetails = this.locationDetails.bind(this);
        this.state = {
            show: false,
            comm: '',
            data: {},
            id: props.match.params.id,
            rating: '',
            token: localStorage.getItem('token'),
            comments: [],
            showComm: false
            
        }
    }

    async locationDetails(){
        let apiKey = "32208e8bf1facf3f6ee15d286125735f";
        
        const restFind = await fetch(
            `https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.state.id}`,
            { headers: { "user-key": apiKey, Accept: "application/json" } }
          );
        
          const data = await restFind.json();
          this.setState({data: data})
          console.log(this.state.data)

          let requestHeaders: any = {'Content-Type':'application/json',
        'Authorization' : this.state.token}
        const commentFind = await fetch(
            `${APIURL}/comment/getComm/${this.state.id}`,
            {method: 'GET',
           
            headers: requestHeaders }
          );
        
          const info = await commentFind.json();
          this.setState({comments: info.comments})
          console.log(this.state.comments)


    
    }

    

    toggle(){
        this.setState({
            show: !this.state.show
        })
    }

    toggleTwo(){
        this.setState({
            showComm: !this.state.showComm
        })
    }

    addComm() {
       
        console.log(this.state.token)
        let requestHeaders: any = {'Content-Type':'application/json',
        'Authorization' : this.state.token}

        fetch(`${APIURL}/comment`, {
            method: 'POST',
            body: JSON.stringify({comment: this.state.comm, restaurantID: this.state.id, starRating: this.state.rating}),
            headers: requestHeaders
        }).then((response) => response.json()).
        then((data) => {
            console.log(data)
        })
        this.locationDetails();
    }

    sendRest(){
        console.log(this.state.data.name)
        let requestHeaders1: any = {'Content-Type':'application/json',
        'Authorization' : this.state.token}

        fetch(`${APIURL}/rest`, {
            method: 'POST',
            body: JSON.stringify({restName: this.state.data.name, address: this.state.data.location.address, visited: false}),
            headers: requestHeaders1
        }).then((response) => response.json()).
        then((data) => {
            console.log(data)
        })

    }

    submitComm(){
        
        localStorage.getItem('token') ? 
            this.addComm()  
        : alert('Please Signin to Leave a Comment')
    }



    commentMapper(){
        console.log(this.state.comments)
        // console.log(this.state.comments[0].comment)
        if(this.state.comments.length != 0) {
        return this.state.comments.map((info: any) => {
            return(
                <>
            <p>{info.username}: {info.comment}</p>
            <p>Star Rating: {info.starRating}</p>
            <EditComment id={info.id} comment={info.comment} token={localStorage.getItem('token')} locationDetails={this.locationDetails}/>
            </>
        )})}
        else {
            return (
                <div>No Comments</div>
            )
        }
    }
          
    componentDidMount(){
        this.locationDetails();
        
    }


    render(){
        return(
            <div>
                <h1>{this.state.data.name}</h1>
                <Container>
           <Row>
               <Col sm="6">
                   <img src={food} alt="" height="250px" width="250px"/>
               </Col>
               <Col sm="6">
                    <p>Type: {this.state.data.cuisines}</p>
                    <p>Hours: {this.state.data.timings}</p>
                    <p>Phone: {this.state.data.phone_numbers}</p>
                    <p>Date Night Cost: ${this.state.data.average_cost_for_two}</p>
                    <Button onClick={this.sendRest}>Try Later</Button>
               </Col>
           </Row>
           <Col>
           <h3>Comments</h3>
           <Button onClick={this.toggle}><FontAwesomeIcon icon={faPlusSquare} size="3x" /></Button>
           {this.state.show ? <Form>
                    <FormGroup>
                        <Label htmlFor="name">Add a Comment!</Label>
                        <Input onChange={(e) => this.setState({comm: e.target.value})} id="name" value={this.state.comm}/>
                        
                        <br/>
                        <Label htmlFor="rating">Leave a Star Rating 0-5</Label>
                        <Input type="number" max="5" min="0" onChange={(e) => this.setState({rating: e.target.value})}></Input>
                        <Button onClick={this.submitComm}>Submit Comment!</Button>
                    </FormGroup>
                </Form> : <div></div>}
                </Col>
                <br/>
                <Button onClick={this.toggleTwo}>
                    {this.state.showComm ? <p>Hide Comments</p> : <p>Show Comments</p>}</Button>
                <div>
                {this.state.showComm ? <div>{this.commentMapper()}</div>: <></>}
                </div>
                </Container>
                
            </div>
        )
    }

}

export default RestDetail;