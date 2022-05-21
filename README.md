# blog-comment-tree
Client
      React + Redux Toolkit + Axios + Formik + Bootstrap
Server
      Node + Express + Mongoose + MongoDB Atlas

Nested Blog - Comment - Tree

Redux toolkit Slices
1. All Blogs
2. All Comments
3. Login
4. Register
5. Password Reset
6. Password Reset Email

1. Login Register Facility
2. Only Registered User can create new blog
3. Any one can anonymously or with name add comments
4. Nested comments unlimited nesting levels
5. Last comment shows up at top
6. 3 Collections in MongoDB - users, blogs, comments
7. Recursive Component Rendering technique has been used for Comment nesting
8. Comment documents have been flattened as parent-children tree before pushing them to recursive comment component
9. Simple dynamic object field/key creating technique has been applied to an existing comment list
10. Mongoose populate has been used to join two collections on references
11. File names tell what they do.
 
Please visit this App Preview Link:
https://blog-comment-tree.herokuapp.com/

Thank you.
