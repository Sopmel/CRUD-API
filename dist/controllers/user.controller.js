var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../client';
// Creating a user
export function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.create({
                data: req.body,
            });
            res.status(201).json({
                status: true,
                message: 'User Successfully Created',
                data: user,
            });
        }
        catch (error) {
            res.status(500).json({
                status: false,
                message: 'Server error',
            });
        }
    });
}
// Get all users
export function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prisma.user.findMany();
            res.json({
                status: true, // Fixed typo here
                message: 'Users Successfully Fetched',
                data: users,
            });
        }
        catch (error) {
            res.status(500).json({
                status: false,
                message: 'Server error',
            });
        }
    });
}
// Get single user
export function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userid } = req.params;
        try {
            const user = yield prisma.user.findFirst({
                where: {
                    id: userid,
                },
            });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'User not found',
                });
            }
            res.json({
                status: true,
                message: 'User Successfully Fetched',
                data: user,
            });
        }
        catch (error) {
            res.status(500).json({
                status: false,
                message: 'Server error',
            });
        }
    });
}
// Delete user
export function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userid } = req.params;
        try {
            const user = yield prisma.user.findFirst({
                where: {
                    id: userid,
                },
            });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'User not found',
                });
            }
            yield prisma.user.delete({
                where: {
                    id: userid,
                },
            });
            res.json({
                status: true,
                message: 'User Successfully Deleted',
            });
        }
        catch (error) {
            res.status(500).json({
                status: false,
                message: 'Server error',
            });
        }
    });
}
// Update user
export function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userid } = req.params;
            const user = yield prisma.user.findFirst({
                where: {
                    id: userid,
                },
            });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'User not found',
                });
            }
            const updatedUser = yield prisma.user.update({
                where: {
                    id: userid,
                },
                data: req.body,
            });
            res.json({
                status: true,
                message: 'User Successfully Updated',
                data: updatedUser,
            });
        }
        catch (error) {
            res.status(500).json({
                status: false,
                message: 'Server error',
            });
        }
    });
}
