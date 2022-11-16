import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any | null = null;

  form = this.fb.group({
    full_name: new FormControl(),
    username: new FormControl(),
    avatar_url: new FormControl(),
    email: new FormControl()
  });

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService) {
  }

  updateProfile() {
    this.supabaseService.updateProfile(this.profile.id, this.form.getRawValue());
  }

  ngOnInit(): void {
    this.supabaseService.profile().subscribe(data => {
      this.profile = data;
      this.form.patchValue(data);
    })
  }
}
