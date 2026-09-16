const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, content, tags, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const post = await Post.create({
      title,
      content,
      tags: Array.isArray(tags) ? tags : [],
      image: image || "",
      author: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Create post error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email avatar role");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Get post error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, tags, image } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this post",
      });
    }

    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (tags !== undefined) post.tags = Array.isArray(tags) ? tags : [];
    if (image !== undefined) post.image = image;

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Update post error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email avatar role")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Get all posts error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.some(
      (userId) => userId.toString() === req.user.id.toString()
    );

    if (alreadyLiked) {
      return res.status(400).json({
        message: "Post already liked",
      });
    }

    post.likes.push(req.user.id);

    await post.save();

    res.status(200).json({
      message: "Post liked",
      totalLikes: post.likes.length,
    });
  } catch (error) {
    console.error("Like post error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this post",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createPost,
  getPostById,
  updatePost,
  getAllPosts,
  likePost,
  deletePost,
};