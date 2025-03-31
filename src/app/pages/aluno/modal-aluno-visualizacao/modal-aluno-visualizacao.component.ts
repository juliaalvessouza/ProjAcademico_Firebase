import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Aluno } from '../../../interfaces/aluno';

@Component({
  selector: 'app-modal-aluno-visualizacao',
  standalone: true,
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './modal-aluno-visualizacao.component.html',
  styleUrl: './modal-aluno-visualizacao.component.scss'
})
export class ModalAlunoVisualizacaoComponent {
  aluno: Aluno;

  constructor(
    public dialogRef: MatDialogRef<ModalAlunoVisualizacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Aluno
  ) {
    this.aluno = data;
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
