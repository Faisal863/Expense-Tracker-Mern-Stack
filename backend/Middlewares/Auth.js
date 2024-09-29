
const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req, res, next) => {
    console.log('Middleware invoked');
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is require' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}


// const ensureAuthenticated = (req, res, next) => {
//     console.log('Middleware invoked');
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) {
//         console.log('No token provided');
//         return res.status(401).json({ message: "Unauthorized" });
//     }
    
//     jwt.verify(token, secret, (err, decoded) => {
//         if (err) {
//             console.log('Token verification failed');
//             return res.status(401).json({ message: "Unauthorized" });
//         }
//         req.user = { _id: decoded.id };
//         console.log('User authenticated:', req.user);
//         next();
//     });
// };

module.exports = ensureAuthenticated;