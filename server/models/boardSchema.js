import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  boards: [
    {
      boardId: { type: String, required: true },
      name: { type: String, required: true },
      imageUrl: { type: String },
      members: [String],
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Board = mongoose.model('Board', BoardSchema);

export default Board;
