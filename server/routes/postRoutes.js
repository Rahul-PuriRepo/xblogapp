const express = require("express");

const {
  createPost,
  getPostById,
  updatePost,
  getAllPosts,
  likePost,
  deletePost,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPost);
router.get("/:id", protect, getPostById);
router.put("/:id", protect, updatePost);
router.get("/", protect, getAllPosts);
router.post("/:id/like", protect, likePost);
router.delete("/:id", protect, deletePost);

module.exports = router;