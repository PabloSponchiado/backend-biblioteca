    class Livro {
  private id_livro: number;
  private titulo: string;
  private autor: string;
  private editora: string;
  private ano_publicacao: string;
  private isbn: string;
  private quant_total: number;
  private quant_disponivel: number;
  private valor_aquisicao: number;
  private status_livro_emprestado: string;

  constructor(
    _titulo: string,
    _autor: string,
    _editora: string,
    _ano_publicacao: string,
    _isbn: string,
    _quant_total: number,
    _quant_disponivel: number,
    _valor_aquisicao: number,
    _status_livro_emprestado: string,
    _id_livro: number
  ) {
    this.id_livro = _id_livro;
    this.titulo = _titulo;
    this.autor = _autor;
    this.editora = _editora;
    this.ano_publicacao = _ano_publicacao;
    this.isbn = _isbn;
    this.quant_total = _quant_total;
    this.quant_disponivel = _quant_disponivel;
    this.valor_aquisicao = _valor_aquisicao;
    this.status_livro_emprestado = _status_livro_emprestado;
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
    return this.status_livro_emprestado;
  }

  public setDisponibilidade(_status: string): void {
    this.status_livro_emprestado = _status;
  }

  public getQuantDisponivel(): number {
    return this.quant_disponivel;
  }

public emprestar(): boolean {
  if (this.quant_disponivel <= 0) return false;
  this.quant_disponivel--;
  return true;
}

  public devolver(): void {
    if (this.quant_disponivel < this.quant_total) {
      this.quant_disponivel++;
    }
  }
}