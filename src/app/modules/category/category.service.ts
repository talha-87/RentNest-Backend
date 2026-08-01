import prisma from "../../db/prisma";
import AppError from "../../errors/AppError";
import { ICreateCategory } from "./category.interface";

export const createCategory = async (payload: ICreateCategory) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (existingCategory) {
    throw new AppError(409, "Category already exists");
  }

  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};