import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeAllBlogs } from "./stateSlices/allBlogsSlice";
import { storeAllComments } from "./stateSlices/allCommentsSlice";
import Blog from "./Blog";
import Pagination from "./Pagination";

const Welcome = () => {
  const { loggedInUser } = useSelector((state) => state.login);
  const { blogs, error } = useSelector((state) => state.allBlogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeAllBlogs());
    dispatch(storeAllComments());
  }, []);

  if (error) return <h1>{error}</h1>;

  return (
    <div className="display-3 text-center mt-5">
      <p> Welcome {loggedInUser ? loggedInUser.firstName : "Guest"}</p>
      {blogs && blogs.length > 0 ? (
        <>
          <Pagination
            data={blogs}
            RenderComponent={Blog}
            title="Blogs"
            pageLimit={5}
            dataLimit={10}
          />
        </>
      ) : (
        <h1>No Posts to display</h1>
      )}
    </div>
  );
};
export default Welcome;
