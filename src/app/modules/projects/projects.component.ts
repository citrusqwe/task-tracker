import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = []
  projectsCount: number = 0
  isLoading = false

  constructor(private supabaseService: SupabaseService) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.supabaseService.getProjects()
      .subscribe(({data, count}) => {
        this.projects = data
        this.projectsCount = count
        this.isLoading = false
      })
  }

}
