import { Injectable, Type } from "@angular/core";
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ModalService<C, T> {
    constructor(
        public modalService: NgbModal,
        private toastrService: ToastrService,
        private ngbModalConfig: NgbModalConfig) {
        this.ngbModalConfig.backdrop = 'static';
    }

    public openModalDialog(component: Type<C>, data: T, successCallback: (result: string) => void) {
        const modal = this.modalService.open(component);
        modal.componentInstance.data = data;
        modal.result.then((result) => {
            if (result === 'saved') {
                this.toastrService.success('Saved successfully.');
                successCallback(result);
            }
            modal.dismiss();
        }, (reason) => {
        });
    }
}