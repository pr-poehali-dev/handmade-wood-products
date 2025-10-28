export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  material: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
