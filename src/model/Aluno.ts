import type { AlunoDTO } from "../interface/AlunoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Aluno {
  private idAluno: number = 0;
  private ra: string;
  private nome: string;
  private sobrenome: string;
  private dataNascimento: number;
  private endereco: string;
  private email: string;
  private celular: number;

  /**
   * Construtor da classe Aluno
   * @param _nome Nome do Aluno
   * @param _sobrenome CPF do Aluno
   * @param _dataNascimento Data de nascimento do Aluno
   * @param _endereco Endereço do Aluno
   * @param _email Email do Aluno
   * @param _celular CPF do Aluno
   */
  constructor(
    ra_: string,
    _nome: string,
    _sobrenome: string,
    _dataNascimento: number,
    _endereco: string,
    _email: string,
    _celular: number
  ) {
    this.ra = ra_;
    this.nome = _nome;
    this.sobrenome = _sobrenome;
    this.dataNascimento = _dataNascimento;
    this.endereco = _endereco;
    this.email = _email;
    this.celular = _celular;
  }

  /**
   * Retorna o ID do Aluno
   * @returns ID do Aluno
   */
  public getIdAluno(): number {
    return this.idAluno;
  }

  /**
   * Atribui um ID ao Aluno
   * @param _idAluno novo ID
   */
  public setIdAluno(_idAluno: number): void {
    this.idAluno = _idAluno;
  }

  public getRa(): string {
    return this.ra;
  }

  public setRa(_ra: string): void {
    this.ra = _ra;
  }
  /**
   * Retorna o nome do Aluno
   * @returns Nome do Aluno
   */
  public getNome(): string {
    return this.nome;
  }

  /**
   * Atribui um nome ao Aluno
   * @param _nome novo nome do Aluno
   */
  public setNome(_nome: string): void {
    this.nome = _nome;
  }

  /**
   * Retorna o CPF do Aluno
   * @returns CPF do Aluno
   */
  public getSobrenome(): string {
    return this.sobrenome;
  }

  /**
   * Atribui um CPF ao Aluno
   * @param _sobrenome novo CPF do Aluno
   */
  public setSobrenome(_sobrenome: string): void {
    this.sobrenome = _sobrenome;
  }

  /**
   * Retorna o telefone do Aluno
   * @returns Telefone do Aluno
   */
  public getdataNascimento(): number {
    return this.dataNascimento;
  }

  /**
   * Atribui um telefone ao Aluno
   * @param dataNascimento novo telefone do Aluno
   */
  public setdataNascimento(_dataNascimento: number): void {
    this.dataNascimento = _dataNascimento;
  }

  public getEndereco(): string {
    return this.endereco;
  }
  public setEndereco(_endereco: string): void {
    this.endereco = _endereco;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(_email: string): void {
    this.email = _email;
  }
  public getCelular(): number {
    return this.celular;
  }
  public setCelular(_celular: number): void {
    this.celular = _celular;
  }

  /**
   * Retorna os Alunos cadastrados no banco de dados
   * @returns Lista com Alunos cadastrados
   * @returns valor nulo em caso de erro na consulta
   */
  static async listarAlunos(): Promise<Array<Aluno> | null> {
    try {
      let listaDeAlunos: Array<Aluno> = [];

      const querySelectAlunos = `SELECT * FROM Aluno;`;

      const respostaBD = await database.query(querySelectAlunos);

      respostaBD.rows.forEach((AlunoBD) => {
        const novoAluno: Aluno = new Aluno(
          AlunoBD.ra,
          AlunoBD.nome,
          AlunoBD.sobrenome,
          AlunoBD.dataNascimento,
          AlunoBD.endereco,
          AlunoBD.email,
          AlunoBD.celular
        );

        novoAluno.setIdAluno(AlunoBD.idAluno);

        listaDeAlunos.push(novoAluno);
      });

      return listaDeAlunos;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);

      return null;
    }
  }

  static async cadastrarAluno(AlunoBD: Aluno): Promise<Boolean> {
    try {
      const queryInsertAluno = `INSERT INTO Aluno (nome, sobrenome, dataNascimento, endereco, email, celular) ) 
                                    VALUES 
                                    ($1, $2, $3, $4, $5, $6)
                                    RETURNING idAluno;`;
      const respostaBD = await database.query(queryInsertAluno, [
        AlunoBD.nome.toUpperCase(),
        AlunoBD.sobrenome,
        AlunoBD.dataNascimento,
        AlunoBD.endereco,
        AlunoBD.email,
        AlunoBD.celular,
      ]);

      if (respostaBD.rows.length > 0) {
        console.info(
          `Aluno cadastrado com sucesso! ID: ${respostaBD.rows[0].idAluno}`
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
export default Aluno;
