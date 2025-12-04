import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import Emprestimo from "../model/Emprestimo.js";
import { formatarData } from "../utils/formatarData.js";
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
      const listarEmprestimos: Array<EmprestimoDTO> | null =
        await Emprestimo.listarEmprestimos();

      // Formatar datas na resposta
      const emprestimoFormatados = listarEmprestimos?.map((e) => ({
        ...e,
        dataEmprestimo: formatarData(e.dataEmprestimo),
        dataDevolucao: e.dataDevolucao ? formatarData(e.dataDevolucao) : null,
      }));

      return res.status(200).json(emprestimoFormatados);
    } catch (error) {
      console.error(`Erro ao consultar modelo. ${error}`);

      return res
        .status(500)
        .json({ mensagem: "Não foi possivel acessar a lista de Emprestimos." });
    }
  }
}

export default EmprestimoController;
