import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/model/login-response.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'pkmn-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public formControlEmail: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]);
  public formControlPswd: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  public loginError = '';

  constructor(private authSerive: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public submitForm(): void {
    this.authSerive.login(this.formControlEmail.value, this.formControlPswd.value).subscribe(
      (result: LoginResponse) => {
        if(result.access_token === undefined) {
          this.formControlPswd.setValue('');
          this.loginError = "Connexion refusé, réessayez ...";
        } else {
          this.loginError = "";
          this.router.navigate(['pokemons/team']);
        }
      });
  }

  public getEmailError(): string {
    if (this.formControlEmail.hasError('required')) {
      return 'Vous devez rentrer un email';
    } else if (this.formControlEmail.hasError('pattern')){
      return 'Vous devez rentrer un email correct';
    }
    return '';
  }

  public getPswdError(): string {
    if (this.formControlPswd.hasError('required')) {
      return 'Vous devez rentrer un mot de passe';
    } else if (this.formControlPswd.hasError('minlength')){
      return 'Vous devez rentrer un mot de passe de plus de 3 caractères';
    }
    return '';

  }

}
