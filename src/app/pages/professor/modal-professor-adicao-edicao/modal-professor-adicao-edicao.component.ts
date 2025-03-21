import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfessorService } from '../../../services/professor.service';
import { Professor } from '../../../interfaces/professor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-professor-adicao-edicao',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,  MatDialogModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './modal-professor-adicao-edicao.component.html',
  styleUrl: './modal-professor-adicao-edicao.component.scss'
})
export class ModalProfessorAdicaoEdicaoComponent implements OnInit {
  formProfessor!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalProfessorAdicaoEdicaoComponent>,
    private formBuilder: FormBuilder,
    private professorService: ProfessorService,
    @Inject(MAT_DIALOG_DATA) public data: Professor
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formProfessor = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cep: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      logradouro: [null, [Validators.required, Validators.minLength(3)]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required, Validators.minLength(3)]]
    });

    if (this.data) {
      this.formProfessor.patchValue(this.data);
    } 
  }

  fecharModal() {
    this.dialogRef.close();
  }

  salvar() {
    const dadosFormulario = this.formProfessor.getRawValue();

    if (this.data) {
      this.professorService.atualizar(this.data.id!, dadosFormulario)
      .then(() => {
        alert('Professor atualizado com sucesso!');
        this.fecharModal();
      })
      .catch(error => {
        alert('Erro ao atualizar professor!');
        console.error(error);
      })      

    } else {
      this.professorService.adicionar(dadosFormulario)
      .then(() => {
        alert('Professor cadastrado com sucesso!');
        this.fecharModal();
      })
      .catch(error => {
        alert('Erro ao cadastrar professor!');
        console.error(error);
      })  
    }    
   }
   
}