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
    _dataDevolucao: Date
  ) {
    this.idAluno = _idAluno;
    this.idLivro = _idLivro;
    this.dataEmprestimo = new Date(_dataEmprestimo);
    this.dataDevolucao = new Date(_dataDevolucao);
    this.statusEmprestimo = _statusEmprestimo;
  }

  public getIdEmprestimo(): number {
    return this.idEmprestimo;
  }
  public setIdEmprestimo(idEmprestimo: number): void {
    this.idEmprestimo = idEmprestimo;
  }
  public getIdLivro(): number {
    return this.idLivro;
  }
  public setIdLivro(idLivro: number): void {
    this.idLivro = idLivro;
  }
  public getIdAluno(): number {
    return this.idAluno;
  }
  public setIdAluno(idAluno: number): void {
    this.idEmprestimo = idAluno;
  }
  public getdataEmprestimo(): Date {
    return this.dataEmprestimo;
  }
  public setdataEmprestimo(dataEmprestimo: Date): void {
    this.dataEmprestimo = dataEmprestimo;
  }

  public getdataDevolucao(): Date {
    return this.dataDevolucao;
  }

  public setdataDevolucao(dataDevolucao: Date): void {
    this.dataDevolucao = dataDevolucao;
  }

  public getstatusEmprestimo(): string {
    return this.statusEmprestimo;
  }

  public setstatusEmprestimo(status: string): void {
    this.statusEmprestimo = status;
  }

  /**
   * @returns
   */
  static async listarEmprestimos(): Promise<Array<EmprestimoDTO> | null> {
    try {
      let listaDeEmprestimos: Array<EmprestimoDTO> = [];

      const querySelectEmprestimos = `
              SELECT 
                    p.id_emprestimo,
                    p.data_emprestimo,
                    p.data_devolucao,
					          p.status_emprestimo,
                    c.id_aluno, 
                    c.nome,
					          c.sobrenome,
                    h.id_livro
                FROM emprestimo AS p
                JOIN livro h ON p.id_livro = h.id_livro
                JOIN aluno c ON p.id_aluno = c.id_aluno;
            `;

      const respostaBD = await database.query(querySelectEmprestimos);

      respostaBD.rows.forEach((emprestimoBD) => {
        const dto: EmprestimoDTO = {
          idEmprestimo: emprestimoBD.id_emprestimo,
          idAluno: emprestimoBD.id_aluno,
          idLivro: emprestimoBD.id_livro,
          dataEmprestimo: emprestimoBD.data_emprestimo,
          dataDevolucao: emprestimoBD.data_devolucao,
          statusEmprestimo: emprestimoBD.status_emprestimo,
        };

        listaDeEmprestimos.push(dto);
        console.log(listaDeEmprestimos);
      });

      return listaDeEmprestimos;
    } catch (error) {
      console.error(`Erro na consulta com o banco de dados.`, error);

      return null;
    }
  }

  /**
   * @param idEmprestimo
   * @returns
   */
  static async listarEmprestimo(
    idEmprestimo: number
  ): Promise<EmprestimoDTO | null> {
    try {
      let emprestimo: EmprestimoDTO | null = null;

      const querySelectEmprestimos = `
                SELECT 
                    p.id_emprestimo,
                    p.data_emprestimo,
                    p.data_devolucao,
					          p.status_emprestimo,
                    c.id_aluno, 
                    c.nome,
					          c.sobrenome,
                    h.id_livro
                FROM emprestimo AS p
                JOIN livro h ON p.id_livro = h.id_livro
                JOIN aluno c ON p.id_aluno = c.id_aluno;
            `;

      const respostaBD = await database.query(querySelectEmprestimos, [
        idEmprestimo,
      ]);

      respostaBD.rows.forEach((emprestimoBD) => {
        const dto: EmprestimoDTO = {
          idAluno: emprestimoBD.id_aluno,
          idLivro: emprestimoBD.id_livro,
          dataEmprestimo: emprestimoBD.data_emprestimo,
          dataDevolucao: emprestimoBD.data_devolucao,
          statusEmprestimo: emprestimoBD.status_emprestimo,
        };

        console.log(dto);

        emprestimo = dto;
      });

      return emprestimo;
    } catch (error) {
      console.error(`Erro na consulta com o banco de dados. ${error}`);

      return null;
    }
  }

  /**
   * @param emprestimo
   * @returns
   */
  static async cadastrarEmprestimo(
    emprestimo: EmprestimoDTO
  ): Promise<boolean> {
    try {
      const queryInsertEmprestimo = `INSERT INTO emprestimos_venda (id_cliente, id_carro, data_emprestimo, valor_emprestimo)
                                VALUES
                                ($1, $2, $3, $4)
                                RETURNING id_emprestimo;`;

      const respostaBD = await database.query(queryInsertEmprestimo, [
        emprestimo.idAluno,
        emprestimo.idLivro,
        new Date(emprestimo.dataEmprestimo),
      ]);

      if (respostaBD.rows.length > 0) {
        console.info(
          `emprestimo de venda cadastrado com sucesso. ID: ${respostaBD.rows[0].id_emprestimo}`
        );

        return true;
      }

      return false;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);

      return false;
    }
  }
}

export default Emprestimo;
