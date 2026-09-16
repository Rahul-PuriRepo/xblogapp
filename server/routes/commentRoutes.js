const express = require("express");

const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/posts/:id/comments", protect, createComment);
router.get("/posts/:id/comments", protect, getComments);
router.delete("/comments/:comment_id", protect, deleteComment);

module.exports = router;