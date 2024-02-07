import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: [null, Validators.compose([
      Validators.required, Validators.email])
    ],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(8)])
    ]
  });

  onSubmit(): void {
    this.router.navigateByUrl("/students")
  }
}
