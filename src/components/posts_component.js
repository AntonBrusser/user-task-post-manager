import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import Post from "./post";

const Posts = (props) => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isShown, setIsShown] = useState(false);
  const [title, setTitle] = useState("");
  const [postBody, setBody] = useState("");

  const [visible, setVilible] = useState(false);

  let posts = data.chosen.postArr;
  let listPosts = [];

  useEffect(() => {
    setVilible(true);
  }, []);

  useEffect(() => {
    setIsShown(false);
    setTitle("");
    setBody("");
  }, [posts]);

  if (posts) {
    if (posts[posts.length - 1] === undefined) {
      posts.splice(-1,1)
    }
    listPosts = posts.map((post) => <Post key={post.id} data={post} />);
  }

  let clear = () => {
    setIsShown(false);
    setTitle("");
    setBody("");
  };

  return (
    <div className={visible ? "fadeInSmall" : "fadeOut"}>
      <div className="box" style={{ padding: "1em" }}>
        <input
          className="backButton"
          type="button"
          value="<"
          onClick={async () => {
            dispatch({
              type: "Users",
            });
          }}
        />
        <span className="title">Posts</span>
        <input
          className="buttonRight"
          type="button"
          value="+ Add"
          onClick={() => setIsShown(true)}
        />
        <div>
          {isShown && (
            <div className="smallerBox" style={{ height: "6.5em" }}>
              <span>Title:</span>
              <input
                className="input"
                type="text"
                style={{ marginLeft: "0.8em" }}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />

              <lable>Body:</lable>
              <textarea
                name=""
                id=""
                cols="22"
                rows="3"
                className="input"
                style={{ verticalAlign: "top" }}
                onChange={(e) => setBody(e.target.value)}
              >
                {" "}
              </textarea>

              <br />
              <input
                className="buttonLeft"
                type="button"
                value="Cancel"
                onClick={clear}
              />
              <input
                className="buttonRight"
                type="button"
                value="Add"
                onClick={async () => {
                  dispatch({
                    type: "AddPost",
                    payload: {
                      title: title,
                      body: postBody,
                    },
                  });
                  setIsShown(false);
                  setTitle("");
                }}
              />
            </div>
          )}
          {listPosts}
        </div>
      </div>
    </div>
  );
};

export default Posts;
