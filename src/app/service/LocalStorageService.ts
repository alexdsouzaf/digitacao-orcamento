import { Injectable } from "@angular/core";
import { OrcamentoModel } from "../models/orcamentoModel";


export const tabelas = {
    ORCAMENTO: "orcamento",
    CLIENTE: "cliente",
    ITEM: "item"
}

// * a ideia era usar o local storage do navegador como se fosse o banco de dados mesmo
@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    // * Verifica se existe a tabela no localstorage, caso nao, cria
    private inicializarTabelaLocalStorage() {
        if (!localStorage.getItem(tabelas.ORCAMENTO)) {
            localStorage.setItem(tabelas.ORCAMENTO, JSON.stringify([]))
        }
        if (!localStorage.getItem(tabelas.CLIENTE)) {
            localStorage.setItem(tabelas.CLIENTE, JSON.stringify([]))
        }
        if (!localStorage.getItem(tabelas.ITEM)) {
            localStorage.setItem(tabelas.ITEM, JSON.stringify([]))
        }

    }

    listar(pNomeTabela: string): string | null {

        // ! chama quando tentar listar todos os registros 
        // ! pois sempre vai ser a primeira dessas operacoes a ser executada
        this.inicializarTabelaLocalStorage()

        return localStorage.getItem(pNomeTabela)
    }


}