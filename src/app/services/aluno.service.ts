import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, CollectionReference, Firestore, doc, updateDoc , deleteDoc, where, query} from '@angular/fire/firestore';
import { Aluno } from '../interfaces/aluno';
@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private alunosCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.alunosCollection = collection(this.firestore, 'alunos');
  }

  listar() {
    return collectionData(this.alunosCollection, { idField: 'id' }) as Observable<Aluno[]>;
  }

  async adicionar(aluno: Aluno) {
    return await addDoc(this.alunosCollection, aluno);
  }

   async atualizar(id: string, aluno: Aluno) {
    const alunoDoc = doc(this.firestore, `alunos/${id}`);
    return await updateDoc(alunoDoc, {...aluno});    
  }

  async excluir(id: string) {
    const alunoDoc = doc(this.firestore, `alunos/${id}`);
    return await deleteDoc(alunoDoc);      
  }

  buscarPorNome(nome: string) {
    if (!nome) {
      return this.listar();
    }

    const filtro = query(
      this.alunosCollection, 
      where('nome', '>=', nome),
      where('nome', '<', nome + '\uf8ff')
    );
    return collectionData(filtro, {idField: 'id'}) as Observable<Aluno[]>;
  }     
}

