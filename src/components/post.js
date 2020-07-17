import React, { useState, useEffect } from "react";
import "../App.css";

const Post = (props) => {

  const [visible, setVilible] = useState(false);

  useEffect(() => {
    setVilible(true);
  }, []);

  return (
    <div className={visible?'fadeInSmall':'fadeOut'}>
      <div className="smallerBox">
        <span className="subtitle">Title:</span> <span>{props.data.title}</span>
        <br /> <br />
        <span className="subtitle">Body:</span> <span>{props.data.body}</span>
      </div>
    </div>
  );
};

export default Post;
