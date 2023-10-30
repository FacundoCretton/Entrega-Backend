import { Request, Response } from "express";
import Issue, { IIssue } from "../models/issue";
import { ObjectId } from "mongoose";

export const newIssue = async (req:Request, res:Response) =>{

    const {title, description, priority}: IIssue = req.body;
    const userId: ObjectId = req.body.userConfirmed._id;

    const issueData ={
        title,
        description,
        priority,
        createdAt: new Date(),
        user: userId
    };

    const issue = new Issue (issueData);
    await issue.save();

    res.status(200).json({
        issue
    });




};