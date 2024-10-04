import { Request, Response } from 'express';
import prisma from '../client';

// Creating a user
export async function createUser(req: Request, res: Response) {
    try {
        const user = await prisma.user.create({
            data: req.body,
        });

        res.status(201).json({
            status: true,
            message: 'User Successfully Created',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Server error',
        });
    }
}

// Get all users
export async function getUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany();

        res.json({
            status: true, // Fixed typo here
            message: 'Users Successfully Fetched',
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Server error',
        });
    }
}

// Get single user
export async function getUser(req: Request, res: Response) {
    const { userid } = req.params;
    try {
        const user = await prisma.user.findFirst({
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
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Server error',
        });
    }
}

// Delete user
export async function deleteUser(req: Request, res: Response) {
    const { userid } = req.params;
    try {
        const user = await prisma.user.findFirst({
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

        await prisma.user.delete({
            where: {
                id: userid,
            },
        });

        res.json({
            status: true,
            message: 'User Successfully Deleted',
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Server error',
        });
    }
}

// Update user
export async function updateUser(req: Request, res: Response) {
    try {
        const { userid } = req.params;

        const user = await prisma.user.findFirst({
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

        const updatedUser = await prisma.user.update({ // Fixed typo here
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
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Server error',
        });
    }
}
