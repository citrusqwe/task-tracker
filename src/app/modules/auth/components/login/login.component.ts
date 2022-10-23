import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {SupabaseService} from "../../../../services/supabase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss', '../../auth.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService, private router: Router) {
  }

  onSubmit() {
    this.supabaseService.signIn(this.loginForm.value.email as string, this.loginForm.value.password as string)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigateByUrl('/board')
        },
        error: (err) => {
          this.supabaseService.showMessage('error', err.message)
        }
      })
  }

  ngOnInit(): void {
  }

}
