import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { registerUser, loginUser, getMe } from "./auth.service";

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await loginUser(
    req.body.email,
    req.body.password
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});


export const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await getMe(req.user.userId);

  res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});