import { Request, Response } from "express";
import ReadingList from "../models/ReadingList";
import Book from "../models/book";

export const addtoreadinglist = async (req: Request, res: Response) => {
    const { userId, bookId } = req.body;
    try {
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        const readingListItem = await ReadingList.create({ userId, bookId });
        return res.status(201).json(readingListItem);
    } catch (error) {
        console.error("Error adding to reading list:", error);
        return res.status(500).json({ message: "Error adding to reading list" });
    }
};

export const getReadingList = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const readingList = await ReadingList.findAll({
            where: { userId },
            include: [{ model: Book, as: "book" }],
        });
        return res.status(200).json(readingList);
    } catch (error) {
        console.error("Error fetching reading list:", error);
        return res.status(500).json({ message: "Error fetching reading list" });
    }
};

export const updateReadingList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const readingListItem = await ReadingList.findByPk(id);
        if (!readingListItem) {
            return res.status(404).json({ message: "Reading list item not found" });
        }
        readingListItem.status = status;
        await readingListItem.save();
        return res.status(200).json(readingListItem);
    } catch (error) {
        console.error("Error updating reading list:", error);
        return res.status(500).json({ message: "Error updating reading list" });
    }
};

export const deleteFromReadingList = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const readingListItem = await ReadingList.findByPk(id);
        if (!readingListItem) {
            return res.status(404).json({ message: "Reading list item not found" });
        }
        await readingListItem.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting from reading list:", error);
        return res.status(500).json({ message: "Error deleting from reading list" });
    }
};