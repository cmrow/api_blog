import getTokenFromHeader from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';
import User from  '../models/User.js';

export const isLoggedIn = async(req, res, next) => {
    //get token from header
    const token = getTokenFromHeader(req);
    //verify the token
    const decoded = verifyToken(token);

    if (!decoded) {
        throw new Error('Invalid/expired token, pleace login again.');
    } else {
       //find the user by id
       try {
           const user = await User.findById(decoded?.id).select("-password");
           req.user = user;
        
           next();
       } catch (error) {
            throw new Error(error);
       }
    }

};

export default isLoggedIn;