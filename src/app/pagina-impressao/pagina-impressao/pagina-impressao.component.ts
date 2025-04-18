import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OrcamentoService } from '../../service/orcamentoService';
import { OrcamentoModelForm } from '../../models/orcamentoModel';
import { ItemModel } from '../../models/itemModel';
import { ClienteModelForm } from '../../models/clienteModel';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
	selector: 'app-pagina-impressao',
	imports: [RouterOutlet, NgxCurrencyDirective],
	templateUrl: './pagina-impressao.component.html',
	styleUrl: './pagina-impressao.component.css'
})
// * https://medium.com/@Idan_Co/angular-print-service-290651c721f9
export class PaginaImpressaoComponent implements OnInit {

	private router = inject(Router)
	private orcamentoService = inject(OrcamentoService)

	clienteForm = new ClienteModelForm().form
	listaItensOrcamento = signal(new Array<ItemModel>());

	dataAtual = signal(new Date())
	total = signal<number>(0)

	async ngOnInit() {
		const idRecebido = this.router.routerState.snapshot.root.queryParams["pId"]

		const orcamento = this.orcamentoService.consultarPorId(Number(idRecebido));

		this.clienteForm.patchValue(orcamento.cliente)
		this.listaItensOrcamento.set(orcamento.itens)

		this.total.set(orcamento.itens.reduce((subtotal, item) => subtotal + item.subtotal, 0))

		window.print()
		
		// window.close() //!bug: o chrome nao aguarda a impressao e fecha direto assim que abre
	}
}
