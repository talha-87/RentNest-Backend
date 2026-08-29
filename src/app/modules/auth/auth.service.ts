import bcrypt from "bcrypt";
import prisma from "../../db/prisma";
import config from "../../config";
import { IRegisterUser } from "./auth.interface";
import AppError from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";

export const registerUser = async (payload: IRegisterUser) => {
  const { name, email, password, phone, role } = payload;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    config.bcryptSaltRounds
  );

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    },
  });

  const { password: _, ...userWithoutPassword } = user;

return userWithoutPassword;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid credentials");
  }
  if (user.status === "BANNED") {
  throw new AppError(403, "Your account has been banned");
}

  const options: SignOptions = {
    expiresIn: config.jwt.accessTokenExpiresIn as StringValue,
  };

  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt.accessTokenSecret,
    options
  );

  const { password: _, ...userWithoutPassword } = user;

  return {
    accessToken,
    user: userWithoutPassword,
  };
};


export const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};