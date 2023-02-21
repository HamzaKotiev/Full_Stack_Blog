import jwt from "jsonwebtoken";

export default async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        const [type, token] = authorization.split(' ');//Не забудь пробел в условии ибо имено им в токене разделяют его тип и сам токен)


        if (token) {

            if (type === 'Bearer') {
                try {

                    const decoded = await jwt.verify(token, 'secret_key');

                    req.userId = decoded._id;
                    next();
                } catch (error) {

                    return res.status(401).json({ message: 'Нет доступа ' })
                }
            } else {
                return res.status(400).json({ message: 'что то пошло не так  ' })
            }
        } else {
            return res.status(401).json({ message: 'нет доступа ' })
        }



    } catch (error) {
        res.json({ error: error.message })
    }

}
