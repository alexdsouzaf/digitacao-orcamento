import { ItemModel } from './../../models/itemModel';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OrcamentoModel, OrcamentoModelForm } from '../../models/orcamentoModel';
import { ReactiveFormsModule } from '@angular/forms';
import { OrcamentoService } from '../../service/orcamentoService';
import { ItemModelForm } from '../../models/itemModel';
import { ClienteModelForm } from '../../models/clienteModel';
import { GatoComponent } from "../../gato/gato/gato.component";
import { TelefoneMaskDirective } from '../../service/telefone-mask.directive';
import { CurrencyPipe, NgClass } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
	selector: 'app-principal',
	imports: [RouterOutlet, ReactiveFormsModule, GatoComponent, TelefoneMaskDirective, CurrencyPipe, NgxCurrencyDirective, NgClass ],
	templateUrl: './principal.component.html',
	styleUrl: './principal.component.css'
})
export class PrincipalComponent {

	private orcamentoService = inject(OrcamentoService)

	constructor(private router: Router) { }

	clienteForm = new ClienteModelForm().form
	itemForm = new ItemModelForm().form;

	listaItensOrcamento = signal(new Array<ItemModel>());

	indexEmAlteracao = signal(-1)


	openNewTab() {

		const orcamentoModel = new OrcamentoModel();

		orcamentoModel.cliente.email = this.clienteForm.controls.email.value;
		orcamentoModel.cliente.endereco = this.clienteForm.controls.endereco.value;
		orcamentoModel.cliente.nome = this.clienteForm.controls.nome.value;
		orcamentoModel.cliente.telefone = this.clienteForm.controls.telefone.value;

		orcamentoModel.itens.push(...this.listaItensOrcamento())

		const id = this.orcamentoService.cadastrar(orcamentoModel)

		const url = this.router.serializeUrl(
			this.router.createUrlTree(['digitacao-orcamento/impressao'], {
				queryParams: { pId: id }
			})
		);

		window.open(url, '_blank');
	}

	navegaParaOutraRota() {
		this.router.navigate(['impressao'])
	}

	adicionarItem() {

		const novoItem = new ItemModel()

		novoItem.descricao = this.itemForm.controls.descricao.value
		novoItem.quantidade = this.itemForm.controls.quantidade.value
		novoItem.unitario = this.itemForm.controls.unitario.value
		novoItem.subtotal = novoItem.quantidade * novoItem.unitario


		if (this.indexEmAlteracao() === -1) {
			// inclusao
			this.listaItensOrcamento().push(novoItem);
		} else {
			//alteracao
			this.listaItensOrcamento()[this.indexEmAlteracao()] = { ...this.listaItensOrcamento()[this.indexEmAlteracao()], ...novoItem }
		}

		this.indexEmAlteracao.set(-1)
		this.itemForm.reset();
	}

	removerItem(pIndex: number) {
		if (pIndex !== -1) {
			this.listaItensOrcamento().splice(pIndex, 1);
		}
	}

	alterarItem(pItem: ItemModel, pIndex: number) {
		//torna o registro editavel novamente
		this.indexEmAlteracao.set(pIndex);

		this.itemForm.controls.descricao.setValue(pItem.descricao)
		this.itemForm.controls.quantidade.setValue(pItem.quantidade)
		this.itemForm.controls.unitario.setValue(pItem.unitario)

	}

	cancelarEdicao() {
		this.indexEmAlteracao.set(-1)
		this.itemForm.reset();
	}

}
