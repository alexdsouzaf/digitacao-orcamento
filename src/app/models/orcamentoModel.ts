import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ItemModel, ItemModelForm } from "./itemModel";
import { ClienteModel, ClienteModelForm } from "./clienteModel";

export class OrcamentoModel {
    id: number = 0;
    cliente: ClienteModel = new ClienteModel();
    itens: Array<ItemModel> = [];
}
export class OrcamentoModelForm {
    form = new FormGroup({
        id: new FormControl<number>(0, { nonNullable: true }),
        cliente: new ClienteModelForm().form,
        itens: new FormArray(new Array<ItemModelForm>().map(() => new ItemModelForm().form)),
    } as const);
}


// export class OrcamentoModelForm {
//     form: FormGroup;

//     constructor(model: Partial<OrcamentoModel> = {}) {
//         this.form = new FormGroup({
//             id: new FormControl(model.id ?? 0, { nonNullable: true }),
//             cliente: new ClienteModelForm().form,
//             itens: new FormArray((model.itens ?? []).map(() => new ItemModelForm().form))
//         });
//     }

// get itensFormArray(): FormArray<FormGroup> {
//   return this.form.get('itens') as FormArray<FormGroup>;
// }

// addItem(item: Partial<ItemModel> = {}) {
//   const formArray = this.itensFormArray;
//   formArray.push(new ItemModelForm().form);
// }

// }
// export interface OrcamentoForm {
//     id: FormControl<number>;
//     cliente: FormControl<ClienteModel>;
//     itens: FormControl<Array<ItemModel>>
// }

// export class OrcamentoModelForm {
//     form: FormGroup<OrcamentoForm>;

//     constructor() {
//         this.form = new FormGroup<OrcamentoForm>({
//             id: new FormControl(0, { nonNullable: true }),
//             cliente: new FormControl(),
//             itens: new FormControl()
//         });
//     };
// }