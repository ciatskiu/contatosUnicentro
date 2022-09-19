import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoFirebaseService {
private PATH : string = 'contatos';

  constructor(private angularFirestore: AngularFirestore) { }

  getContato(id:string){
    return this.angularFirestore
    .collection(this.PATH)
    .doc(id)
    .valueChanges();
  }

  getContatos(){
    return this.angularFirestore
    .collection(this.PATH)
    .snapshotChanges();
  }

  inserirContato(contato: Contato){
    return this.angularFirestore
    .collection(this.PATH)
    .add({nome: contato.nome,
          telefone: contato.telefone,
          genero: contato.genero,
          data_nascimento: contato.data_nascimento});
  }

  editarContato(contato: Contato, id: string){
    return this.angularFirestore
    .collection(this.PATH)
    .doc(id)
    .update({nome: contato.nome,
          telefone: contato.telefone,
          genero: contato.genero,
          data_nascimento: contato.data_nascimento});

  }

  excluirContato(contato: Contato){
    return this.angularFirestore
    .collection(this.PATH)
    .doc(contato.id)
    .delete();
  }
}
