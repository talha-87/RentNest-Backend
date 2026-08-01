import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as reviewService from "./review.service";

export const createReview = catchAsync(
  async (req: Request, res: Response) => {
    const result = await reviewService.createReview(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: result,
    });
  }
);