import prisma from "../../db/prisma";
import AppError from "../../errors/AppError";
import { ICreateRental } from "./rental.interface";

export const createRental = async (
  payload: ICreateRental,
  tenantId: string
) => {
  const property = await prisma.property.findUnique({
    where: {
      id: payload.propertyId,
    },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  if (!property.available) {
    throw new AppError(400, "Property is not available");
  }

  if (property.landlordId === tenantId) {
  throw new AppError(
    403,
    "You cannot rent your own property"
  );
}

  const existingRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
      status: {
        in: ["PENDING", "APPROVED", "ACTIVE"],
      },
    },
  });

  if (existingRequest) {
    throw new AppError(
      409,
      "You have already requested this property"
    );
  }

  return prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      moveInDate: new Date(payload.moveInDate),
      message: payload.message,
    },
    include: {
      property: true,
    },
  });
};

export const getMyRentals = async (tenantId: string) => {
  return prisma.rentalRequest.findMany({
    where: {
      tenantId,
    },
    include: {
      property: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getSingleRental = async (
  id: string,
  tenantId: string
) => {
  const rental = await prisma.rentalRequest.findFirst({
    where: {
      id,
      tenantId,
    },
    include: {
      property: true,
    },
  });

  if (!rental) {
    throw new AppError(404, "Rental request not found");
  }

  return rental;
};


export const getLandlordRentals = async (landlordId: string) => {
  return prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId,
      },
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      property: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateRentalStatus = async (
  rentalId: string,
  landlordId: string,
  status: "APPROVED" | "REJECTED"
) => {
  const rental = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      property: true,
    },
  });

  if (!rental) {
    throw new AppError(404, "Rental request not found");
  }

  if (rental.property.landlordId !== landlordId) {
    throw new AppError(403, "Forbidden");
  }

  if (rental.status !== "PENDING") {
    throw new AppError(400, "Rental request already processed");
  }

  return prisma.rentalRequest.update({
    where: {
      id: rentalId,
    },
    data: {
      status,
    },
    include: {
      property: true,
      tenant: true,
    },
  });
};