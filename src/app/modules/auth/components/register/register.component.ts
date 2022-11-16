import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, UntypedFormControl, Validators} from "@angular/forms";
import {SupabaseService} from "../../../../services/supabase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.scss', '../../auth.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private supabaseService: SupabaseService, private router: Router) {
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.registerForm.controls.passwordMatch.updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.registerForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  registerForm = this.fb.group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    passwordMatch: new FormControl<string>('', [Validators.required, this.confirmationValidator]),
  })

  onSubmit() {
    this.supabaseService.signUp(this.registerForm.getRawValue())
      .subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigateByUrl('/projects')
        },
        error: (err) => {
          this.supabaseService.showMessage('error', err.message)
        }
      })
  }

  ngOnInit(): void {
  }

}
