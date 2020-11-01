import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-rewards-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent extends HeaderComponent implements OnInit {

  @Input() event: EventEmitter<any>;
  @Input() parent: FormGroup;
  subscriptionToEvent: Subscription;
  patternCPF = '([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})';
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  register: PoModalAction =  {
    action: () => {
      this.handleClose();
    },
    label: 'Registar',
    danger: false
  };

  close: PoModalAction = {
    action: () => {
      this.handleClose();
    },
    label: 'Cancelar',
    danger: true
  };

  constructor(fb: FormBuilder, authService: AuthService) {
      super(fb, authService);
   }

  ngOnInit(): void {
    this.subscriptionToEvent = this.event.subscribe(() => {
      this.poModal.open();
    });
  }

  handleClose() {
    this.poModal.close();
  }

  handleSubmit() {
    this.authService
    .postRegister(
      this.parent.get('email').value,
      this.parent.get('password').value,
      this.parent.get('name').value,
      this.parent.get('cpf').value,
      '').subscribe(res => {
        this.authService.saveToken(res);
        this.poModal.close();
        this.loadProfileInfo();
      });
  }
}
