import Stripe from "stripe";
import prisma from "../../db/prisma";
import config from "../../config";
import AppError from "../../errors/AppError";

const stripe = new Stripe(config.stripe.secretKey);

export const createPayment = async (
  rentalRequestId: string,
  tenantId: string
) => {
  const rental = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalRequestId,
    },
    include: {
      property: true,
      payment: true,
    },
  });

  if (!rental) {
    throw new AppError(404, "Rental request not found");
  }

  if (rental.tenantId !== tenantId) {
    throw new AppError(403, "Forbidden");
  }

  if (rental.status !== "APPROVED") {
    throw new AppError(
      400,
      "Rental request is not approved yet"
    );
  }

  if (rental.payment) {
    throw new AppError(
      409,
      "Payment already exists"
    );
  }

  const paymentIntent =
    await stripe.paymentIntents.create({
      amount: Math.round(rental.property.price * 100),
      currency: "usd",
      metadata: {
        rentalRequestId,
      },
    });

  const payment = await prisma.payment.create({
    data: {
      transactionId: paymentIntent.id,
      rentalRequestId,
      amount: rental.property.price,
      provider: "STRIPE",
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    payment,
  };
};

export const confirmPayment = async (
  paymentId: string,
  tenantId: string
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      rentalRequest: true,
    },
  });

  if (!payment) {
    throw new AppError(404, "Payment not found");
  }

  if (payment.rentalRequest.tenantId !== tenantId) {
    throw new AppError(403, "Forbidden");
  }

  if (payment.status === "COMPLETED") {
    throw new AppError(400, "Payment already completed");
  }

  await prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      status: "COMPLETED",
      paidAt: new Date(),
    },
  });

  await prisma.rentalRequest.update({
    where: {
      id: payment.rentalRequestId,
    },
    data: {
      status: "ACTIVE",
    },
  });

  return {
    message: "Payment completed successfully",
  };
};

export const getMyPayments = async (tenantId: string) => {
  return prisma.payment.findMany({
    where: {
      rentalRequest: {
        tenantId,
      },
    },
    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getSinglePayment = async (
  id: string,
  tenantId: string
) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id,
      rentalRequest: {
        tenantId,
      },
    },
    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },
  });

  if (!payment) {
    throw new AppError(404, "Payment not found");
  }

  return payment;
};