import prisma from "../../db/prisma";
import AppError from "../../errors/AppError";
import { ICreateReview } from "./review.interface";

export const createReview = async (
  payload: ICreateReview,
  tenantId: string
) => {
  const { propertyId, rating, comment } = payload;

  console.log("Tenant ID:", tenantId);
console.log("Property ID:", propertyId);
const payments = await prisma.payment.findMany({
  include: {
    rentalRequest: true,
  },
});

console.log("Payments:", payments);

  const payment = await prisma.payment.findFirst({
    where: {
      status: "COMPLETED",
      rentalRequest: {
        tenantId,
        propertyId,
      },
    },
  });

  if (!payment) {
    throw new AppError(
      403,
      "You can review only after completing payment."
    );
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      tenantId,
      propertyId,
    },
  });

  if (existingReview) {
    throw new AppError(
      400,
      "You have already reviewed this property."
    );
  }

  const review = await prisma.review.create({
    data: {
      tenantId,
      propertyId,
      rating,
      comment,
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      property: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return review;
};