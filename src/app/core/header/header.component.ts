import { AuthService } from './../services/auth.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PoPageSlideComponent, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';

@Component({
  selector: 'app-rewards-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  formSignIn: FormGroup;
  formSignUp: FormGroup;
  patternCPF = '([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})';
  profile: PoToolbarProfile;
  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-settings', label: 'Settings'},
    { icon: 'po-icon-exit', label: 'Exit', type: 'danger', separator: true, action: () => this.signOff() }
  ];
  constructor(
    private fb: FormBuilder,
    public authService: AuthService) { }


  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.formSignIn = this.renderFormSignIn();
    this.formSignUp = this.renderFormSignUp();
    this.loadProfileInfo();

  }

  loadProfileInfo(): void {
    this.authService.isLogged ? this.profile =  {
      subtitle: this.authService.info().email,
      title: this.authService.info().unique_name
    } : this.profile =  null;
  }

  renderFormSignIn() {
    return this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  renderFormSignUp() {
    return this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get email(): string{
    return this.formSignIn.get('email').value;
  }

  get password(): string{
    return this.formSignIn.get('password').value;
  }

  handleSignIn() {
    this.subscription = this.subscriptionToLogin();
  }

  signOff() {
    this.authService.setNotLogged();
  }

  subscriptionToLogin(): Subscription {
    return this.authService.login(this.email, this.password)
    .subscribe(
      response => {
        this.authService.saveToken(response);
        this.loadProfileInfo();
      }
    );
  }

  async loginGoogle() {
    // this.auth.googleSignin()
    //   .then(() => {
    //     this.router.navigate(['routine']);
    //     this.auth.authByGoogle = true;
    //     this.auth.setUserLogged(); });
  }

}
