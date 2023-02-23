import Post from "../models/Post.model.js"

export const create = async (req, res) => {
    try {
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tegs: req.body.tegs,
            user: req.userId,
        })
        const post = await doc.save()
        res.json(post);
    } catch (error) {
        console.log(error); // тут мы выводим ошибку в кансоль для разработчика 
        return res.status(500).json({ // ответ для пользователя 
            messag: 'Не удалось добавить пост'
        })
    }
}