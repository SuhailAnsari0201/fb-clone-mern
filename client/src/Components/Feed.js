import React, { useState, useEffect } from "react";
import "./Feed.css";
import StoryReel from "./FeedComponents/StoryReel";
import MessageSender from "./FeedComponents/MessageSender";
import Post from "./FeedComponents/Post";
import axios from "../axios";
import Pusher from "pusher-js";
import db from "../firebase";

const pusher = new Pusher("f8c4ecaafb8b565e1cce", {
  cluster: "ap2",
});

const Feed = () => {
  const [postsData, setPostsData] = useState([]);

  const syncFeed = () => {
    axios.get("/retrieve/post").then((res) => {
      console.log(res.data);
      setPostsData(res.data);
    });
  };

  useEffect(() => {
    var channel = pusher.subscribe("posts");
    channel.bind("inserted", function (data) {
      syncFeed();
    });
  }, []);

  useEffect(() => {
    syncFeed();
  }, []);
  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />
      {/* <Post
        profilePic=""
        message="yoo this is the message"
        timestamp="time"
        imgName="img name"
        username="suhail"
      /> */}

      {postsData.map((entry) => (
        <Post
          profilePic={entry.avatar}
          message={entry.text}
          timestamp={entry.timestamp}
          imgName={entry.imgName}
          username={entry.user}
        />
      ))}
    </div>
  );
};
export default Feed;
