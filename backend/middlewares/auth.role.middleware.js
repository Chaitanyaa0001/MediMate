
const checkrole = (allowedrole) =>{
    return (req,res,next) =>{
        if(!req.user ||  req.user.role !== allowedrole){
            return res.status(403).json({message: `Access denied : only ${allowedrole} are allowed ` })
        }
        next();
    }
}
module.exports = checkrole;