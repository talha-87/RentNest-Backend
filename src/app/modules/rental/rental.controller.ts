import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as rentalService from "./rental.service";

export const createRental = catchAsync(
  async (req: Request, res: Response) => {
    const result = await rentalService.createRental(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      message: "Rental request submitted successfully",
      data: result,
    });
  }
);

export const getMyRentals = catchAsync(
  async (req: Request, res: Response) => {
    const result = await rentalService.getMyRentals(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Rental requests retrieved successfully",
      data: result,
    });
  }
);

export const getSingleRental = catchAsync(
  async (req: Request, res: Response) => {
    const result = await rentalService.getSingleRental(
      req.params.id as string,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Rental request retrieved successfully",
      data: result,
    });
  }
);

export const getLandlordRentals = catchAsync(
  async (req: Request, res: Response) => {
    const result = await rentalService.getLandlordRentals(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Rental requests retrieved successfully",
      data: result,
    });
  }
);

export const updateRentalStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await rentalService.updateRentalStatus(
      req.params.id as string,
      req.user.userId,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Rental request updated successfully",
      data: result,
    });
  }
);