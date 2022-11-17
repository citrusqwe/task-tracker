import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private supabaseService: SupabaseService) {
  }

  loadProjects() {
    this.isLoading = true;
    this.supabaseService.getProjects().subscribe(({data}) => {
      this.supabaseService.projects.next(data);
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

}
