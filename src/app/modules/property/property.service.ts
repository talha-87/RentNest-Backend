import prisma from "../../db/prisma";
import AppError from "../../errors/AppError";
import { ICreateProperty } from "./property.interface";
import { Prisma } from "@prisma/client";


export const createProperty = async (
  payload: ICreateProperty,
  landlordId: string
) => {
  
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  const property = await prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
    include: {
      category: true,
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  return property;
};

export const getAllProperties = async (query: Record<string, any>) => {
  const allowedSortFields = [
    "price",
    "createdAt",
    "bedrooms",
    "bathrooms",
    "area",
  ];

  const {
    location,
    categoryId,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  } = query;

    const safeSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const safeSortOrder = sortOrder === "asc" ? "asc" : "desc";

  const where: Prisma.PropertyWhereInput = {};

  if (location) {
    where.location = {
      contains: location,
      mode: "insensitive",
    };
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (minPrice || maxPrice) {
    where.price = {};

    if (minPrice) {
      where.price.gte = Number(minPrice);
    }

    if (maxPrice) {
      where.price.lte = Number(maxPrice);
    }
  }

  const properties = await prisma.property.findMany({
    where,
    include: {
      category: true,
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
   orderBy: {
  [safeSortBy]: safeSortOrder,
},
  });

  return properties;
};
export const getSingleProperty = async (id: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      reviews: true,
    },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  return property;
};

export const updateProperty = async (
  id: string,
  landlordId: string,
  payload: Partial<ICreateProperty>
) => {
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  if (property.landlordId !== landlordId) {
    throw new AppError(403, "You are not allowed");
  }

  return prisma.property.update({
    where: { id },
    data: payload,
    include: {
      category: true,
    },
  });
};

export const deleteProperty = async (
  id: string,
  landlordId: string
) => {
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  if (property.landlordId !== landlordId) {
    throw new AppError(403, "You are not allowed");
  }

  await prisma.property.delete({
    where: { id },
  });

  return null;
};