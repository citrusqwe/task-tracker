import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {issuePriority, issueState, issueTypes} from "../../consts/index";
import {SupabaseService} from "../../services/supabase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EMPTY, Subject, switchMap, takeUntil, tap} from "rxjs";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit, OnDestroy {
  projects = [
    {
      id: 4,
      name: 'First'
    }
  ];
  projectExecutors: any = []
  executors: any[] = [];
  issues: any[] = [];
  isPreviewOpen: boolean = false;
  isCreateModalVisible: boolean = false;
  isIssuesLoading: boolean = false;
  destroy$ = new Subject<void>();
  issueTypes = issueTypes;
  issuePriority = issuePriority;
  issueState = issueState;

  form = this.fb.group({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(),
    creator: new FormControl()
  })

  selectsForm = this.fb.group({
    projectId: new FormControl(null),
    priority: new FormControl(2),
    type: new FormControl(2),
    state: new FormControl(1),
    executor: new FormControl(null)
  })

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService, private router: Router,
              private route: ActivatedRoute, private notificationService: NotificationService) {
  }

  showModal(e: Event) {
    e.preventDefault();
    this.isCreateModalVisible = true;
  }

  handleCreateIssueCancel() {
    this.form.reset();
    this.selectsForm.patchValue({
      projectId: null,
      priority: 2,
      type: 2,
      state: 1,
      executor: null
    })
    this.isCreateModalVisible = false;
  }

  createIssue() {
    const issue = {
      ...this.form.getRawValue(),
      ...this.selectsForm.getRawValue(),
      created_at: new Date(),
      updated_at: new Date()
    };
    this.supabaseService.createIssue(issue).subscribe({
      next: () => {
        this.notificationService.showMessage('success', 'Задача успешно создана');
        this.handleCreateIssueCancel();
      }, error: (err) => {
        this.notificationService.showMessage('error', err.message);
      }
    })
  }

  openPreview(id: number) {
    this.router.navigate([], {queryParams: {issue: id}});
  }

  loadIssues(projects: any[]) {
    this.isIssuesLoading = true;
    this.supabaseService.getAllIssues(projects).subscribe(({count, data}) => {
      this.issues = data;
      this.isIssuesLoading = false;
    })
  }

  clearExecutorField(id: number | null) {
    if (!id) {
      this.projectExecutors = [];
      this.selectsForm.get('executor')?.patchValue(null);
    }
  }

  ngOnInit(): void {
    this.executors = [this.supabaseService.user];
    this.form.get('creator')?.setValue(this.supabaseService.user);
    this.projects = this.supabaseService.projects.value;
    this.loadIssues(this.projects);
    this.selectsForm.controls.projectId.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(id => this.clearExecutorField(id)),
        switchMap(id => id ? this.supabaseService.getProject(id) : EMPTY)
      )
      .subscribe(({data, count}) => {
        const project = data[0];
        console.log(project)
        this.projectExecutors = project?.users?.map((user: any) => ({
          label: user.email,
          value: user.id
        })) || [];
      })

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.isPreviewOpen = !!params['issue'];
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
