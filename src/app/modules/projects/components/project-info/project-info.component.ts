import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../../../services/supabase.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
  project: any | null = null;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService) {
  }

  loadProject() {
    this.isLoading = true;
    this.route.params
      .pipe(switchMap((params) => this.supabaseService.getProject(params['id'])))
      .subscribe(({data}) => {
        this.project = data[0];
        this.isLoading = false;
      })
  }

  ngOnInit(): void {
    this.loadProject();
  }

}
