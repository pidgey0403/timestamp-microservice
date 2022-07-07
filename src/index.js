const express = require('express')
const port = 3100
const path = require("path")
const app = express()

app.use(express.static('src')); // go into SRC folder and serve html and css files


// request to /api/:date?
app.get("/api/:date?", (req, res)=>{
    let dateString = req.params.date; // grab query parameter; string
    let numbers = /^\d+$/;
    let year_month_day = /\d\d\d\d-\d\d-\d\d/;

    // if string isn't null
    if (dateString){ 
        if (numbers.test(dateString)){ // if it has number format
            const unixTime = parseInt(dateString);
            const utcTime = new Date(unixTime).toUTCString();
            res.json({unix: unixTime, utc: utcTime});
        } else if (year_month_day.test(dateString)){ // if it has yyyy/mm/dd format
            const obj = new Date(dateString);
            const utcTime = new Date(obj).toUTCString();
            const unixTime = obj.getTime();
            res.json({unix: unixTime, utc: utcTime});
        } else {
            res.json({ error : "Invalid Date" });
        } 
    } else { // if null return current date and time in unix and UTC
        let date = new Date();
        let time  = date.getTime();
        let UTC = date.toUTCString();
        res.json({unix: time, utc: UTC});
    }   
});


app.listen(port);
console.log(`Server listening at port: localhost:${port}`);