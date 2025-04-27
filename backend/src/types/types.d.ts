export interface Product {
    product_id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    picture?: string | null;
    category_id: string | null;
    featured: boolean;
    active: boolean;
}


export type ProductWithoutId = Omit<Product, 'product_id'>;


export interface Category {
    category_id: string;
    name: string;
    description: string;
}


export type CategoryWithoutId = Omit<Category, 'category_id'>;

