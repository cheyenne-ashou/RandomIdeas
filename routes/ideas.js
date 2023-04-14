const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const Idea = require("../models/Idea");

// Get all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find(); // find method on our Idea model
    console.log(ideas);
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, error: "Something went wrong with the server" });
  }
});

// Get single ideas
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    return res.json({ success: true, data: idea });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
});

// Add an idea
router.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Update an idea
router.put("/:id", async (req, res) => {
  // const idea = ideas.find((idea) => idea.id === +req.params.id);

  // if (!idea) {
  //   return res
  //     .status(404)
  //     .json({ success: false, error: "Resource not found" });
  // }
  // idea.text = req.body.text || idea.text;
  // idea.tag = req.body.tag || idea.tag;

  // res.json({ success: true, data: idea });
  try {
    const idea = await Idea.findById(req.params.id);
    //Match the usernames
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updatedIdea });
    }
    // Usernames do not match
    res.status(403).json({
      success: false,
      error: "Not authorized to update this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// delete an idea
router.delete("/:id", async (req, res) => {
  // const idea = ideas.find((idea) => idea.id === +req.params.id);

  // if (!idea) {
  //   return res
  //     .status(404)
  //     .json({ success: false, error: "Resource not found" });
  // }
  // const index = ideas.indexOf(idea);
  // ideas.splice(index, 1);
  try {
    const idea = await Idea.findById(req.params.id);
    //Match the usernames
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }
    // Usernames do not match
    res.status(403).json({
      success: false,
      error: "Not authorized to delete this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
