import { FormControl, FormGroup, Validators } from "@angular/forms";

export class ClienteModel {
    nome: string = "";
    email: string = "";
    endereco: string = "";
    telefone: string = "";
}

export class ClienteModelForm {
    form = new FormGroup({
        nome: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        endereco: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        telefone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });
}