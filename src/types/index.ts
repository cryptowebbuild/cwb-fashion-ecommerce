export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  _count?: {
    products: number;
  };
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  costPrice?: number | null;
  categoryId: string;
  category?: Category;
  images: string[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string | null;
  title: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  shippingAddress: string;
  city: string;
  notes?: string | null;
  totalAmount: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentMethod: string;
  createdAt: string;
  items: OrderItem[];
}
