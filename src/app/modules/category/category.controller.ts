import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as categoryService from "./category.service";

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  }
);

export const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.getAllCategories();

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });
  }
);