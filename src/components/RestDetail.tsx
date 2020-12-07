import React, { Props } from 'react';
import { Container, Row, Col, FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import food from '../assets/food.svg';
import EditComment from './comments/EditComment'
import DeleteComment from './comments/DeleteComment'
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
            data: null,
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
          console.log(this.state.id)


    
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
        this.toggle();
        this.toggleTwo();
    }

    sendRest(){
        console.log(this.state.data.name)
        let requestHeaders1: any = {'Content-Type':'application/json',
        'Authorization' : this.state.token}

        fetch(`${APIURL}/rest`, {
            method: 'POST',
            body: JSON.stringify({restName: this.state.data.name, address: this.state.data.location.address, phone: this.state.data.phone_numbers, hours: this.state.data.timings}),
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
        
        if(this.state.comments == undefined) {
            return <div>Must Be Signed In Too See Comments </div>
        }
        else if(this.state.comments.length > 0) {
        return this.state.comments.map((info: any) => {
            
            // setting the time format for Posted
            let time = info.createdAt;
            let usDate = new Date(time);
            let readDate = usDate.toLocaleString("en-US");
            
            // setting the time format for Updated
            let updateTime = info.updatedAt;
            let usUpdate = new Date(updateTime);
            let updateDate = usUpdate.toLocaleString("en-US")
            

            console.log(readDate);
            console.log(updateTime);
            
            
            return(
                <>
                <br/>
            <p>Username: {info.username} </p>
            <p>Comment: {info.comment}</p>
            <p>Star Rating: {info.starRating > 4 ? <> <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/>
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/></>:
            info.starRating > 3 ? <>
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/>
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> 
            <FontAwesomeIcon icon={faStar} size="1x" style={{color:'white'}}/> </> :
            info.starRating > 2 ? <>
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/>
            <FontAwesomeIcon icon={faStar} size="1x" style={{color:'white'}}/>
            <FontAwesomeIcon icon={faStar} size="1x" style={{color:'white'}}/> </> :
            info.starRating > 1 ? <>
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'white'}}/>
            <FontAwesomeIcon icon={faStar} size="1x" style={{color:'white'}}/>
            <FontAwesomeIcon icon={faStar} size="1x" style={{color:'white'}}/> </> :
            info.starRating > 0 ? <>
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'orange'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'white'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'white'}}/>
            <FontAwesomeIcon icon={faStar} size="1x" style={{color:'white'}}/>
            <FontAwesomeIcon icon={faStar} size="1x" style={{color:'white'}}/>
            </> :
            // If star rating is 0
            <>
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'white'}}/> 
            <FontAwesomeIcon  icon={faStar} size="1x" style={{color: 'white'}}/>
            <FontAwesomeIcon icon={faStar} size="1x" style={{color:'white'}}/>
            <FontAwesomeIcon icon={faStar} size="1x" style={{color:'white'}}/>
            <FontAwesomeIcon icon={faStar} size="1x" style={{color:'white'}}/></>}</p>
            <p>Posted on: {readDate}</p>
            {time == updateTime ? <></> : <p>Updated At: {updateDate}</p>}
            <EditComment id={info.id} comment={info.comment} token={localStorage.getItem('token')} locationDetails={this.locationDetails}/>
               <DeleteComment token={localStorage.getItem('token')} locationDetails={this.locationDetails} id={info.id} />
            <br/>
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
        if(this.state.data == null) {
            return null
        }
        return(
            <div id='detailContainer'>
                <h1 id='detailHeader'>{this.state.data.name}</h1>
                <Container>
           <Row>
               <Col sm="6">
                   <img src={food} alt="" height="250px" width="250px"/>
               </Col>
               <Col id='detailTextContainer' sm="6">
                    <h4>Type: {this.state.data.cuisines}</h4>
                    <br/>
                    <h5>Highlights: {this.state.data.highlights[0]}, {this.state.data.highlights[1]}, {this.state.data.highlights[2]}</h5>
                    <p>Hours: {this.state.data.timings}</p>
                    <p>Phone: {this.state.data.phone_numbers}</p>
                    <br/>
                    <p>Cost for Two: ${this.state.data.average_cost_for_two}</p>
                    <p>Address: {this.state.data.location.address}</p>
                    <p>Part of City: {this.state.data.location.locality_verbose}</p>
                    <p><a target='blank' href={this.state.data.menu_url}>View Menu</a></p>
                    <Button onClick={this.sendRest}>Add to Try Later!</Button>
               </Col>
           </Row>
           <div>  
           <h3 id='commentHeader'>Comments <br/> Click + Below to Add</h3>
           
           <Button onClick={this.toggle}><FontAwesomeIcon id='faPlusButton' icon={faPlusSquare} size="3x" /></Button>
           {this.state.show ? <Form>
                    <FormGroup id='addCommForm'>
                        <Label htmlFor="name">Add a Comment!</Label>
                        <Input placeholder='eg: Food was Amazing, Our Server was fantastic'onChange={(e) => this.setState({comm: e.target.value})} id="name" value={this.state.comm}/>
                        
                        <br/>
                        <Label htmlFor="rating">Leave a Star Rating 0-5</Label>
                        <Input placeholder='0-5' type="number" max="5" min="0" onChange={(e) => this.setState({rating: e.target.value})}></Input>
                        <br/>
                        <Button onClick={this.submitComm} >Submit Comment!</Button>
                    </FormGroup>
                </Form> : <div></div>}
                
                <br/>
                <Button id='btnShowComm' onClick={this.toggleTwo}>
                    {this.state.showComm ? <p>Click to Hide Comments</p> : <p>Click to Show Comments</p>}</Button>
                <div id='commentContainer'>
                {this.state.showComm ? <div>{this.commentMapper()}</div>: <div id='hidden'></div>}
                </div>
                </div>
                </Container>
                
            </div>
        )
    }

}

export default RestDetail;