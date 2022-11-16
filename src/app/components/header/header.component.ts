import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user = this.supabaseService.user
  profile: any | null = null;

  constructor(private authService: AuthService, private supabaseService: SupabaseService) {
  }

  logout() {
    this.supabaseService.signOut();
  }

  ngOnInit(): void {
    console.log('user', this.user)
    this.supabaseService.profile().subscribe(data => this.profile = data);
    // console.log('profile', this.supabaseService.profile)
  }

  ngAfterViewInit() {
  }

}
