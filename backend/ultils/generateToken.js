import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, "secretOrPrivateKey", {
        expiresIn: '14d',
    });
};

export default generateToken;
