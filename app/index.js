const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const expressFileUpload = require("express-fileupload");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const mongodb = require('mongodb');
const url = 'mongodb://127.0.0.1';
const { dirname } = require('path');
const cors = require('cors');
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyparser.json());

app.use(
    expressFileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

  app.post("/convert", (req, res) => {

    let to = req.body.file_extension;
    console.log(req.body.file);
    let file = req.body.file;
    let nom = req.body.file_name;
    let fileName = `${nom}.${to}`;

    console.log(to);
    console.log("coucou");
    console.log(file);


    file.mv("tmp/" + file.name, function (err) {
      if (err) return res.sendStatus(500);
      console.log("File Uploaded successfully");
      return;
    });

    ffmpeg("tmp/" + file.name)
    .withOutputFormat(to)
    .on("end", function (stdout, stderr) {
      console.log("Finished");
      res.download(fileName, function (err) {
        if (err) throw err;

        fs.unlink(fileName, function (err) {
          if (err) throw err;
          console.log("File deleted");
        });
      });
      fs.unlink( "tmp/"+ file.name, function (err) {
        if (err) throw err;
        console.log("File deleted");
      });
    })
    .on("error", function (err) {
      console.log("an error happened");
      fs.unlink("tmp/" + file.name, function (err) {
        if (err) throw err;
        console.log("File deleted");
      });
    })
    .saveToFile(fileName);
  });
  /*  .takeScreenshots({
        filename: 'example.jpg',
        timemarks: [ 2, 4 ]
    }, 'directory')*/

  app.post("/cut", (req, res) => {
      let to = req.body.to;
      let file = req.files.file;
      let nom = req.body.name;
      let fileName = `${nom}.${to}`;
      let min = req.body.min;
      let sec = req.body.sec;
      let min1 = req.body.min1;
      let sec1 = req.body.sec1;
      console.log(file);
      file.mv("tmp/" + file.name, function (err) {
        if (err) return res.sendStatus(500);
        console.log("File Uploaded successfully");
      });
      ffmpeg.ffprobe("tmp/" + file.name, (err, metadata)  => {
        const duration = metadata.format.duration;
        console.log(metadata);
      });
      let startingTime = min*60 + sec;
      //const startingTime = parseInt(duration / 2);
      const endTime = min1*60 + sec1;
      const clipDuration = endTime - startingTime;
      console.log(startingTime);
      console.log(endTime);
      console.log(clipDuration);
      startingTime++;
      ffmpeg("tmp/" + file.name)
      ffmpeg()
        .input("tmp/" + file.name)
        .inputOptions([ `-ss ${startingTime}`])
        .outputOptions([ `-t ${clipDuration}`])
        .output(fileName)
        .on('end', () => console.log('Done!'))
        .on("end", function (stdout, stderr) {
          console.log("Finished");
          res.download(fileName, function (err) {
            if (err) throw err;

            fs.unlink(fileName, function (err) {
              if (err) throw err;
              console.log("File deleted");
            });
          });
          fs.unlink( "tmp/"+ file.name, function (err) {
            if (err) throw err;
            console.log("File deleted");
          });
        })
        .on("error", function (err) {
          console.log("an error happened");
          fs.unlink("tmp/" + file.name, function (err) {
            if (err) throw err;
            console.log("File deleted");
          });
        })
        .run();
  });

  app.post("/screenshot", (req, res) => {

    let file = req.files.file;
    let to = req.body.to;
    let nom = req.body.name;
    let fileName = `${nom}.${to}`;
    let minScreen = req.body.minScreen;
    let secScreen = req.body.secScreen;
    console.log(file);

    console.log(to);
    console.log("coucou");
    console.log(file);

    let startingTime = minScreen*60 + secScreen;

    file.mv("tmp/" + file.name, function (err) {
      if (err) return res.sendStatus(500);
      console.log("File Uploaded successfully");
    });

    ffmpeg("tmp/" + file.name)
    .takeScreenshots({
          filename: fileName,
          timemarks: [ startingTime ]
    },)
    .on("end", function (stdout, stderr) {
      console.log("Finished");
      res.download(fileName, function (err) {
        if (err) throw err;

        fs.unlink(fileName, function (err) {
          if (err) throw err;
          console.log("File deleted");
        });
      });
      fs.unlink( "tmp/"+ file.name, function (err) {
        if (err) throw err;
        console.log("File deleted");
      });
    })
    .on("error", function (err) {
      console.log("an error happened");
      fs.unlink("tmp/" + file.name, function (err) {
        if (err) throw err;
        console.log("File deleted");
      });
    })
  });
  app.post("/youtube", (req, res) => {

    let to = req.body.to;
    let nom = req.body.name;
    let url = req.body.url;
    let fileNotName = `${nom}.${to}`;
    let fileName = `${nom}.mp4`;

    ytdl(url)
      .pipe(fs.createWriteStream(fileName));

  });
  app.post("/gif", (req, res) => {
        let to = req.body.to;
        let file = req.files.file;
        let nom = req.body.name;
        let fileName = `${nom}.${to}`;
        let min = req.body.min;
        let sec = req.body.sec;
        let min1 = req.body.min1;
        let sec1 = req.body.sec1;
        console.log(file);
        file.mv("tmp/" + file.name, function (err) {
          if (err) return res.sendStatus(500).send(err);
          console.log("File Uploaded successfully");
        });
        ffmpeg.ffprobe("tmp/" + file.name, (err, metadata)  => {
          const duration = metadata.format.duration;
          console.log(metadata);
        });
        let startingTime = min*60 + sec;
        //const startingTime = parseInt(duration / 2);
        const endTime = min1*60 + sec1;
        const clipDuration = endTime - startingTime;
        console.log(startingTime);
        console.log(endTime);
        console.log(clipDuration);
        startingTime++;
        ffmpeg("tmp/" + file.name)
        ffmpeg()
          .input("tmp/" + file.name)
          .inputOptions([ `-ss ${startingTime}`])
          .outputOptions([ `-t ${clipDuration}`])
          .outputFormat(to)
          .outputFps(15)
          .noAudio()
          .withSize('640x480')
          .output(fileName)
          .on('end', () => console.log('Done!'))
          .on("end", function (stdout, stderr) {
            console.log("Finished");
            if (clipDuration <= 5) {
              res.download(fileName, function (err) {
                if (err) throw err;

                fs.unlink(fileName, function (err) {
                  if (err) throw err;
                  console.log("File deleted");
                });
              });
            }
            fs.unlink( "tmp/"+ file.name, function (err) {
              if (err) throw err;
              console.log("File deleted");
            });
          })
          .on("error", function (err) {
            console.log("an error happened");
            fs.unlink("tmp/" + file.name, function (err) {
              if (err) throw err;
              console.log("File deleted");
            });
          })
          .run();
    });

console.log(ffmpeg);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Sorry about this monstrosity -- just for demo purposes
app.get('/init-video', function (req, res) {
  mongodb.MongoClient.connect(url, {
      useUnifiedTopology: true,
    },
    function (error, client) {
    if (error) {
      res.json(error);
      return;
    }

    // connect to the videos database
    const db = client.db('videos');

    // Create GridFS bucket to upload a large file
    const bucket = new mongodb.GridFSBucket(db);

    // create upload stream using GridFS bucket
    const videoUploadStream = bucket.openUploadStream('video');

    // You can put your file instead of bigbuck.mp4
    const videoReadStream = fs.createReadStream('./video.mp4');

    // Finally Upload!
    videoReadStream.pipe(videoUploadStream);

    // All done!
    res.status(200).send("Done...");
  });
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});

app.get("/mongo-video", function (req, res) {
  mongodb.MongoClient.connect(url, {
      useUnifiedTopology: true,
    },
    function (error, client) {
    if (error) {
      res.status(500).json(error);
      return;
    }

    // Check for range headers to find our start time
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const db = client.db('videos');
    // GridFS Collection
    db.collection('fs.files').findOne({filename: "video"}, (err, video) => {
      if (!video) {
        res.status(404).send("No video uploaded!");
        return;
      }

      // Create response headers
      const videoSize = video.length;
      const start = Number(range.replace(/\D/g, ""));
      const end = videoSize - 1;

      const contentLength = (end - start) + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);

      // Get the bucket and download stream from GridFS
      const bucket = new mongodb.GridFSBucket(db);
      const downloadStream = bucket.openDownloadStreamByName('video', {
        start
      });

      // Finally pipe video to response
      downloadStream.pipe(res);
    });
  });
});
