import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as propertyService from "./property.service";
export const createProperty = catchAsync(
  async (req: Request, res: Response) => {
    const landlordId = req.user.userId;

    const result = await propertyService.createProperty(
      req.body,
      landlordId
    );

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: result,
    });
  }
);

export const getAllProperties = catchAsync(
  async (req: Request, res: Response) => {
    const result = await propertyService.getAllProperties(req.query);

    res.status(200).json({
      success: true,
      message: "Properties retrieved successfully",
      data: result,
    });
  }
);

export const getSingleProperty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await propertyService.getSingleProperty(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      message: "Property retrieved successfully",
      data: result,
    });
  }
);

export const updateProperty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await propertyService.updateProperty(
      req.params.id as string,
      req.user.userId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: result,
    });
  }
);

export const deleteProperty = catchAsync(
  async (req: Request, res: Response) => {
    await propertyService.deleteProperty(
      req.params.id as string,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
      data: null,
    });
  }
);