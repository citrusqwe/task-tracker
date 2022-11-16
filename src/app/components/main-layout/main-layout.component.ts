import { Component, OnInit } from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.supabaseService.getProjects().subscribe(data => this.supabaseService.projects.next(data));
  }

}
