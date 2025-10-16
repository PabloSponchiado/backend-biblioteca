class Aluno {
  private id_aluno: number;
  private ra: string;
  private nome: string;
  private sobrenome: string;
  private data_nascimento: Date;
  private endereco: string;
  private email: string;
  private celular: string;

  constructor(
    _ra: string,
    _nome: string,
    _sobrenome: string,
    _data_nascimento: Date,
    _endereco: string,
    _email: string,
    _celular: string,
    _id_aluno: number
  ) {
    this.id_aluno = _id_aluno;
    this.ra = _ra;
    this.nome = _nome;
    this.sobrenome = _sobrenome;
    this.data_nascimento = _data_nascimento;
    this.endereco = _endereco;
    this.email = _email;
    this.celular = _celular;
  }
  public getIdAluno(): number {
    return this.id_aluno;
  }

  public setIdAluno(_id_aluno: number): void {
    this.id_aluno = _id_aluno;
  }

  public getRa(): string {
    return this.ra;
  }

  public setRa(_ra: string): void {
    this.ra = _ra;
  }

  public getNomeCompleto(): string {
    return `${this.nome} ${this.sobrenome}`;
  }
  public setNome(_nome: string): void {
    this.nome = _nome;
  }
  public getSobrenome(): string {
    return this.sobrenome;
  }
  public setSobrenome(_sobrenome: string): void {
    this.sobrenome = _sobrenome;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(_email: string): void {
    this.email = _email;
  }

  public getCelular(): string {
    return this.celular;
  }

  public setCelular(_celular: string): void {
    this.celular = _celular;
   }
   public getDataNascimento(): Date {
    return this.data_nascimento;
   }
    public setDataNascimento(_data_nascimento: Date): void {
    this.data_nascimento = _data_nascimento;
   }
    public getEndereco(): string { 
    return this.endereco;
   }
    public setEndereco(_endereco: string): void {
    this.endereco = _endereco;
   }
}


