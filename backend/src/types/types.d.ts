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
    created_at: string,
    updated_at: string
}


export type ProductWithoutId = Omit<Product, 'product_id'>;


export type ProductForUpdate = Omit<Product, 'product_id', 'created_at'>;


export interface Category {
    category_id: string;
    name: string;
    description: string;
    created_at: string,
    updated_at: string
}


export type CategoryWithoutId = Omit<Category, 'category_id'>;


export type CategoryForUpdate = Omit<Category, 'category_id', 'created_at'>;