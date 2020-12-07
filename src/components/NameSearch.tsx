import React from 'react';
import {Form, FormGroup, Input, Button, Label, Row, Col, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import placeHolder from '../assets/placeHolder.jpg';

type NameState = {
    city: string;
    restname: string;
    bestRest: Array<string>;
}

type AcceptedProps = {

}

class NameSearch extends React.Component<AcceptedProps, NameState>{
    constructor(props: AcceptedProps){
        super(props)
        this.searchByName = this.searchByName.bind(this);
        this.state = {
            city: '',
            restname: '',
            bestRest: []
        }

    }

    reset() {
        this.setState({
            bestRest: []
        })
    }


    async searchByName(event: any){
        event.preventDefault()
        let apiKey = "32208e8bf1facf3f6ee15d286125735f";

        let entityID;
        let entityType;
        await fetch(
            `https://developers.zomato.com/api/v2.1/locations?query=${this.state.city}`,
            { headers: { "user-key": apiKey, Accept: "application/json" } }
          ).then((response) => {
              return response.json();
            }).then((json) => {
                console.log(json)
                entityID = json.location_suggestions[0].entity_id;
                entityType = json.location_suggestions[0].entity_type;
                
            })

            await fetch(
                `https://developers.zomato.com/api/v2.1/search?entity_id=${entityID}&entity_type=${entityType}&q=${this.state.restname}`,
                { headers: { "user-key": apiKey, Accept: "application/json" } }
              ).then((response) => {
                  return response.json();
                }).then((data) => {
                    this.reset();
                    data.restaurants.forEach((rest: any) => {
                        this.setState({
                            bestRest: [...this.state.bestRest, rest.restaurant]
                        })
                    })
                    console.log(this.state.bestRest)
            })

    }

    restMapper(){
        console.log(this.state.bestRest);
        return this.state.bestRest.map((rest: any, index: number) => {
            return(
                <Row id='searchRow'>
                       <Col xs="6">
                 <img height='250px' width='250px' src={placeHolder} alt=""/>
                 <p style={{color: "white"}}>Your Image Here!</p>
                 </Col>
                 <Col xs="6" id='restCol'>
                 <h4>{index + 1}. {rest.name}</h4>
                 <h5>Address: {rest.location.address} {rest.location.locality_verbose}</h5>
               
                 <br/>
                <p>Type of Cuisine: {rest.cuisines}</p>
                <p style={{color: '#'+rest.user_rating.rating_color}}>User Rating: {rest.user_rating.aggregate_rating}/5</p>
                <p>Hours: {rest.timings}</p>
                <p>Cost for Two: ${rest.average_cost_for_two}</p>
                
                <Link to={`/restsearch/${rest.R.res_id}`}>Click Here For More Details</Link>
                <br/>
                </Col>
                <br/>
                 </Row>
                
            )
        })
    }

    render(){
        
        return(
            <div className='searchDiv'>
                <Form className='searchForm' onSubmit={this.searchByName}>
                <FormGroup>
                    <h4 className='formSearchHeader'>Enter a Restaurant Name and a City</h4>
                    <div className='searchFormContainer'>
                    <Input placeholder='City Name' id='cityInput' onChange={(e) => this.setState({city: e.target.value})} name='city' value={this.state.city} required/>
                    <Input placeholder='Restaurant Name' onChange={(e) => this.setState({restname: e.target.value})} name='restName'
                    value={this.state.restname} required/>
                    <Button type='submit'><FontAwesomeIcon  icon={faSearch} size="1x" style={{color: '#09521d', }}/> </Button>
                    </div>
                </FormGroup>
                
            </Form>
            <br/>
            
            <br/>
            <Container id='searchContainer'>
                {this.restMapper()}
            </Container>
            </div>
        )
    }

}


export default NameSearch;