import { inject, Injectable } from '@angular/core';
import { Auth , GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  constructor(private router:Router) { }

  public async loginComGoogle(){
    await signInWithPopup(this.auth, new GoogleAuthProvider())
    .then((response: any) => {
      // console.log('Email: ', response.user.email);
      // console.log('Nome: ', response.user.displayName);
      // console.log('Foto: ', response.user.photoURL);

      this.router.navigate(['/']);
    })
    .catch((error: any) => {
      alert("Erro ao realizar login com Google");
      console.error(error);
    });
  }

  public async logout(){
    await this.auth.signOut()
    .then(() => {
      this.router.navigate(['/login']);
    });  
  }

  public async isLogado(){
    return this.auth.currentUser;
  }
}
