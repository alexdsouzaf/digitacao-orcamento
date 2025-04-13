import { LocalStorageService, tabelas } from './LocalStorageService';
import { inject, Injectable } from "@angular/core";
import { OrcamentoModel } from "../models/orcamentoModel";

@Injectable({ providedIn: 'root' })
export class OrcamentoService {

    private localStorageService = inject(LocalStorageService);


    listar(): Array<OrcamentoModel> {
        const listagem = this.localStorageService.listar(tabelas.ORCAMENTO)

        let retorno: Array<OrcamentoModel> = []

        if (listagem) {
            retorno = JSON.parse(listagem) as Array<OrcamentoModel>
        }

        return retorno;
    }

    consultarPorId(pId: number): OrcamentoModel {
        const listagem = this.listar()

        // let registroEncontrado: OrcamentoModel | undefined

        // if (listagem) {
        const registroEncontrado = listagem.find(item => item.id === pId);
        // }

        if (!registroEncontrado) {
            throw new Error(`Registro não encontrado com Id ${pId}`)
        }

        return registroEncontrado;
    }

    deletarPorId(pId: number) {
        // const listagem = this.listarReviews()

        // const listagemSemElementoRemovido = listagem.filter(item => item.id !== pId)

        // if (listagem.length === listagemSemElementoRemovido.length) return;

        // localStorage.setItem(this.tabela_local_storage, JSON.stringify(listagemSemElementoRemovido))
    }

    cadastrar(registro: OrcamentoModel): number {
        const listagem = this.listar()

        const novoRegistro: OrcamentoModel = {
            ...registro,
            id: listagem.length > 0 ? Math.max(...listagem.map(p => p.id)) + 1 : 1
        }
        listagem.push(novoRegistro)
        localStorage.setItem(tabelas.ORCAMENTO, JSON.stringify(listagem))

        return novoRegistro.id;
    }

    alterar(registro: OrcamentoModel) {
        // const listagem = this.listarReviews()

        // const indexEmAlteracao = listagem.findIndex(item => item.id === registro.id)
        // if (indexEmAlteracao === -1) return;

        // listagem[indexEmAlteracao] = { ...listagem[indexEmAlteracao], ...registro }
        // localStorage.setItem(this.tabela_local_storage, JSON.stringify(listagem))

    }
}