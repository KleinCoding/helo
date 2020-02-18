async function allPosts(req, res) {
    const db = req.app.get("db");
    const posts = await db.posts.getAllPosts();
    res.status(200).json(posts);
  }
  
  async function postById(req, res) {
    const {post_id} = req.query;
    const db = req.app.get("db");
    const posts = await db.posts.getPostsById(post_id);
    console.log("postController, getting post by ID", post_id);
    res.status(200).json(posts);
  }
  
  async function addPost(req, res) {
    const { pic, pet_name, breed, age, gender, fixed, bio, rating } = req.body;
    const user_id = req.session.user.user_id;
    const org_id = req.session.user.org_id;
  
    const db = req.app.get("db");
  
    const addedPost = await db.posts.addPost([
      user_id,
      pic,
      pet_name,
      breed,
      age,
      gender,
      fixed,
      bio,
      rating,
      org_id
    ]);
    console.log(addedPost);
    res.status(200).json(addedPost);
  }
  
  
  async function editPost(req, res) {
    const { post_text } = req.body;
    const post_id = +req.params.post_id;
    const user_id = 4;
    const db = req.app.get("db");
    const editedPost = await db.posts.editPost([
      post_text,
      post_id,
      user_id
    ]);
  
    console.log("editPost in postController", editedPost);
    res.status(200).json(editedPost);
  }
  
  async function deletePost(req, res) {
    const post_id = +req.params.post_id;
    const user_id = req.session.user.user_id;
    const db = req.app.get("db");
    console.log("Deleting Post in postsController");
    const updatedPosts = await db.posts.deletePost([post_id, user_id]);
  
    res.status(200).json(updatedPosts);
  }
  module.exports = {
    allPosts,
    postById,
    addPost,
    editPost,
    deletePost
  };
  