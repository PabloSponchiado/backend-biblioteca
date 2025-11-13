import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import Emprestimo from "../model/Emprestimo.js";
import type { Request, Response } from "express";

class EmprestimoController extends Emprestimo {

  /**
     * Faz a chamada ao modelo para obter a lista de Emprestimos e devolve ao Emprestimo
     * 
     * @param req Requisição do Emprestimo
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os Emprestimos
     * @returns (500) Erro na consulta
     */
static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listarEmprestimos: Array<Emprestimo> | null = await Emprestimo.listarEmprestimos();

            return res.status(200).json(listarEmprestimos);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de Emprestimos." });
        }
    }
}

export default EmprestimoController;