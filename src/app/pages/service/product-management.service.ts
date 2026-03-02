import { Injectable, signal } from '@angular/core';

export interface ProductVariant {
    id?: string;
    color?: string;
    size?: string;
    sku?: string;
    stock?: number;
    price?: number;
}

export interface ProductWithVariants {
    id?: string;
    code?: string;
    name: string;
    description: string;
    basePrice: number;
    category?: string;
    supplierId?: string;
    images: string[];
    status: 'draft' | 'published' | 'archived';
    tags: string[];
    variants: ProductVariant[];
    createdAt?: Date;
    updatedAt?: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ProductManagementService {
    private productsSignal = signal<ProductWithVariants[]>([]);
    
    products = this.productsSignal.asReadonly();

    constructor() {
        // Ya no inicializar datos de prueba
        // Este servicio está deprecated, usar ProductService en su lugar
    }

    private loadProducts(): void {
        // Deshabilitado - usar ProductService en su lugar
        const stored = localStorage.getItem('products');
        if (stored) {
            this.productsSignal.set(JSON.parse(stored));
        }
        // Los datos de ejemplo fueron removidos
    }

    private saveProducts(): void {
        localStorage.setItem('products', JSON.stringify(this.productsSignal()));
    }

    getAllProducts(): ProductWithVariants[] {
        return this.productsSignal();
    }

    getProductById(id: string): ProductWithVariants | undefined {
        return this.productsSignal().find((p: ProductWithVariants) => p.id === id);
    }

    addProduct(product: ProductWithVariants): void {
        const newProduct = {
            ...product,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.productsSignal.update((products: ProductWithVariants[]) => [...products, newProduct]);
        this.saveProducts();
    }

    updateProduct(id: string, product: Partial<ProductWithVariants>): void {
        this.productsSignal.update((products: ProductWithVariants[]) =>
            products.map((p: ProductWithVariants) => p.id === id ? { ...p, ...product, updatedAt: new Date() } : p)
        );
        this.saveProducts();
    }

    deleteProduct(id: string): void {
        this.productsSignal.update((products: ProductWithVariants[]) => products.filter((p: ProductWithVariants) => p.id !== id));
        this.saveProducts();
    }

    addVariant(productId: string, variant: ProductVariant): void {
        this.productsSignal.update((products: ProductWithVariants[]) =>
            products.map((p: ProductWithVariants) => {
                if (p.id === productId) {
                    const newVariant = { ...variant, id: `${productId}-${Date.now()}` };
                    return { ...p, variants: [...p.variants, newVariant], updatedAt: new Date() };
                }
                return p;
            })
        );
        this.saveProducts();
    }

    updateVariant(productId: string, variantId: string, variant: Partial<ProductVariant>): void {
        this.productsSignal.update((products: ProductWithVariants[]) =>
            products.map((p: ProductWithVariants) => {
                if (p.id === productId) {
                    return {
                        ...p,
                        variants: p.variants.map((v: ProductVariant) => v.id === variantId ? { ...v, ...variant } : v),
                        updatedAt: new Date()
                    };
                }
                return p;
            })
        );
        this.saveProducts();
    }

    deleteVariant(productId: string, variantId: string): void {
        this.productsSignal.update((products: ProductWithVariants[]) =>
            products.map((p: ProductWithVariants) => {
                if (p.id === productId) {
                    return {
                        ...p,
                        variants: p.variants.filter((v: ProductVariant) => v.id !== variantId),
                        updatedAt: new Date()
                    };
                }
                return p;
            })
        );
        this.saveProducts();
    }
}
