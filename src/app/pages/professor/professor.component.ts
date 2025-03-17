import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { ProfessorService } from '../../services/professor.service';

import { Professor } from '../../interfaces/professor';

import { MenuComponent } from "../../components/menu/menu.component";
import { ModalProfessorVisualizacaoComponent } from './modal-professor-visualizacao/modal-professor-visualizacao.component';
import { ModalProfessorAdicaoEdicaoComponent } from './modal-professor-adicao-edicao/modal-professor-adicao-edicao.component';

import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [MenuComponent, MatFormField, MatInputModule, MatIconModule, MatPaginatorModule, MatTableModule, MatSortModule, MatDialogModule, MatButtonModule],
  templateUrl: './professor.component.html',
  styleUrl: './professor.component.scss'
})
export class ProfessorComponent implements OnInit, AfterViewInit {
  constructor(
    private professorService: ProfessorService,
    private dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['id', 'nome', 'cep', 'logradouro', 'numero', 'acao'];

  dataSource = new MatTableDataSource<Professor>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.listarProfessores();    
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
  }
  
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }
  
  aplicarFiltroBackendExato(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.professorService.buscarPorNomeExato(filterValue).subscribe({
    //   next: (response) => {            
    //     this.dataSource = new MatTableDataSource(response);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;            
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }  
    // });      
  }  
  
  aplicarFiltroBackendQueComeceCom(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.professorService.buscarPorNomeQueComeceCom(filterValue).subscribe({
    //   next: (response) => {            
    //     this.dataSource = new MatTableDataSource(response);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;            
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }  
    // });      
  }  
  //-----

  exibirModalVisualizacaoProfessor(professor: Professor) {
    this.dialog.open(ModalProfessorVisualizacaoComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '80%',
      data: professor
    })
  }

  exibirModalAdicaoProfessor() {
    this.dialog.open(ModalProfessorAdicaoEdicaoComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '80%'
    }) //.afterClosed().subscribe(() => this.listarProfessores());  (Usar somente quando for um banco dedas relacional com API em .NET ou JAVA)
  }  

  exibirModalEdicaoProfessor(professor: Professor) {
    this.dialog.open(ModalProfessorAdicaoEdicaoComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '80%',
      data: professor
    }) //.afterClosed().subscribe(() => this.listarProfessores());  (Usar somente quando for um banco dedas relacional com API em .NET ou JAVA)
  }  

  listarProfessores() {
    this.professorService.listar().subscribe({      
      next: (response) => {        
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });    
  }

  excluir(id: string) {
    this.professorService.excluir(id)
    .then(() => {
      alert('Professor excluído com sucesso!');
    })
    .catch(error => {
      alert('Erro ao excluir professor!'); 
      console.error(error)
    });
  }  
}
