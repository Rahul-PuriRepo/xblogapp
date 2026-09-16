const User = require("../models/User");
const Post = require("../models/Post");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "name email avatar role"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const postCount = await Post.countDocuments({
      author: user._id,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      postCount,
    });
  } catch (error) {
    console.error("Get user profile error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email avatar role"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const postCount = await Post.countDocuments({
      author: user._id,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      postCount,
    });
  } catch (error) {
    console.error("Get my profile error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    await user.save();

    const postCount = await Post.countDocuments({
      author: user._id,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      postCount,
    });
  } catch (error) {
    console.error("Update my profile error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user.id,
    })
      .populate("author", "name email avatar role")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Get my posts error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getUserProfile,
  getMyProfile,
  updateMyProfile,
  getMyPosts,
};