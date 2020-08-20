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
    login: async (req, res) => {
        const db = req.app.get('db')
        const {email, password} = req.body;
        const existingUser = await db.check_user(email);
        if (!existingUser[0]){
            res.sendStatus(404)
        } else {
            const authenticated = bcrypt.compareSync(password, existingUser[0].password)
            if (authenticated) {
                req.session.user = {
                    userId: existingUser[0].user_id,
                    name: existingUser[0].name,
                    email: existingUser[0].email
                }
                res.status(200).send(req.session.user)
            }
            else {
                res.status(403).send('Sorry, bogus credentials.')
            }
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
    },
    getPosts: async (req, res) => {
        const {userId} = req.params;
        console.log(userId)
        const db = req.app.get('db');
        const posts = await db.get_my_posts(+userId);
        res.status(200).send(posts);
        
    }
}