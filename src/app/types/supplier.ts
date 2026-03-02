export interface Supplier {
    id?: string;
    name: string;
    contactName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    country?: string;
    website?: string;
    active?: boolean;
    createdAt?: Date;
}
