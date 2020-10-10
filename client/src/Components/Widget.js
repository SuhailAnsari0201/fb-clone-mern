import React from "react";
import "./Widget.css";

const Widget = () => {
  return (
    <div className="widget">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FEngineer-Babu-1205159129660950%2F&tabs=timeline&width=340&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="340"
        height="700"
        style={{ border: "none", overflow: "hidden", padding: "5px" }}
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default Widget;
