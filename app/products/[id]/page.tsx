"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductImageGallery } from "@/components/storefront/ProductImageGallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductById } from "@/lib/data/products";
import { useCart } from "@/contexts/CartContext";
import {
  ShoppingCart,
  Star,
  Check,
  Package,
  Truck,
  Shield,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const product = getProductById(productId);
  const { addToCart, isInCart } = useCart();
  const inCart = product ? isInCart(product.id) : false;
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-foreground transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Left Column - Images */}
            <div>
              <ProductImageGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Category & Best Seller Badge */}
              <div className="flex items-center gap-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.isBestSeller && (
                  <Badge className="bg-emerald-500">Best Seller</Badge>
                )}
              </div>

              {/* Product Name */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <Separator />

              {/* Price */}
              <div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  ${product.price.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.servingsPerContainer} servings per container
                </p>
              </div>

              {/* Stock Status */}
              <div>
                {product.stock > 50 ? (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">In Stock</span>
                  </div>
                ) : product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">
                      Only {product.stock} left in stock
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-lg h-14 disabled:bg-slate-400"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || inCart}
                >
                  {justAdded ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart!
                    </>
                  ) : inCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Already in Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
                {inCart && (
                  <Link href="/cart">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full text-lg h-14"
                    >
                      View Cart
                    </Button>
                  </Link>
                )}
                <p className="text-xs text-center text-muted-foreground">
                  Quantity limited to 1 per order
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Truck className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                    <p className="text-xs font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      On orders $50+
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                    <p className="text-xs font-medium">100% Secure</p>
                    <p className="text-xs text-muted-foreground">
                      Safe checkout
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Package className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                    <p className="text-xs font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">
                      30-day policy
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Card>
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto p-1">
                <TabsTrigger
                  value="description"
                  className="text-xs sm:text-sm py-2 px-2"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="benefits"
                  className="text-xs sm:text-sm py-2 px-2"
                >
                  Benefits
                </TabsTrigger>
                <TabsTrigger
                  value="ingredients"
                  className="text-xs sm:text-sm py-2 px-2"
                >
                  Ingredients
                </TabsTrigger>
                <TabsTrigger
                  value="directions"
                  className="text-xs sm:text-sm py-2 px-2"
                >
                  How to Use
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Product Description
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {product.longDescription}
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Serving Size
                      </p>
                      <p className="font-semibold">{product.servingSize}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Servings Per Container
                      </p>
                      <p className="font-semibold">
                        {product.servingsPerContainer}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm sm:text-base">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="ingredients" className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {product.ingredients.join(", ")}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="directions" className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Directions for Use
                </h3>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  {product.directions}
                </p>

                <h4 className="font-semibold mb-3">Warnings</h4>
                <ul className="space-y-2">
                  {product.warnings.map((warning, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
