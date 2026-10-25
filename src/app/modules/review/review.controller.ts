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


export const getReviewsByProperty = catchAsync(
  async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId;

    if (typeof propertyId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
      return;
    }

    const result = await reviewService.getReviewsByProperty(propertyId);

    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: result,
    });
  }
);
