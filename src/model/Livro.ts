import type { LivroDTO } from "../interface/LivroDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Livro {
  private idLivro: number = 0;
  private titulo: string;
  private autor: string;
  private editora: string;
  private anoPublicacao: string;
  private isbn: string;
  private quantTotal: number;
  private quantDisponivel: number;
  private valorAquisicao: number;
  private statusLivroEmprestado: string;

  /**
   * Construtor da classe Aluno
   * @param _titulo Nome do Aluno
   * @param _autor CPF do Aluno
   * @param _anoPublicacao Data de nascimento do Aluno
   * @param _editora Endereço do Aluno
   * @param _isbn Email do Aluno
   * @param _quantTotal CPF do Aluno
   * @param _quantDisponivel CPF do Aluno
   * @param _valorAquisicao CPF do Aluno
   * @param _statusLivroEmprestado CPF do Aluno
    */  
  constructor(
    _titulo: string,
    _autor: string,
    _editora: string,
    _anoPublicacao: string,
    _isbn: string,
    _quantTotal: number,
    _quantDisponivel: number,
    _valorAquisicao: number,
    _statusLivroEmprestado: string,
    _idLivro: number
  ) {
    this.idLivro = _idLivro;
    this.titulo = _titulo;
    this.autor = _autor;
    this.editora = _editora;
    this.anoPublicacao = _anoPublicacao;
    this.isbn = _isbn;
    this.quantTotal = _quantTotal;
    this.quantDisponivel = _quantDisponivel;
    this.valorAquisicao = _valorAquisicao;
    this.statusLivroEmprestado = _statusLivroEmprestado;
  }
  public getTitulo(): string {
    return this.titulo;
  }

  public setTitulo(_titulo: string): void {
    this.titulo = _titulo;
  }

  public getAutor(): string {
    return this.autor;
  }

  public setAutor(_autor: string): void {
    this.autor = _autor;
  }

  public getDisponibilidade(): string {
    return this.statusLivroEmprestado;
  }

  public setDisponibilidade(_status: string): void {
    this.statusLivroEmprestado = _status;
  }

  public getQuantDisponivel(): number {
    return this.quantDisponivel;
  }
  public setQuantDisponivel(_quantDisponivel: number): void {
    this.quantDisponivel = _quantDisponivel;
  }

  public setQuantTotal(_quantTotal: number): void {
    this.quantTotal = _quantTotal;
  }
  public getQuantTotal(): number {
    return this.quantTotal;
  }
  public getIdLivro(): number {
    return this.idLivro;
  }
  public setIdLivro(_idLivro: number): void {
    this.idLivro = _idLivro;
  }

  public getIsbn(): string {
    return this.isbn;
  }
  public setIsbn(_isbn: string): void {
    this.isbn = _isbn;
  }

  public getAnoPublicacao(): string {
    return this.anoPublicacao;
  }
  public setAnoPublicacao(_anoPublicacao: string): void {
    this.anoPublicacao = _anoPublicacao;
  }

  public getEditora(): string {
    return this.editora;
  }
  public setEditora(_editora: string): void {
    this.editora = _editora;
  }

  public getValorAquisicao(): number {
    return this.valorAquisicao;
  }
  public setValorAquisicao(_valorAquisicao: number): void {
    this.valorAquisicao = _valorAquisicao;
  }

  public emprestar(): boolean {
    if (this.quantDisponivel <= 0) return false;
    this.quantDisponivel--;
    return true;
  }

  public devolver(): void {
    if (this.quantDisponivel < this.quantTotal) {
      this.quantDisponivel++;
    }
  }
  /**
   * Retorna os Livros cadastrados no banco de dados
   * @returns Lista com Livros cadastrados
   * @returns valor nulo em caso de erro na consulta
   */

  static async listarLivros(): Promise<Array<Livro> | null> {
    try {
      let listaDeLivros: Array<Livro> = [];

      const querySelectLivros = `SELECT * FROM Livro;`;

      const respostaBD = await database.query(querySelectLivros);

      respostaBD.rows.forEach((LivroBD) => {
        const ListarLivro: Livro = new Livro(
          LivroBD.idLivro,
          LivroBD.titulo,
          LivroBD.autor,
          LivroBD.editora,
          LivroBD.anoPublicacao,
          LivroBD.isbn,
          LivroBD.quantTotal,
          LivroBD.quantDisponivel,
          LivroBD.valorAquisicao,
          LivroBD.statusLivroEmprestado
        );

        listaDeLivros.push(ListarLivro);
      });

      return listaDeLivros;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);

      return null;
    }
  }

  static async cadastrarLivro(LivroBD: Livro): Promise<Boolean> {
    const queryInsertLivro = `INSERT INTO Livro (titulo, autor, editora, anoPublicacao, isbn, quantTotal, quantDisponivel, valorAquisicao, statusLivroEmprestado) 
                                    VALUES 
                                    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                                    RETURNING idLivro;`;
    const respostaBD = await database.query(queryInsertLivro, [
      LivroBD.titulo,
      LivroBD.autor,
      LivroBD.editora,
      LivroBD.anoPublicacao,
      LivroBD.isbn,
      LivroBD.quantTotal,
      LivroBD.quantDisponivel,
      LivroBD.valorAquisicao,
      LivroBD.statusLivroEmprestado,
    ]);

    if (respostaBD.rows.length > 0) {
      console.info(
        `Aluno cadastrado com sucesso! ID: ${respostaBD.rows[0].idAluno}`
      );
      return true;
    }
    return false;
} catch (error: unknown) {
  console.error(`Erro na consulta ao banco de dados. ${error}`);
  return false;
}

}

export default Livro;
