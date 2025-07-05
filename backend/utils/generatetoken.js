const  jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;  

const generatetoken  = async () =>{
    const token = jwt.sign({id: id, JWT_SECRET});
    return token;
}
module.exports = generatetoken;
