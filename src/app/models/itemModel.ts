import { FormControl, FormGroup, Validators } from "@angular/forms";

export class ItemModel {
    quantidade: number = 0;
    descricao: string = "";
    unitario: number = 0;
    subtotal: number = 0;
}

export class ItemModelForm {
    form = new FormGroup({
        quantidade: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
        descricao: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        unitario: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
        subtotal: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    });
}