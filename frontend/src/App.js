import React, { useEffect, useState } from 'react';
import Pusher from "pusher-js";
import './App.css';
import Sidebar from './Sidebar';
import Chat from "./Chat";
import axios from "./axios";
function App() {
  const [messages, setMsg] = useState([]);
  useEffect(() => {

    axios.get('/messages/sync').then((response) => {

      setMsg(response.data);
    });

  }, []);
  useEffect(() => {

    const pusher = new Pusher('1fca8559b5443a0eb438', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {

      setMsg([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }


  }, [messages]);
  console.log(messages);
  return (
    <div className="App">
      <div className="App_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>

    </div>
  );
}

export default App;
