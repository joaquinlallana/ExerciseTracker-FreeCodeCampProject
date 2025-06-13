const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

//Importar modelos
const User = require("./models/users.js");
const Exercise = require("./models/exercise.js");

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo DB Atlas");
  })
  .catch((err) => {
    console.error("Error to connect", err.message);
  });

// Rutas
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", async (req, res) => {
  const user = req.body.username;

  try {
    const newUser = new User({ username: user });
    const savedUser = await newUser.save();
    res.json({
      username: savedUser.username,
      _id: savedUser._id,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error creating user" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "username _id");
    res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching users" });
  }
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  const userId = req.params._id;
  const { description, duration } = req.body;
  const date = req.body.date ? new Date(req.body.date) : new Date();

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newExercise = new Exercise({
      userId: userId,
      description,
      duration: parseInt(duration),
      date: date,
    });

    const savedExercise = await newExercise.save();

    res.json({
      _id: user._id,
      username: user.username,
      description: savedExercise.description,
      duration: savedExercise.duration,
      date: savedExercise.date.toDateString(),
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating exercise" });
  }
});

app.get("/api/users/:_id/logs", async (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let filter = { userId: userId };

    if (from || to) {
      filter.date = {};
      if (from) {
        filter.date.$gte = new Date(from);
      }
      if (to) {
        filter.date.$lte = new Date(to);
      }
    }

    let query = Exercise.find(filter).select("description duration date");

    if (limit) {
      query = query.limit(parseInt(limit));
    }
    const exercises = await query.exec();

    const log = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    }));

    res.json({
      _id: user._id,
      username: user.username,
      count: log.length,
      log: log,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching logs" });
  }
});

// Levantar el servidor
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
