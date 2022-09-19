export class Contato {
  private _id: string;
  private _nome: string;
  private _telefone: number;
  private _genero: string;
  private _data_nascimento: string;

  constructor(nome: string, telefone: number, genero: string, data_nascimento: string){
    this._nome = nome;
    this._telefone = telefone;
    this._genero = genero;
    this._data_nascimento = data_nascimento;
  }

  public get id(): string{
    return this._id;
  }

  public get nome(): string{
    return this._nome;
  }

  public set nome(nome: string){
    this._nome = nome;
  }

  public get telefone(): number{
    return this._telefone;
  }

  public set telefone(telefone: number){
    this._telefone = telefone;
  }

  public get genero(): string{
    return this._genero;
  }

  public set genero(genero: string){
    this._genero = genero;
  }

  public get data_nascimento(): string{
    return this._data_nascimento;
  }

  public set data_nascimento(data_nascimento: string){
    this._data_nascimento = data_nascimento;
  }

}
