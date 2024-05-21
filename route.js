const express = require("express");
const fs = require("fs");


const Movies = require("./movieDB");

const app = express.Router();

var ids = 0;

//  Question 1 : localhost:5500/shows
    //Displays all the data of shows/Movies.

//  Question 2 : localhost:5500/shows/<Enter ID> 
    //Display the movie data fetched by given ID, where ID's ranging from 1 to 3.

//  Question 3 : localhost:5500/show/<Enter ID>
    //Play the chunk of the movie fetched by given ID, where ID's ranging from 1 to 3.

app.get('/shows', (req, res) => {
   
    Movies.find()
        .then(response => {
            res.status(200).json({
                message: "Movies Fetched Successfully",                 //Display all shows/movies
                movies: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

})

app.get('/shows/:id', (req, res) => {
    let { id } = req.params;
    //ids = id;
    Movies.findById(id)
        .then(response => {
            res.status(200).json({
                message: "Movie Fetched Successfully",                //Display particular movie/show
                movie: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

app.get('/show/:id', (req, res) => {
    let { id } = req.params;
    ids = id;
    
    res.sendFile(__dirname + '/index.html');
})

app.get('/player', function(req, res){
    Movies.findById(ids)                                // Chunk of particlur movie/show
    .then(response => {

        const range = req.headers.range;                // The range of the video

        const string = JSON.stringify(response);
        const stringValue = JSON.parse(string);
        const path = stringValue['path'];               // Fetching the link from the mongoDB
        
        const videoSize = fs.statSync(path).size;       // Fetching the file size
        const chunkSize = 10**6;                            // 10 to the power of 6 == 1000000 (1MB)
        const start = Number(range.replace(/\D/g, ""));     // starting point of the video file
        const end = Math.min(start + chunkSize, videoSize - 1)  // Ending point of the video in a chunk
        const contentLength = end - start + 1;                  // total video length
        
        const headers = {                                       // creating an header identification of the transmission
            "Content-Range": `bytes ${start}-${end}/${videoSize}`, 
            "Accept-Ranges": "bytes", 
            "Content-Length": contentLength, 
            "Content-Type": "video/mp4"
        } 
        res.writeHead(206, headers) 
        const stream = fs.createReadStream(path, {      // streaming the file
            start, 
            end 
        }) 
        stream.pipe(res) 
        
       console.log(res);
    }) 
    .catch(err => {
        res.status(500).json({ error: err })
    })
})

module.exports = app;