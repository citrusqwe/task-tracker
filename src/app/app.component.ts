import {Component} from '@angular/core';
import {SupabaseService} from "./services/supabase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-tracker'

  constructor(private supabaseService: SupabaseService) {
  }

  ngOnInit() {
    this.supabaseService.getProjects().subscribe(data => this.supabaseService.projects.next(data));
  }
}
