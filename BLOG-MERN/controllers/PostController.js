import Post from "../models/Post.model.js";

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статьи ",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось вернуть статью",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена ",
          });
        }

        res.json(doc)
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось найти пост",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new Post({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tegs: req.body.tegs,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error); // тут мы выводим ошибку в кансоль для разработчика
    return res.status(500).json({
      // ответ для пользователя
      messag: "Не удалось добавить пост",
    });
  }
};
