import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as paymentService from "./payment.service";

export const createPayment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await paymentService.createPayment(
      req.body.rentalRequestId,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      message: "Payment intent created successfully",
      data: result,
    });
  }
);

export const confirmPayment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await paymentService.confirmPayment(
      req.body.paymentId,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Payment confirmed successfully",
      data: result,
    });
  }
);

export const getMyPayments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await paymentService.getMyPayments(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Payments retrieved successfully",
      data: result,
    });
  }
);

export const getSinglePayment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await paymentService.getSinglePayment(
      req.params.id as string,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Payment retrieved successfully",
      data: result,
    });
  }
);