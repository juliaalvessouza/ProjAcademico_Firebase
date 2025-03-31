import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Professor } from '../../../interfaces/professor';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-modal-aluno-adicao-edicao',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,  MatDialogModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './modal-aluno-adicao-edicao.component.html',
  styleUrl: './modal-aluno-adicao-edicao.component.scss'
})
export class ModalAlunoAdicaoEdicaoComponent implements OnInit {
  formAluno!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalAlunoAdicaoEdicaoComponent>,
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    @Inject(MAT_DIALOG_DATA) public data: Professor
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formAluno = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cep: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      logradouro: [null, [Validators.required, Validators.minLength(3)]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required, Validators.minLength(3)]]
    });

    if (this.data) {
      this.formAluno.patchValue(this.data);
    } 
  }

  fecharModal() {
    this.dialogRef.close();
  }

  salvar() {
    const dadosFormulario = this.formAluno.getRawValue();

    if (this.data) {
      this.alunoService.atualizar(this.data.id!, dadosFormulario)
      .then(() => {
        alert('Aluno atualizado com sucesso!');
        this.fecharModal();
      })
      .catch(error => {
        alert('Erro ao atualizar aluno!');
        console.error(error);
      })      

    } else {
      this.alunoService.adicionar(dadosFormulario)
      .then(() => {
        alert('Aluno cadastrado com sucesso!');
        this.fecharModal();
      })
      .catch(error => {
        alert('Erro ao cadastrar aluno!');
        console.error(error);
      })  
    }    
   }
   
}