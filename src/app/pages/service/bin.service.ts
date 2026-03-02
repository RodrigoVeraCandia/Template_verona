import { Injectable, signal } from '@angular/core';
import { Bin, BinGeneratorParams } from '../../types/bin';

@Injectable({
    providedIn: 'root'
})
export class BinService {
    private readonly STORAGE_KEY = 'bins';
    private bins = signal<Bin[]>([]);

    constructor() {
        this.loadFromStorage();
    }

    private loadFromStorage(): void {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            this.bins.set(JSON.parse(stored));
        }
    }

    private saveToStorage(): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.bins()));
    }

    getAllBins(): Bin[] {
        return this.bins();
    }

    getActiveBins(): Bin[] {
        return this.bins().filter(bin => bin.active);
    }

    getBinById(id: string): Bin | undefined {
        return this.bins().find(bin => bin.id === id);
    }

    getBinsByLocation(locationId: string): Bin[] {
        return this.bins().filter(bin => bin.locationId === locationId);
    }

    createBin(bin: Bin): Bin {
        const newBin: Bin = {
            ...bin,
            id: this.generateId(),
            createdAt: new Date(),
            status: bin.status || 'empty'
        };
        this.bins.update(bins => [...bins, newBin]);
        this.saveToStorage();
        return newBin;
    }

    updateBin(id: string, bin: Partial<Bin>): void {
        this.bins.update(bins =>
            bins.map(b => b.id === id ? { ...b, ...bin } : b)
        );
        this.saveToStorage();
    }

    deleteBin(id: string): void {
        this.bins.update(bins => bins.filter(b => b.id !== id));
        this.saveToStorage();
    }

    deleteBinsByLocation(locationId: string): void {
        this.bins.update(bins => bins.filter(b => b.locationId !== locationId));
        this.saveToStorage();
    }

    toggleBinStatus(id: string): void {
        this.bins.update(bins =>
            bins.map(b => b.id === id ? { ...b, active: !b.active } : b)
        );
        this.saveToStorage();
    }

    // Generador de bins en bulk
    generateBins(params: BinGeneratorParams): Bin[] {
        const generatedBins: Bin[] = [];
        
        for (let i = params.startNumber; i <= params.endNumber; i++) {
            const binCode = `${params.prefix}-${i.toString().padStart(3, '0')}`;
            const bin: Bin = {
                id: this.generateId(),
                locationId: params.locationId,
                code: binCode,
                status: 'empty',
                active: true,
                createdAt: new Date()
            };
            generatedBins.push(bin);
        }

        this.bins.update(bins => [...bins, ...generatedBins]);
        this.saveToStorage();
        return generatedBins;
    }

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}
