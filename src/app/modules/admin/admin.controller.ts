import { Request, Response } from "express";
import { adminService } from "./admin.service";
import catchAsync from "../../utils/catchAsync";

const getAllUsers = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adminService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  }
);

const updateUserStatus = catchAsync(
  async (req: Request, res: Response) => {
   const result = await adminService.updateUserStatus(
  req.params.id as string,
  req.body.status
);

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  }
);

const getAllProperties = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adminService.getAllProperties();

    res.status(200).json({
      success: true,
      message: "Properties retrieved successfully",
      data: result,
    });
  }
);

const getAllRentals = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adminService.getAllRentals();

    res.status(200).json({
      success: true,
      message: "Rental requests retrieved successfully",
      data: result,
    });
  }
);

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentals,
};