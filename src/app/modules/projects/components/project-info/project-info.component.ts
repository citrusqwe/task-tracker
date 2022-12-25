import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SupabaseService} from "../../../../services/supabase.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, switchMap, combineLatest} from "rxjs";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('overdueCanvas') overdueCanvas!: ElementRef;
  project: any | null = null;
  isLoading: boolean = false;
  usersProfiles = new BehaviorSubject([]);
  usersIssues = new BehaviorSubject([]);
  obs1 = this.usersProfiles.asObservable();
  obs2 = this.usersIssues.asObservable();

  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService) {
  }

  loadProject() {
    this.isLoading = true;
    this.route.params
    .pipe(switchMap((params) => this.supabaseService.getProject(params['id'])))
    .subscribe(({data}) => {
      this.project = data[0];
      this.supabaseService.getUsersProfiles(data[0]?.access).subscribe(data => this.usersProfiles.next(data));
      this.supabaseService.getUsersIssues(data[0]?.access).subscribe(data => this.usersIssues.next(data));
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
    this.loadProject();
  }

  ngAfterViewInit() {
    combineLatest(this.obs1, this.obs2).subscribe(([profiles, issues]) => {
      if (profiles.length && issues.length) {
        const labels = profiles?.map((p: any) => p.full_name);
        const data = profiles?.map((p: any) => {
          return issues?.filter((i: any) => i.executor === p.id && i.isEnded).length;
        });
        const dataOverdue = profiles?.map((p: any) => {
          return issues?.filter((i: any) => i.executor === p.id && i.isOverdue).length;
        });
        if (labels.length && data.length) {
          new Chart(this.canvas?.nativeElement, {
            type: 'bar',
            data: {
              labels,
              datasets: [
                {
                  label: "Выполненные задачи команды",
                  data,
                  backgroundColor: '#5dc43a'
                }
              ]
            },
            options: {
              aspectRatio: 2.5,
            }
          });
          new Chart(this.overdueCanvas?.nativeElement, {
            type: 'bar',
            data: {
              labels,
              datasets: [
                {
                  label: "Просроченные задачи команды",
                  data: dataOverdue,
                  backgroundColor: '#eb2f96'
                }
              ]
            },
            options: {
              aspectRatio: 2.5,
            }
          });
        }
      }
    });
  }
}
