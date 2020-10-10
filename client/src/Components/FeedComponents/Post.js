import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import NearMeIcon from "@material-ui/icons/NearMe";
import ExpandMoreOutlined from "@material-ui/icons/ExpandMoreOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Post = ({ profilePic, imgName, username, timestamp, message }) => {
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(parseInt(timestamp)).toUTCString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
        {/* Image coming later */}
      </div>
      {imgName ? (
        <div className="post__image">
          <img
            src={`https://fb-clone-mern.herokuapp.com/retrieve/images/single?name=${imgName}`}
          />
        </div>
      ) : (
        console.log("No IMAGE HERE")
      )}
      <div className="post__options">
        <div className="post__option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="post__option">
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="post__potion">
          <AccountCircleIcon />
          <ExpandMoreOutlined />
        </div>
      </div>
    </div>
  );
};

export default Post;
