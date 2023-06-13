const dataHandling = require("./functions")

const jwt =require("jsonwebtoken");
const  config = require("./config/jwt-secert.json");


const GenerateToken = async (SignObject) => {
    const Token = jwt.sign(SignObject, config.TOKEN_KEY, { expiresIn: "2h", });
    const RefreshToken = await dataHandling.Create("RefreshTokens", { SignObject, "Token": Token, "Valid": true });
    return { "Token": Token, "RefreshToken": RefreshToken };
}
const decodeIDToken = (
   
    req,
   
    res,
   
    next 
   ) => {
   // Bearer <token>>
   const authHeader = req.headers.authorization || " ";
   const token = authHeader.split(" ")[1];
   if (!token) {
       return res.status(403).send("A token is required for authentication");
   }
   try {
       // @ts-ignore
       const { user } = jwt.verify(token, config.TOKEN_KEY);
       // @ts-ignore
       req.body = user;
   } catch (err) {
       return res.status(401).send("Invalid Token");
   }
   return next();
};

module.exports={
    GenerateToken,
    decodeIDToken
}