import mongoose from "mongoose"; // Импорт библиотеки могус

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // говорим что этот пункт обязателен
    },
    text: {
      type: String,
      required: true, // говорим что этот пункт обязателен
    },
    tags: {
      type: Array,
      default: [], // говорим что этот пункт обязателен
    },
    viewsCount: {
      type: Number,
      default: 0, // дефолтно
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // говорим что этот пункт обязателен
    },
    imageUrl: String,
  },
  {
    timestamps: true, // при создание любой сущности будут дата создание и обновление этой сущности
  }
);

export default mongoose.model("Post", PostSchema);
