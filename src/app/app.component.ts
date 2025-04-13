import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PrincipalComponent } from "./principal/principal/principal.component";

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HttpClientModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'digitacao-orcamento';

	constructor(private router: Router) { }

	openNewTab() {
		const url = this.router.serializeUrl(
			this.router.createUrlTree(['/impressao'])
		);

		window.open(url, '_blank');
	}

	async imprimir() {
		this.router.navigateByUrl('/impressao', {
			state: { meuObjeto: { nome: 'João', idade: 30 } }
		});
		// this.http.get('/assets/modelo/modelo-orcamento.html', { responseType: 'text' })
		// 	.subscribe(html => {
		// 		//nao posso fazer essa nova janela se nao eu perco o contexto das imagens
		// 		const janela = window.open('', '', 'width=800,height=600');
		// 		if (janela) {
		// 			janela.document.write(html);
		// 			// janela.document.close();
		// 			janela.print();
		// 			// janela.close();

		// 		}
		// 	});
	}

	async imprimirExemplo() {
		const conteudo = document.querySelector('table')?.outerHTML || '';
		const janela = window.open('', '', 'width=800,height=600');

		if (janela) {
			janela.document.write(`
				<html>
					<head>
					<title>Impressão</title>
					<style>
						table { width: 100%; border-collapse: collapse; }
						th, td { border: 1px solid black; padding: 8px; text-align: left; }
					</style>
					</head>
					<body>
					${conteudo}
					</body>
				</html>
				`);
			janela.document.close();
			janela.print();
		}
	}

	gerarTabelaHTML(dados: { nome: string, valor: number }[]): string {
		let linhas = dados.map(d => `<tr><td>${d.nome}</td><td>${d.valor}</td></tr>`).join('');
		return `
		  <table>
			<thead><tr><th>Nome</th><th>Valor</th></tr></thead>
			<tbody>${linhas}</tbody>
		  </table>
		`;
	}
}
