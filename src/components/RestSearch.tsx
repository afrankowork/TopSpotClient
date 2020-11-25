import { ReactComponent } from '*.svg';
import React from 'react';
import {Form, FormGroup, Label, Input, Button, Container, Col, Row, Modal} from 'reactstrap';
import {Link} from 'react-router-dom';
import placeHolder from '../assets/placeHolder.jpg';

type SearchState = {
    city: string;
    bestRest: Array<string>;
    
}

type MyProp = {

}


class RestSearch extends React.Component<MyProp, SearchState>{
    
    
    constructor(props: any){
        super(props)
        this.locationSearch = this.locationSearch.bind(this)
        this.state = {
            city: '',
            bestRest: [],
            

        }
    }


    reset() {
        this.setState({
            bestRest: []
        })
    }


    async locationSearch(event: any){
        event.preventDefault();
        let apiKey = "32208e8bf1facf3f6ee15d286125735f";
        
        let entityID;
        let entityType;
        let restList;
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
                `https://developers.zomato.com/api/v2.1/location_details?entity_id=${entityID}&entity_type=${entityType}`,
                { headers: { "user-key": apiKey, Accept: "application/json" } }
              ).then((response) => {
                  return response.json();
                }).then((data) => {
                    this.reset();
                    data.best_rated_restaurant.forEach((rest: any) => {
                        this.setState({
                            bestRest: [...this.state.bestRest, rest.restaurant]
                        })
                    })
            })
        }
    


        topMapper(){
            console.log(this.state.bestRest);
            return this.state.bestRest.map((rest: any, index: number) => {
                return(
                    <Row id='searchRow'>
                           <Col xs="6">
                     <img height='250px' width='250px' src={placeHolder} alt=""/>
                     <p>Your Image Here!</p>
                     </Col>
                     <Col xs="6" id='restCol'>
                     <h4>{index + 1}. {rest.name}</h4>
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
            <div id='searchDiv'>
                <Form id='searchForm' onSubmit={this.locationSearch}>
                <FormGroup>
                    <h4>City Search</h4>
                    <Input placeholder='eg: New York, Chicago, Indianapolis'id='searchInput' onChange={(e) => this.setState({city: e.target.value})} name='city' value={this.state.city} />
                </FormGroup>
                <Button type='submit'>Search</Button>
            </Form>
            <br/>
            <h3 id='searchHeader'>Best Rated Restaurants in Your City:</h3>
            <br/>
            <Container id='searchContainer'>
                {this.topMapper()}
            </Container>
            </div>
        )
    }
}

export default RestSearch;

// this.state.bestRest + rest.restaurant