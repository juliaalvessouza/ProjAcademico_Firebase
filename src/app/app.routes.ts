import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfessorComponent } from './pages/professor/professor.component';
import { AuthGuard } from './guards /auth.guard';
import { AlunoComponent } from './pages/aluno/aluno.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'professor', component: ProfessorComponent, canActivate: [AuthGuard]},
    {path: 'aluno', component: AlunoComponent, canActivate: [AuthGuard]},
];
