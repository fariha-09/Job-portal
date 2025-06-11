import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    console.log("authheaders is",authHeaders)

     const token=authHeaders.split(" ")[1];
     console.log("token is:",token)
     if (!token) {
     return res.status(401).json({ message: "Unauthorized: No token provided." });
    }
     const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    next();
  } catch (error) {
    console.log("error is",error);
    res.status(401).json({
      message: "Unauthorized user.",
    });
  }
};

export default authentication;
