const AuthService = require('../services/authService');

const authService = new AuthService

exports.login = async (req, res) => {
    const { email, senha} = req.body;

    try {
        const login = await authService.login({email, senha});

        res.status(200).send(login);
        
    } catch (error) {
        res.status(401).send({message: error.message});
    }

}
