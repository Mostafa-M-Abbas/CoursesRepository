const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {

    const authHeader = req.headers['Authorization'] || req.headers['authorization']; 

    if (!authHeader) {
        return res.status(401).json({ message: 'Token is required.' });  
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedToken);
        next()
    } catch (err) {
        res.status(401).json({ message: 'Invalid token. Please log in again.' });
    }
}
module.exports = verifyToken