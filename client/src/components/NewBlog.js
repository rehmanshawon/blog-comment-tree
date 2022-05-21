import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { storeAllBlogs } from "./stateSlices/allBlogsSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const NewBlog = ({ history }) => {
  const [blogsCreated, setBlogsCreated] = useState(null);
  const { loggedInUser } = useSelector((state) => state.login);

  !loggedInUser && history.push("/login");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      blogTitle: "Untitled",
      blogBody: "",
    },
    validationSchema: Yup.object({
      blogTitle: Yup.string().required("Please enter a title for the blog."),
      blogBody: Yup.string().required("Please write your blog before posting"),
    }),
    onSubmit: async (values) => {
      const blogData = { ...values, blogWriter: loggedInUser.id };
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/blogs/createblog",
          blogData
        );
        dispatch(storeAllBlogs());
        setBlogsCreated(data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  React.useEffect(() => {
    if (blogsCreated) {
      history.push(`/blogView/${blogsCreated.id}`);
    }
  }, [blogsCreated]);

  return (
    <div className="blog-form-container">
      <div className="col-10 col-sm-8 col-md-5 mx-auto">
        <h1 className="font-weight-bold">New Blog</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group col-10 col-sm-8 col-md-5 mx-auto mt-5">
          <input
            className="form-control form-control-lg"
            id="blogTitle"
            name="blogTitle"
            placeholder="Blog Title"
            //type="text"
            {...formik.getFieldProps("blogTitle")}
          />
          {formik.touched.blogTitle && formik.errors.blogTitle ? (
            <small className="form-text text-danger">
              {formik.errors.blogTitle}
            </small>
          ) : null}
        </div>
        <div className="form-group col-10 col-sm-8 col-md-5 mx-auto my-3">
          <textarea
            className="form-control form-control-lg"
            id="blogBody"
            name="blogBody"
            placeholder="Write your blog/article here"
            rows={25}
            cols={50}
            {...formik.getFieldProps("blogBody")}
          />
          {formik.touched.blogBody && formik.errors.blogBody ? (
            <small className="form-text text-danger">
              {formik.errors.blogBody}
            </small>
          ) : null}
        </div>
        <div className="col-10 col-sm-8 col-md-5 mx-auto">
          <button type="submit" className="btn btn-lg btn-primary btn-block">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewBlog;
