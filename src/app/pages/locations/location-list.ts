import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Location } from '../../types/location';
import { LocationService } from '../service/location.service';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.html',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        TagModule,
        ConfirmDialogModule,
        ToastModule,
        TooltipModule,
        IconFieldModule,
        InputIconModule,
        FormsModule,
        MenuModule
    ],
    providers: [ConfirmationService, MessageService]
})
export class LocationList implements OnInit {
    locations: Location[] = [];
    filteredLocations: Location[] = [];
    searchValue: string = '';
    menuItems: any[] = [];

    constructor(
        private locationService: LocationService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadLocations();
    }

    loadLocations(): void {
        this.locations = this.locationService.getAllLocations();
        this.filteredLocations = [...this.locations];
    }

    onSearch(): void {
        if (!this.searchValue) {
            this.filteredLocations = [...this.locations];
            return;
        }

        const searchLower = this.searchValue.toLowerCase();
        this.filteredLocations = this.locations.filter(location =>
            location.storageName?.toLowerCase().includes(searchLower) ||
            location.zone?.toLowerCase().includes(searchLower) ||
            location.category?.toLowerCase().includes(searchLower) ||
            location.type?.toLowerCase().includes(searchLower) ||
            location.content?.toLowerCase().includes(searchLower) ||
            location.area?.toLowerCase().includes(searchLower)
        );
    }

    clearSearch(): void {
        this.searchValue = '';
        this.filteredLocations = [...this.locations];
    }

    createNewLocation(): void {
        this.router.navigate(['/ubicaciones/nuevo']);
    }

    openGenerator(): void {
        this.router.navigate(['/ubicaciones/generador']);
    }

    editLocation(locationId: string): void {
        this.router.navigate(['/ubicaciones/editar', locationId]);
    }

    viewBins(locationId: string): void {
        this.router.navigate(['/ubicaciones', locationId, 'bins']);
    }

    deleteLocation(location: Location): void {
        this.confirmationService.confirm({
            message: `¿Está seguro que desea eliminar la ubicación "${location.storageName}"?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'Cancelar',
            accept: async () => {
                const success = await this.locationService.deleteLocation(location.id!);
                if (success) {
                    this.loadLocations();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Eliminado',
                        detail: 'Ubicación eliminada correctamente',
                        life: 3000
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se pudo eliminar la ubicación',
                        life: 3000
                    });
                }
            }
        });
    }

    getCategoryClass(category: string): string {
        const classes: any = {
            'Priority C': 'success',
            'No Priority': 'danger',
            'Priority A': 'info',
            'Priority B': 'warning'
        };
        return classes[category] || 'secondary';
    }

    getTypeClass(type: string): string {
        const classes: any = {
            'REGULAR': 'success',
            'HURT': 'danger',
            'STAGED': 'info'
        };
        return classes[type] || 'secondary';
    }

    getMenuItems(location: Location): any[] {
        return [
            {
                label: 'Editar',
                icon: 'pi pi-pencil',
                command: () => this.editLocation(location.id!)
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-trash',
                command: () => this.deleteLocation(location)
            }
        ];
    }
}
