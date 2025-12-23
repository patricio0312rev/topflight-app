"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success("Added to cart!", {
      description: product.name,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full overflow-hidden group cursor-pointer">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {product.isBestSeller && (
              <Badge className="absolute top-3 right-3 bg-emerald-500">
                Best Seller
              </Badge>
            )}
            {product.stock < 50 && product.stock > 0 && (
              <Badge variant="warning" className="absolute top-3 left-3">
                Low Stock
              </Badge>
            )}
          </div>
        </Link>

        <CardContent className="p-4">
          <Link href={`/products/${product.id}`}>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="ml-1 text-sm font-medium">
                  {product.rating}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
          </Link>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-600">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={inCart || product.stock === 0}
            className={
              inCart ? "bg-slate-400" : "bg-emerald-500 hover:bg-emerald-600"
            }
          >
            {inCart ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
