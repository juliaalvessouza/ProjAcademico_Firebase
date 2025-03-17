import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Professor } from '../../../interfaces/professor';

@Component({
  selector: 'app-modal-professor-visualizacao',
  standalone: true,
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './modal-professor-visualizacao.component.html',
  styleUrl: './modal-professor-visualizacao.component.scss'
})
export class ModalProfessorVisualizacaoComponent {
  professor: Professor;

  constructor(
    public dialogRef: MatDialogRef<ModalProfessorVisualizacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Professor
  ) {
    this.professor = data;
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
