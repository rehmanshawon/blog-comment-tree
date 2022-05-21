import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { storeAllComments } from "./stateSlices/allCommentsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const NewComment = ({
  parentBlogId,
  parentCommentId,
  topmost,
  setReplying,
}) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      commentor: "Anonymous",
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("Please write your blog before posting"),
    }),
    onSubmit: async (values) => {
      const commentData = {
        ...values,
        parentBlog: parentBlogId,
        parentComment: parentCommentId,
      };
      //console.log(parentBlogId, parentCommentId);
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/comments/createComment",
          commentData
        );
        if (data) {
          //console.log(data);
          dispatch(storeAllComments());
          if (!topmost)
            setTimeout(() => {
              setReplying(false);
              setShow(false);
            }, 250);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  //   React.useEffect(() => {
  //     if (blogsCreated) {
  //       // history.push(`/blogView/${blogsCreated.id}`);
  //     }
  //   }, [blogsCreated]);
  var classString = topmost
    ? "form-group col-10 col-sm-8 col-md-5 mx-auto"
    : "form-group mx-auto";
  if (show) {
    return (
      <div
        className="blog-form-container"
        style={topmost ? { marginLeft: "370px", minWidth: "70vw" } : {}}
      >
        <div className="mx-auto">
          <h4 className="font-weight-bold">Add Comment</h4>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className={classString + "mt-1"}>
            <input
              className="form-control form-control-lg"
              id="commentor"
              name="commentor"
              placeholder="Enter your name or remain anonymous"
              {...formik.getFieldProps("commentor")}
            />
            {formik.touched.commentor && formik.errors.commentor ? (
              <small className="form-text text-danger">
                {formik.errors.commentor}
              </small>
            ) : null}
          </div>
          <div className={classString + "my-3"}>
            <textarea
              className="form-control form-control-lg"
              id="comment"
              name="comment"
              placeholder="Comment"
              rows={10}
              cols={50}
              {...formik.getFieldProps("comment")}
            />
            {formik.touched.comment && formik.errors.comment ? (
              <small className="form-text text-danger">
                {formik.errors.comment}
              </small>
            ) : null}
          </div>
          <div className="mx-auto">
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block"
              // onClick={(event) => {
              //   event.preventDefault();
              //   handleReply();
              // }}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
};
export default NewComment;
