import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;


class Emprestimo {
  private idEmprestimo: number = 0;
  private idLivro: number;
  private idAluno: number;
  private dataEmprestimo: Date;
  private dataDevolucao: Date;
  private statusEmprestimo: string;

  constructor(
    _idAluno: number,
    _idLivro: number,
    _dataEmprestimo: Date,
    _statusEmprestimo: string,
    _dataDevolucao: Date,
    _idEmprestimo: number
  ) {
    this.idAluno = _idAluno;
    this.idLivro = _idLivro;
    this.idEmprestimo = _idEmprestimo;
    this.dataEmprestimo = new Date(_dataEmprestimo);
    this.dataDevolucao = new Date(_dataDevolucao);
    this.statusEmprestimo = _statusEmprestimo;
  }

  public getIdEmprestimo(): number {
    return this.idEmprestimo;
  }
  public setIdEmprestimo(_idEmprestimo: number): void {
    this.idEmprestimo = _idEmprestimo;
  }
  public getIdLivro(): number {
    return this.idLivro;
  }
  public setIdLivro(_idLivro: number): void {
    this.idLivro = _idLivro;
  }  
  public getIdAluno(): number {
    return this.idAluno;
  }
  public setIdAluno(_idAluno: number): void {
    this.idEmprestimo = _idAluno;
  }
  public getdataEmprestimo():   Date {
    return this.dataEmprestimo;
  }

  public getdataDevolucao(): Date {
    return this.dataDevolucao;
  }
  public setdataDevolucao(_dataDevolucao: Date): void {
    this.dataDevolucao = _dataDevolucao;
  }

  public getstatusEmprestimo(): string {
    return this.statusEmprestimo;
  }

  public setstatusEmprestimo(_status: string): void {
    this.statusEmprestimo = _status;
  }


 /**
   * Retorna os Emprestimos cadastrados no banco de dados
   * @returns Lista com Emprestimos cadastrados
   * @returns valor nulo em caso de erro na consulta
   */
 static async listarEmprestimos(): Promise<Array<Emprestimo> | null> {
    try {
      let listaDeEmprestimos: Array<Emprestimo> = [];

      const querySelectEmprestimos = `SELECT * FROM Emprestimo;`;

      const respostaBD = await database.query(querySelectEmprestimos);

      respostaBD.rows.forEach((EmprestimoBD) => {
        const novoEmprestimo: Emprestimo = new Emprestimo(
          EmprestimoBD.idAluno,
          EmprestimoBD.idLivro,
          EmprestimoBD.dataEmprestimo,
          EmprestimoBD.dataDevolucao,
          EmprestimoBD.statusEmprestimo,
          EmprestimoBD.idEmprestimo
        );

        novoEmprestimo.setIdEmprestimo(EmprestimoBD.idEmprestimo);

        listaDeEmprestimos.push(novoEmprestimo);
      });

      return listaDeEmprestimos;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);

      return null;
    }
  }
}

export default Emprestimo;
