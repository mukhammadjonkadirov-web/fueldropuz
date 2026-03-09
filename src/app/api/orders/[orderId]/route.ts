import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type OrderStatus = "new" | "accepted" | "on_the_way" | "delivered";
type PaymentStatus = "pending" | "paid" | "failed";

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;
    const body = await request.json();

    const { status, paymentStatus } = body as {
      status?: OrderStatus;
      paymentStatus?: PaymentStatus;
    };

    if (!status && !paymentStatus) {
      return NextResponse.json(
        { success: false, error: "Nothing to update" },
        { status: 400 }
      );
    }

    const updated = await prisma.order.update({
      where: { orderId },
      data: {
        ...(status ? { status } : {}),
        ...(paymentStatus ? { paymentStatus } : {}),
      },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("ORDER PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}

