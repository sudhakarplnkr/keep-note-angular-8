import { Injectable } from "@angular/core";
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(
        public modalService: NgbModal,
        private toastrService: ToastrService,
        private ngbModalConfig: NgbModalConfig) {
        this.ngbModalConfig.backdrop = 'static';
    }

    public openModalDialog(component: any, data: any, successCallback: any) {
        const modal = this.modalService.open(component);
        modal.componentInstance.data = data;
        modal.result.then((result) => {
            if (result === 'saved') {
                this.toastrService.success('Saved successfully.');
                successCallback();
            }
            modal.dismiss();
        }, (reason) => {
        });
    }
}