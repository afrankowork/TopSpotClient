import { render } from '@testing-library/react';
import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {Link} from 'react-router-dom';

function cityMapper() {
    let cities = ['Indianapolis', 'Chicago', 'New York', 'LA']
    return cities.map((city, index) => {
        return(
        <div className='cityLand'>
        <Link className='cityLink' to={`/chatlanding/${city}`}>{city}</Link>
      </div>)
    })    
}

function ChatLand() {
    return(
        <div id='chatLand'>
            <h3 id='chatLandHeader'>Select A Chat Room to Join!</h3>
            {cityMapper()}
        </div>
    )
}


export default ChatLand;