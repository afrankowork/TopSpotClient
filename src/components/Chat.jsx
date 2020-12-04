import React, { useRef, useState } from 'react';
import APIURL from '../helpers/environment';
import {Form, Button} from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/firestore';

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


function LiveChat() {


    return (
        <>
        <div>
            <h1>Top Spots Live Chat</h1>
        </div>

        <div>
            {token ? <ChatRoom /> : <div>No Cigar</div>}
        </div>
        </>
    )
}

function ChatRoom() {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(30);

    const [messages] = useCollectionData(query, {idField: 'id'});

    const [newMessage, setNewMessage] = useState('');
    
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


    }
    return(
        <>
        <div>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </div>

        <Form onSubmit={sendMessage}>
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text"/>
      

        <Button type='submit'>
            Send
        </Button>
        </Form>

        </>
    )

}

function ChatMessage(props) {
    const {text, userID, userName} = props.message;

    return (
        <>
        <div>
        <p>{userName}: {text}</p>
        </div>
        </>
    )

}

export default LiveChat;
