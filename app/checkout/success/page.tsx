"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { getOrderById, Order } from "@/lib/data/orders";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [orderId, router]);

  if (!order) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="h-24 w-24 mx-auto text-emerald-500" />
            </motion.div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>

          {/* Order Details Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Order Number
                  </p>
                  <p className="font-semibold">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Amount
                  </p>
                  <p className="font-semibold text-emerald-600">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-semibold">{order.shippingInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="font-semibold capitalize">{order.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                <Package className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>
            </Link>
            <Link href={`/provider/orders/${order.id}`}>
              <Button size="lg" variant="outline">
                View Order Details
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-muted-foreground mt-8">
            A confirmation email has been sent to{" "}
            <span className="font-semibold">{order.shippingInfo.email}</span>
          </p>
        </motion.div>
      </div>
    </MainLayout>
  );
}
