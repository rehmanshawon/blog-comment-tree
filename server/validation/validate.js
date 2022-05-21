const Joi = require("joi");

const registrationValidation = (formData) => {
  const schema = Joi.object({
    firstName: Joi.string().required().max(20),
    lastName: Joi.string().required().max(20),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });
  return schema.validate(formData);
};

const loginValidation = (formData) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });
  return schema.validate(formData);
};

const createBlogValidation = (formData) => {
  const schema = Joi.object({
    blogTitle: Joi.string().required().max(200),
    blogBody: Joi.string().required().max(5000),
    blogWriter: Joi.string().required(),
  });
  return schema.validate(formData);
};

const createCommentValidation = (formData) => {
  const schema = Joi.object({
    commentor: Joi.string().required().default("Anonymous"),
    comment: Joi.string().required().max(5000),
    parentBlog: Joi.string().required(),
    parentComment: Joi.required().default(null),
  });
  return schema.validate(formData);
};

module.exports = {
  registrationValidation,
  loginValidation,
  createBlogValidation,
  createCommentValidation,
};
