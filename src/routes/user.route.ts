import { Router } from 'express';
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from '../controllers/user.controller'; // Lägg till sökvägen till din user.controller-fil
import { asyncHandler } from '../asyncHandler'; // Lägg till sökvägen till din asyncHandler-fil

// Users layout Route
const userRoute = Router();

userRoute.post('', asyncHandler(createUser));
userRoute.get('', asyncHandler(getUsers));
userRoute.get('/:userid', asyncHandler(getUser));
userRoute.delete('/:userid', asyncHandler(deleteUser));
userRoute.patch('/:userid', asyncHandler(updateUser));

export default userRoute;