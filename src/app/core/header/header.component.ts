import { AuthService } from './../services/auth.service';
import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';

@Component({
  selector: 'app-rewards-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  formSignIn: FormGroup;
  formSignUp: FormGroup;
  event = new EventEmitter();
  user;
  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-settings', label: 'Settings'},
    { icon: 'po-icon-exit', label: 'Exit', type: 'danger', separator: true, action: () => this.signOff() }
  ];
  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.formSignIn = this.renderFormSignIn();
    this.formSignUp = this.renderFormSignUp();
    this.authService.isLogged ?
      this.loadProfileInfo() : this.authService.redirectResult()
      .then(res => {
        if (res.user){
          this.authService
          .postGoogleUser(
            {email: res.user.email,
            name: res.user.displayName})
            .subscribe(userToken => {
              this.authService.saveToken(userToken);
              this.loadProfileInfo();
            });
        }
    });
  }

  loadProfileInfo(): void {

    if (this.authService.isLogged) {
      this.authService.setProfile(this.authService.info().email, this.authService.info().unique_name);
    }
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

  signUpModal() {
    this.event.emit();
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

  async handleLoginGoogle() {
    this.authService.setNotLogged();
    this.authService.googleSignin()
      .then(() => {
    });
  }
}
