import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../interfaces/professor';
import { addDoc, collection, collectionData, CollectionReference, Firestore, doc, updateDoc , deleteDoc, where, query} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private professoresCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.professoresCollection = collection(this.firestore, 'professores');
  }

  listar() {
    return collectionData(this.professoresCollection, { idField: 'id' }) as Observable<Professor[]>;
  }

  async adicionar(professor: Professor) {
    return await addDoc(this.professoresCollection, professor);
  }

   async atualizar(id: string, professor: Professor) {
    const professorDoc = doc(this.firestore, `professores/${id}`);
    return await updateDoc(professorDoc, {...professor});    
  }

  async excluir(id: string) {
    const professorDoc = doc(this.firestore, `professores/${id}`);
    return await deleteDoc(professorDoc);      
  }

  buscarPorNome(nome: string) {
    if (!nome) {
      return this.listar();
    }

    const filtro = query(
      this.professoresCollection, 
      where('nome', '>=', nome),
      where('nome', '<', nome + '\uf8ff')
    );
    return collectionData(filtro, {idField: 'id'}) as Observable<Professor[]>;
  }     
}

