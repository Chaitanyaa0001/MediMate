const  jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;  

const generatetoken  = async ( id,role) =>{
    const token = jwt.sign({ id,role},JWT_SECRET);
    return token;
}
module.exports = generatetoken;
