

class Emprestimo {
  private id_aluno: number = 0;
  private id_livro: number = 0;
  private id_emprestimo: number;
  private data_emprestimo: Date;
  private data_devolucao: Date;
  private status_emprestimo: string;

  constructor(
    _data_emprestimo: Date,
    _status_emprestimo: string,
    _data_devolucao: Date,
    _id_emprestimo: number
  ) {
    this.id_emprestimo = _id_emprestimo;
    this.data_emprestimo = _data_emprestimo;
    this.data_devolucao = _data_devolucao;
    this.status_emprestimo = _status_emprestimo;
  }

  public getIdAluno(): number {
    return this.id_aluno;
  }
  public setIdAluno(_id_aluno: number): void {
    this.id_aluno = _id_aluno;
  }
  public getIdLivro(): number {
    return this.id_livro;
  }
  public setIdLivro(_id_livro: number): void {
    this.id_livro = _id_livro;
  }  
  public getIdEmprestimo(): number {
    return this.id_emprestimo;
  }
  public setIdEmprestimo(_id_emprestimo: number): void {
    this.id_emprestimo = _id_emprestimo;
  }
  public getData_emprestimo(): Date {
    return this.data_emprestimo;
  }
  public setData_emprestimo(_data_emprestimo: Date): void {
    this.data_emprestimo = _data_emprestimo;
  }
  public getData_devolucao(): Date {
    return this.data_devolucao;
  }
  public setData_devolucao(_data_devolucao: Date): void {
    this.data_devolucao = _data_devolucao;
  }

  public getStatus_emprestimo(): string {
    return this.status_emprestimo;
  }

  public setStatus_emprestimo(_status: string): void {
    this.status_emprestimo = _status;
  }
}