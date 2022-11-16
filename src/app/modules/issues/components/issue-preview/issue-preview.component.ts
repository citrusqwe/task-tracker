import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {distinctUntilChanged, EMPTY, Subject, switchMap, takeUntil, tap} from "rxjs";
import {SupabaseService} from "../../../../services/supabase.service";
import {issueTypes, issuePriority, issueState} from "../../../../consts/index";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {IssueService} from "../../services/issue.service";

@Component({
  selector: 'app-issue-preview',
  templateUrl: './issue-preview.component.html',
  styleUrls: ['./issue-preview.component.scss']
})
export class IssuePreviewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading: boolean = false;
  canSave: boolean = false;
  issue: any | null = null;
  projectExecutors: any[] = [];
  projectId: string | null = null;

  issueTypes = issueTypes;
  issuePriority = issuePriority;
  issueState = issueState;

  form = this.fb.group({
    title: new FormControl(),
    description: new FormControl(),
    creator: new FormControl(),
    projectId: new FormControl(null, [Validators.required]),
    priority: new FormControl(),
    type: new FormControl(),
    state: new FormControl(),
    executor: new FormControl(),
  })

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private supabaseService: SupabaseService,
              private issueService: IssueService) {
  }

  closePreview() {
    this.router.navigate([], {queryParams: {}});
  }

  loadIssue() {
    this.isLoading = true;
    this.route.queryParams
      .pipe(takeUntil(this.destroy$), switchMap(params => this.supabaseService.getIssue(params['issue'])))
      .subscribe(data => {
        this.issue = data[0];
        this.form.patchValue({
          ...this.issue
        });
        this.form.patchValue({
          ...this.issue
        })
        this.isLoading = false;
      });
  }

  updateIssue() {
    this.issueService.updateIssue(this.issue.id, this.form.getRawValue());
  }

  clearExecutorField(id: number | null) {
    if (!id) {
      this.projectExecutors = [];
      this.form.get('executor')?.patchValue(null);
    }
  }

  loadExecutors() {
    this.form.controls.projectId.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(id => this.clearExecutorField(id)),
        switchMap(id => id ? this.supabaseService.getProject(id) : EMPTY)
      )
      .subscribe(({data, count}) => {
        const project = data[0];
        this.projectId = `${project.projectId}-${this.issue.id}`;
        this.projectExecutors = project[0]?.users?.map((user: any) => {
          return {
            label: user.email,
            value: user.id
          }
        }) || [];
      })
  }

  ngOnInit(): void {
    this.loadIssue();
    this.loadExecutors();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
