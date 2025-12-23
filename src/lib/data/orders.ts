import { Product } from './products';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number; // Price at time of order
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// In-memory storage for orders (will be cleared on page refresh as per requirements)
let orders: Order[] = [];

export function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
}

export function createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
  const now = new Date().toISOString();
  const order: Order = {
    ...orderData,
    id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    orderNumber: generateOrderNumber(),
    createdAt: now,
    updatedAt: now,
  };
  
  orders.push(order);
  return order;
}

export function getAllOrders(): Order[] {
  return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getOrderById(id: string): Order | undefined {
  return orders.find(order => order.id === id);
}

export function updateOrderStatus(id: string, status: OrderStatus): Order | undefined {
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = status;
    order.updatedAt = new Date().toISOString();
  }
  return order;
}

// Dummy orders for initial display
export function initializeDummyOrders() {
  if (orders.length === 0) {
    const dummyOrders: Order[] = [
      {
        id: 'order-1',
        orderNumber: 'ORD-1703001234-001',
        items: [
          {
            product: {
              id: '1',
              name: 'Whey Protein Isolate',
              description: 'Premium whey protein isolate',
              longDescription: '',
              price: 49.99,
              image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&h=500&fit=crop',
              images: [],
              category: 'Protein',
              isBestSeller: true,
              stock: 150,
              rating: 4.8,
              reviews: 234,
              servingSize: '1 scoop',
              servingsPerContainer: 30,
              ingredients: [],
              benefits: [],
              directions: '',
              warnings: [],
            },
            quantity: 1,
            price: 49.99,
          },
        ],
        shippingInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States',
        },
        subtotal: 49.99,
        shipping: 5.99,
        tax: 4.00,
        total: 59.98,
        status: 'delivered',
        createdAt: '2024-12-15T10:30:00.000Z',
        updatedAt: '2024-12-20T14:20:00.000Z',
      },
      {
        id: 'order-2',
        orderNumber: 'ORD-1703002345-002',
        items: [
          {
            product: {
              id: '2',
              name: 'Creatine Monohydrate',
              description: 'Pure creatine monohydrate',
              longDescription: '',
              price: 29.99,
              image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500&h=500&fit=crop',
              images: [],
              category: 'Performance',
              isBestSeller: true,
              stock: 200,
              rating: 4.9,
              reviews: 456,
              servingSize: '1 scoop',
              servingsPerContainer: 60,
              ingredients: [],
              benefits: [],
              directions: '',
              warnings: [],
            },
            quantity: 1,
            price: 29.99,
          },
        ],
        shippingInfo: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '+1987654321',
          address: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'United States',
        },
        subtotal: 29.99,
        shipping: 5.99,
        tax: 2.40,
        total: 38.38,
        status: 'shipped',
        createdAt: '2024-12-18T15:45:00.000Z',
        updatedAt: '2024-12-22T09:15:00.000Z',
      },
    ];
    
    orders = dummyOrders;
  }
}