const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const bodyParser = require("body-parser");
const path = require("path");
const Pusher = require("pusher");

const Post = require("./models/postModel");

Grid.mongo = mongoose.mongo;

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1088020",
  key: "f8c4ecaafb8b565e1cce",
  secret: "5b7ee2036992e38b3c19",
  cluster: "ap2",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});

// middleware
app.use(bodyParser.json());
app.use(cors());

// db config
const mongoURI =
  "mongodb+srv://db1:u6gSSkfk6XxxG9HY@cluster0.wief1.mongodb.net/facebook-db?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");
  const changeStream = mongoose.connection.collection("posts").watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      console.log("Triggring Pusher");
      pusher.trigger("posts", "inserted", {
        change: change,
      });
    } else {
      console.log("Error Triggring Pusher");
    }
  });
});

let gfs;
conn.once("open", () => {
  console.log("DB Connected.");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
});
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `image-${Date.now()}${path.extname(file.originalname)}`;
      const fileInfo = {
        filename: filename,
        bucketName: "images",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// api routes
app.get("/", (req, res) => {
  res.status(200).send("Hello Suhail !!!");
});
app.post("/upload/image", upload.single("file"), (req, res) => {
  res.status(200).send(req.file);
});
app.post("/upload/post", (req, res) => {
  const dbPost = req.body;
  Post.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/retrieve/post", (req, res) => {
  Post.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(200).send(data);
    }
  });
});
app.get("/retrieve/images/single", (req, res) => {
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!file || file.length === 0) {
        console.log(file);
        res.status(404).json({ err: "file not found" });
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});
// listen
app.listen(port, () => console.log(`Server Run On ${port} Post`));
