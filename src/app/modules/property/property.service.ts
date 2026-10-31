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
  // Step 1: Property আছে কি না পরীক্ষা
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  // Step 2: Property-র মালিক কি না পরীক্ষা
  if (property.landlordId !== landlordId) {
    throw new AppError(403, "You are not allowed");
  }

  // Step 3: Category পরিবর্তন হলে সেটি পরীক্ষা
  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: payload.categoryId },
    });

    if (!category) {
      throw new AppError(404, "Category not found");
    }
  }

  // Step 4: শুধু Database-এ থাকা বৈধ Field নেওয়া
  const {
    title,
    description,
    location,
    price,
    bedrooms,
    bathrooms,
    area,
    image,
    available,
    categoryId,
  } = payload;

  const updateData: Prisma.PropertyUncheckedUpdateInput = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (location !== undefined) updateData.location = location;
  if (price !== undefined) updateData.price = price;
  if (bedrooms !== undefined) updateData.bedrooms = bedrooms;
  if (bathrooms !== undefined) updateData.bathrooms = bathrooms;
  if (area !== undefined) updateData.area = area;
  if (image !== undefined) updateData.image = image;
  if (available !== undefined) updateData.available = available;
  if (categoryId !== undefined) updateData.categoryId = categoryId;

  // Step 5: Property Update
  return prisma.property.update({
    where: { id },
    data: updateData,
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


  const rentalRequestCount = await prisma.rentalRequest.count({
    where: { propertyId: id },
  });

  if (rentalRequestCount > 0) {
    throw new AppError(
      400,
      "This property has rental history and cannot be deleted. Please mark it as inactive instead."
    );
  }

  await prisma.property.delete({
    where: { id },
  });

  return null;
};
