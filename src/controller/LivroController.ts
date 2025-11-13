import type { LivroDTO } from "../interface/LivroDTO.js";
import Livro from "../model/Livro.js";
import type { Request, Response } from "express";

class LivroController extends Livro {

  /**
     * Faz a chamada ao modelo para obter a lista de Livros e devolve ao Livro
     * 
     * @param req Requisição do Livro
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os Livros
     * @returns (500) Erro na consulta
     */
static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listarLivros: Array<Livro> | null = await Livro.listarLivros();

            return res.status(200).json(listarLivros);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de Livros." });
        }
    }
        static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosLivro = req.body;

            const respostaModelo = await Livro.cadastrarLivro(dadosRecebidosLivro);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Livro cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar Livro." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o Livro" });
        }
    }
}


export default LivroController;
