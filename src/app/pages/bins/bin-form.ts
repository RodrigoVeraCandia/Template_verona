import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { Bin } from '../../types/bin';
import { BinService } from '../service/bin.service';

@Component({
    selector: 'app-bin-form',
    templateUrl: './bin-form.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        InputSwitchModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class BinForm implements OnInit {
    @Input() visible: boolean = false;
    @Input() locationId: string = '';
    @Input() bin: Bin | null = null;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    binData: Bin = {
        locationId: '',
        code: '',
        content: '',
        quantity: 0,
        status: 'empty',
        active: true
    };

    isEditMode: boolean = false;

    statusOptions = [
        { label: 'Vacío', value: 'empty' },
        { label: 'Parcial', value: 'partial' },
        { label: 'Lleno', value: 'full' }
    ];

    constructor(
        private binService: BinService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        if (this.bin) {
            this.isEditMode = true;
            this.binData = { ...this.bin };
        } else {
            this.binData.locationId = this.locationId;
        }
    }

    saveBin(): void {
        if (!this.validateBin()) {
            return;
        }

        try {
            if (this.isEditMode) {
                this.binService.updateBin(this.binData.id!, this.binData);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Bin actualizado correctamente'
                });
            } else {
                this.binService.createBin(this.binData);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Bin creado correctamente'
                });
            }
            
            this.onSave.emit();
            this.closeDialog();
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al guardar el bin'
            });
        }
    }

    validateBin(): boolean {
        if (!this.binData.code) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Validación',
                detail: 'El código del bin es requerido'
            });
            return false;
        }

        if (!this.binData.status) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Validación',
                detail: 'El estado del bin es requerido'
            });
            return false;
        }

        return true;
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
    }
}
