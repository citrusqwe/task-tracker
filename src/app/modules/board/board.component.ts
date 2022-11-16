import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  project: any | null = null;
  issues: any[] = [];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  work = ['Get to work test', 'Pick up groceries2', 'Go home3', 'Fall asleep4'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  isBoardLoading: boolean = false;

  constructor(private supabaseService: SupabaseService) {
  }

  ngOnInit(): void {
    this.isBoardLoading = true;
    forkJoin([
      this.supabaseService.getProject(4),
      this.supabaseService.getIssues(4)
    ]).subscribe(([project, issues]) => {
      this.project = project.data[0] || null;
      this.issues = issues.data || [];
      this.supabaseService.currentProject.next(this.project);
      this.isBoardLoading = false;

      console.log(this.issues);
      console.log(this.project);
    })
  }

}
