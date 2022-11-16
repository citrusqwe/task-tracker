import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {issuePriority, issueState, issueTypes} from "../../consts/index";
import {SupabaseService} from "../../services/supabase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

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
    title: new FormControl(),
    description: new FormControl(),
    creator: new FormControl()
  })

  selectsForm = this.fb.group({
    projectId: new FormControl(),
    priority: new FormControl(),
    type: new FormControl(),
    state: new FormControl(),
    executor: new FormControl(),
  })

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService, private router: Router,
              private route: ActivatedRoute) {
  }

  showModal(e: Event) {
    e.preventDefault();
    this.isCreateModalVisible = true;
  }

  handleCreateIssueCancel() {
    this.form.reset();
    this.isCreateModalVisible = false;
  }

  createIssue() {
    const issue = {
      ...this.form.getRawValue(),
      ...this.selectsForm.getRawValue(),
      created_at: new Date(),
      updated_at: new Date()
    };
    this.supabaseService.createIssue(issue);
  }

  openPreview(id: number) {
    this.router.navigate([], {queryParams: {issue: id}});
  }

  loadIssues() {
    this.isIssuesLoading = true;
    this.supabaseService.getAllIssues().subscribe(({count, data}) => {
      this.issues = data;
      this.isIssuesLoading = false;
    })
  }

  ngOnInit(): void {
    this.executors = [this.supabaseService.user];
    this.form.get('creator')?.setValue(this.supabaseService.user);
    this.loadIssues();
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.isPreviewOpen = !!params['issue'];
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
