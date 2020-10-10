import React from "react";
import "./StoryReel.css";
import Story from "./Story";

const StoryReel = () => {
  return (
    <div className="storyReel">
      <Story
        image="https://mk0laterblogouwugirk.kinstacdn.com/wp-content/uploads/2019/01/How-Often-to-Post-to-Facebook-Stories.png"
        profilePic=""
        title="Suhail"
      />
      <Story
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBHQC2s4NFdzXEsVzeBPGjkrSePQa-8XFuNtQ&usqp=CAU"
        profilePic=""
        title=""
      />
      <Story image="" profilePic="" title="" />
      <Story image="" profilePic="" title="" />
      <Story image="" profilePic="" title="" />
    </div>
  );
};
export default StoryReel;
