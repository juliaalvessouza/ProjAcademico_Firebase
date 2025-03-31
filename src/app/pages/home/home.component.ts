import { Component } from '@angular/core';
import { MenuComponent } from "../../components/menu/menu.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  usuario: any = null; 

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLogado().then(user => {
      console.log('Usuário logado:', user); 
      if (user) {
        this.usuario = {
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || ''
        };
      }
    });
}
}
