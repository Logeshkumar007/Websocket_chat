import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {
  Button,
  Dialog,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
const ChatInterface = () => {
  const [user, setUser] = useState("lk");
  const [messages, setMessages] = useState([]);

  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(1);
  const [input, setInput] = useState("");
  const stompClientRef = useRef(null);
  useEffect(() => {
    console.log(count);
    const socket = new SockJS("http://localhost:8080/ws");
    const stompclient = Stomp.over(socket);
    stompclient.connect({}, () => {
      stompclient.subscribe("/topic/message", (message) => {
        const parsedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, parsedMessage]);
      });
      stompClientRef.current = stompclient;
    });
    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, []);
  const sendMessage = () => {
    if (input.trim() && stompClientRef.current) {
      const chatMessage = {
        name: user,
        message: input,
      };
      stompClientRef.current.send("/app/chat", {}, JSON.stringify(chatMessage));
      setInput("");
    }
  };
  return (
    
      <div
        style={{
          
          backgroundColor: "rgb(217, 217, 219)",
          alignContent: "center",
          backgroundImage:new URL("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPspdWP8TbfQkN3hpS9lHHce_UJrgogi43Q&s"),
          height:"100dvh"
        }}
      >
        <Dialog
          open={open}
          maxWidth=""
          sx={{
            backdropFilter: "blur(5px)", // Adjust blur intensity as needed
            backgroundColor: "rgba(55, 55, 55, 0.3)", // Optional: darken background
          }}
        >
          <Paper
            sx={{
              width: "400px",
              height: "400px",
              backgroundColor: "white",
              alignContent: "center",
              // backgroundImage:new URL("")
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "",
                paddingLeft: "15%",
              }}
            >
              <Typography> NAME:</Typography>
              <TextField
                required
                type="text"
                sx={{ maxWidth: "80%", paddingTop: "1%", paddingBottom: "10%" }}
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              ></TextField>
              <Typography>AGE:</Typography>
              <TextField
                required
                type="text"
                sx={{ maxWidth: "80%", paddingTop: "1%", paddingBottom: "15%" }}
              ></TextField>
            </div>
            <div
              style={{
                display: "flex",
                alignContent: "end",
                flexDirection: "column",
                alignItems: "end",
                marginRight: "15%",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setUser(user);
                  setOpen(false);
                }}
                sx={{ maxWidth: "60%" }}
              >
                SUBMIT
              </Button>
            </div>
          </Paper>
        </Dialog>
        <Paper elevation={5} sx={{height:"70dvh", marginLeft: "20%",
            marginRight: "20%",padding:"2% 0 0 2%",overflowY:"scroll"}}>
          {messages.map((e, index) => {
            return <div>
              <div style={{display:"flex",gap:10}}>
              <p style={{fontWeight:"bold",fontSize:"130%"}} key={index}>{String(e.name).toUpperCase()+" "}</p>
              <p style={{fontSize:"125%",wordBreak:"break-word"}} key={index}>{":  "+e.message}</p>
              </div>
              <hr/>
              </div>
          })}
        </Paper>
        <Paper  elevation={5} sx={{height:"8dvh", marginLeft: "20%",
            marginRight: "20%"}}>

              <TextField
            
            sx={{minWidth:"75%"}}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
          <button style={{  height: "100%", width:"25%" }} onClick={sendMessage}>
            send
          </button>

          <h1></h1>
            </Paper>
      </div>
    
  );
};

export default ChatInterface;
