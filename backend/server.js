//importing express
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";
//app config
const app = express();
const port = process.env.PORT || 9000
const pusher = new Pusher({
    appId: '1074981',
    key: '1fca8559b5443a0eb438',
    secret: '9d473187ab715bb0cacb',
    cluster: 'ap2',
    encrypted: true
});


//middleware
app.use(express.json());
app.use(cors());




//Db Config
const url = 'mongodb+srv://admin:single1998@cluster0.eq7js.mongodb.net/whatsappdbs?retryWrites=true&w=majority'
mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection
db.once('open', () => {

    console.log("Db Connected");

    const msgCollection = db.collection("messagecontents")

    const ChangeStream = msgCollection.watch()



    ChangeStream.on("change", (change) => {
        console.log("A change Occured", change)


        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', "inserted",
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,
                });
        }
        else {
            console.log("Error Trrigering Pusher")
        }




    })
})


//api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));


app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(200).send(data)


    })
});

app.post("/messages/new", (req, res) => {
    const dbMsg = req.body;
    Messages.create(dbMsg, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }

    })
})



//listen
app.listen(port, () => console.log(`Listening on localhost:${port} `))