import mongoose from "mongoose"; // Импорт библиотеки могус

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true, // говорим что этот пункт обязателен
    },
    email: {
      type: String,
      required: true, // говорим что этот пункт обязателен
      unique: true, // говорит о уникальности этого пункта
    },
    passwordHash: {
      type: String,
      required: true, // говорим что этот пункт обязателен
    },
    avatarUrl: String,
  },
  {
    timestamps: true, // при создание любой сущности будут дата создание и обновление этой сущности
  }
);

export default mongoose.model("User", UserSchema);
