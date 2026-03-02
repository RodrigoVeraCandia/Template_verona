export interface Bin {
    id?: string;
    locationId: string;
    code: string; // Código del bin
    content?: string;
    quantity?: number;
    status: 'empty' | 'partial' | 'full';
    active: boolean;
    createdAt?: Date;
}

export interface BinGeneratorParams {
    locationId: string;
    prefix: string;
    startNumber: number;
    endNumber: number;
}
