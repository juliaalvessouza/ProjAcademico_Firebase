import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment.development';
import { addDoc, collection, deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Professor } from '../interfaces/professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(
    private firestore: Firestore
  ) { }

  listar(){
    let app = initializeApp(environment.firebaseConfig);
    let db = getFirestore(app);

    const professoresCollection  = collection(db, 'professores');
    return collectionData(professoresCollection) as Observable<Professor[]>;
  }

  adicionar(professor: Professor){
    let app = initializeApp(environment.firebaseConfig);
    let db = getFirestore(app);

    const professoresCollection  = collection(db, 'professores');
    return addDoc(professoresCollection,  professor);
  }

  editar(usuarioId: string, professor: Professor){
    let app = initializeApp(environment.firebaseConfig);
    let db = getFirestore(app);

    const professorDoc = doc(db, `professores/${usuarioId}`);
    return updateDoc(professorDoc, {...professor});

  }

  excluir(usuarioId: string){
    let app = initializeApp(environment.firebaseConfig);
    let db = getFirestore(app);

    const professorDoc = doc(db, `professores/${usuarioId}`);
    return deleteDoc(professorDoc);

  }
}
