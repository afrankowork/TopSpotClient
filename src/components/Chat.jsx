import React, { useEffect, useRef, useState } from 'react';
import APIURL from '../helpers/environment';
import {Form, Button, Label, Input} from 'reactstrap';
import Chip from '@material-ui/core/Chip'
import firebase from 'firebase/app';
import 'firebase/firestore';
import {useParams} from 'react-router-dom';  
import 'firebase/analytics';


import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDcE1RuOYdveoafoC3hmf2rfsRY7DSiJdQ",
    authDomain: "top-spots-489f9.firebaseapp.com",
    databaseURL: "https://top-spots-489f9.firebaseio.com",
    projectId: "top-spots-489f9",
    storageBucket: "top-spots-489f9.appspot.com",
    messagingSenderId: "1031099736033",
    appId: "1:1031099736033:web:326cfa08300d29900c3ca0",
    measurementId: "G-GCHW5L8TK1"
})

const firestore = firebase.firestore();
const analytics = firebase.analytics();
const token = localStorage.getItem('token');
let userID = '';
let userName = '';

let currentUser = '';
let currentMember;



function LiveChat() {
    const {city} = useParams();
    
    let requestHeaders = {'Content-Type':'application/json',
        'Authorization' : token}
        
        fetch(
            `${APIURL}/rest/getone`,
            {method: 'GET',
            headers: requestHeaders }
          ).then((response) => {
              return response.json();
            }).then((json) => {
                
                currentUser = json.info[0].username;
                console.log(currentUser)
            })


    return (
       <div id='chatRoomContainer'>

        <h1 id='chatRoomHeader'>{city} Chat</h1>
        <div id='messagesContainer'>
            {token ? <ChatRoom /> : <div>No Cigar</div>}
            </div>
        </div>
        
    )
}

function ChatRoom(props) {
    const {city} = useParams();
    const scroll = useRef();
    
    
    
    const messagesRef = firestore.collection(`${city}`);
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [newMessage, setNewMessage] = useState(' ');
    

    const sendMessage = async (e) => {
        e.preventDefault();
        
        let requestHeaders = {'Content-Type':'application/json',
        'Authorization' : token}
        
        await fetch(
            `${APIURL}/rest/getone`,
            {method: 'GET',
            headers: requestHeaders }
          ).then((response) => {
              return response.json();
            }).then((json) => {
                console.log(json)
                userID = json.info[0].id
                userName = json.info[0].username
                
            })



            
        await messagesRef.add({
            text: newMessage,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            userID,
            userName
        })

        setNewMessage('');
        scroll.current.scrollIntoView({behavior: 'smooth'})

        
    }
    return(
        <>
        <div>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} currentUser={currentUser}  />)}
            <span ref={scroll}></span>
        </div>

        <Form onSubmit={sendMessage}>
            <Input id='chatInput' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text"/>
      

        <Button type='submit'>
            Send
        </Button>
        </Form>

        </>
    )

}

function ChatMessage(props) {
    
    
    
    const {text, userID, userName} = props.message;
    let messageType = userName == props.currentUser ? 'sent' : 'received';
    
    return (
       
        <div className={`mess-${messageType}`} >
        <span className={`label-${messageType}`}>{userName}</span><br/>
        <span className={`text-${messageType}`}>
          {text}
        </span>
        <br/>
        <br/>
        </div>
        
    )

}

export default LiveChat;
