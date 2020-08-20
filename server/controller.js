const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {name, email, password} = req.body;
        console.log(name, email, password)
        const existingUser = await db.check_user(email);
        if (existingUser[0]) {
            return res.status(409).send('user already exists')
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = await db.create_user([name, email, hash])
            req.session.user = {
                userId: newUser[0].user_id,
                name: newUser[0].name,
                email: newUser[0].email
            }
            res.status(200).send(req.session.user)
        }
    },
    getUser: (req, res) => {
        if(req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send('yikes, why is this broken')
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200)
    }
}