const express = require('express');
const fs = require("fs");
const path = require('path');
const { exec } = require('child_process');
var list = "";
var listFilePath = 'tmp/uploads/' + Date.now() + 'list.txt';
var outputFilePath = Date.now() + 'output.mp4';
const bodyparser = require('body-parser');
const multer = require('multer')
const app = express();
var dir =  "/tmp/";
var subDirectory = 'tmp/uploads';
const expressFileUpload = require("express-fileupload");
const ffmpeg = require("fluent-ffmpeg");
const { dirname } = require('path');
const concat = require('ffmpeg-concat');
const ytdl = require('ytdl-core');
const mongodb = require('mongodb');
const readline = require('readline');
const url = 'mongodb://127.0.0.1';
const cors = require('cors');
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);

  fs.mkdirSync(subDirectory);

}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


const videoFilter = function(req, file, cb) {
  // Accept videos only
  if (!file.originalname.match(/\.(mp4)$/)) {
      req.fileValidationError = 'Only video files are allowed!';
      return cb(new Error('Only video files are allowed!'), false);
  }
  cb(null, true);
};


var upload = multer({storage:storage,fileFilter:videoFilter});


// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyparser.json());

app.use(express.static('public'));

app.post("/merge", upload.array("files", 1000), (req, res) => {
  list = ""
if (req.files) {
  req.files.forEach((file) => {
    list += `file ${file.filename}`;
    list += "\n";
  });

  var writeStream = fs.createWriteStream(listFilePath);

  writeStream.write(list);

  writeStream.end();

  exec(
    `ffmpeg -safe 0 -f concat -i ${listFilePath} -c copy ${outputFilePath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      } else {
        console.log("videos are successfully merged");
        res.download(outputFilePath, (err) => {
          if (err) throw err;

          req.files.forEach((file) => {
            fs.unlinkSync(file.path);
          });

          fs.unlinkSync(listFilePath);
          fs.unlinkSync(outputFilePath);
        });
      }
    }
  );
}
});





app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
  /*app.post("/convert", (req, res) => {

    let to = req.body.to;
    let file = req.files.file;
    let nom = req.body.name;
    let fileName = `${nom}.${to}`;

    console.log(to);
    console.log("coucou");
    console.log(file);
    console.log(file.name);


    file.mv("tmp/" + file.name, function (err) {
      if (err) return res.sendStatus(500).send(err);
      console.log("File Uploaded successfully");
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
  });*/

  app.post("/convert", (req, res) => {

    let to = req.body.to;
    let file = req.files.file;
    let nom = req.body.name;
    let fileName = `${nom}.${to}`;
    let total = file.size;
    let starttime;
    var pourcentage;
    var name = 'hello';

  

    console.log(to);
    console.log("coucou");
    console.log(file);


    file.mv("tmp/" + file.name, function (err) {
      if (err) return res.sendStatus(500);
      console.log("File Uploaded successfully");
      return;
    });
    ffmpeg("tmp/" + file.name)
    .on("progress", function(progress){
        pourcentage = progress.percent;
    })
    .withOutputFormat(to)
    .once('response', () => {
      starttime = Date.now();
    })

    .on("progress", function (stdout, stderr) {
      const percent = pourcentage/100;
      const downloaded = percent * total
      const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
      const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
      process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
      process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
      process.stdout.write(`, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `);
      readline.moveCursor(process.stdout, 0, -1);
    })
    .on("end", function (stdout, stderr) {
      process.stdout.write('\n\n');
    })
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
  app.post("/cut", (req, res) => {
    let to = req.body.to;
    let file = req.files.file;
    let nom = req.body.name;
    let fileName = `${nom}.${to}`;
    let min = req.body.min;
    let sec = req.body.sec;
    let min1 = req.body.min1;
    let sec1 = req.body.sec1;

    
    let wScreen = req.body.wScreen;
    let hScreen = req.body.hScreen;
    let size = `'${wScreen}x${hScreen}'`; 

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
      /*if(min ==! 0 && sec ==! 0 || min ==! 0 || sec ==! 0){
        ffmpeg()
        .outputOptions([ `-t ${clipDuration}`])
      }*/
    //ffmpeg()
      .outputFormat(to)
      //if(wScreen ==! 0 && hScreen ==! 0){
        //ffmpeg()
          .withSize(size)
      //}
    ffmpeg()
      .output(fileName)
      .on('end', () => console.log('Done!'))
      .on("end", function (stdout, stderr) {
        console.log("Finished");
        if (clipDuration < 5) {
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
  let starttime;
  //const output = path.resolve(__dirname, `${nom}.${to}`);

  const video = ytdl(url);
  console.log(video);
  video.pipe(fs.createWriteStream(fileName));
  video.once('response', () => {
    starttime = Date.now();
  });
  video.on('progress', (chunkLength, downloaded, total) => {
    console.log(downloaded);
    console.log(total);
    console.log(chunkLength);
    const percent = downloaded / total;
    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
    process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
    process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
    process.stdout.write(`, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `);
    readline.moveCursor(process.stdout, 0, -1);
  });
  video.on('end', () => {
    process.stdout.write('\n\n');
  });
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
    .withSize('640x480')
    .output(fileName)
    .on('end', () => console.log('Done!'))
    .on("end", function (stdout, stderr) {
      console.log("Finished");
      if (clipDuration < 5) {
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
app.get("/",(req,res) => {
  res.sendFile(__dirname + '/front/html/index.html');
  });
app.get("/index",(req,res) => {
res.sendFile(__dirname + '/front/html/index.html');
});
app.get("/Con",(req,res) => {
res.sendFile(__dirname + '/front/html/Converter.html');
});
app.get("/Cut",(req,res) => {
res.sendFile(__dirname + '/front/html/Cut.html');
});
app.get("/Screen",(req,res) => {
res.sendFile(__dirname + '/front/html/Screenshot.html');
});
app.get("/Gif",(req,res) => {
res.sendFile(__dirname + '/front/html/GIF.html');
});
app.get("/Concat",(req,res) => {
res.sendFile(__dirname + '/front/html/Concatenation.html');
});
app.get("/Yt",(req,res) => {
res.sendFile(__dirname + '/front/html/Youtube.html');
});
app.listen(8000, () => {
console.log('Serveur lance sur le port 8000');

});