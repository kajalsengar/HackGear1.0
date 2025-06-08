const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // serve uploaded files

// MongoDB Connection
// mongoose.connect('mongodb://127.0.0.1:27017/notesApp', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
// });
mongoose.connect('mongodb://localhost:27017/notesApp')

// MongoDB Schema
const NoteSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  timestamp: Number
});
const Note = mongoose.model('Note', NoteSchema);

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '_' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  const { title } = req.body;
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  const newNote = new Note({ title, imageUrl, timestamp: Date.now() });
  await newNote.save();
  res.json({ success: true, note: newNote });
});

// Fetch all notes
app.get('/notes', async (req, res) => {
  const notes = await Note.find().sort({ timestamp: -1 });
  res.json(notes);
});

// Start server

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
