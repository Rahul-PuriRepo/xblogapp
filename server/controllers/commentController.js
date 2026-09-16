const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      text,
      post: post._id,
      author: req.user.id,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Create comment error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.id,
    })
      .populate("author", "name email avatar role")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Get comments error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.comment_id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this comment",
      });
    }

    await Comment.findByIdAndDelete(req.params.comment_id);

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete comment error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createComment,
  getComments,
  deleteComment,
};