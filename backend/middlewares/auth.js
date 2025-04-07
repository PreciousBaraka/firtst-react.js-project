import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeaders = req.headers["authorization"];

  if (!authHeaders) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeaders.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SEC);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeDoctor = (roles) => {
  return (req, res, next) => {
    if (Array.isArray(roles)) {
      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Not authorized for this role" });
      }
      next();
    }else {
        return res.status(403).json({message:"Roles should be an array"})
    }
  };
};
