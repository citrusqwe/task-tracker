import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EMPTY, Subject, switchMap, takeUntil, tap} from "rxjs";
import {SupabaseService} from "../../../../services/supabase.service";
import {Issue} from "../../../../models/issue.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {IssueService} from "../../services/issue.service";
import {NotificationService} from "../../../../services/notification.service";
import {issueTypes, issuePriority, issueState} from "../../../../consts/index";
import {uuid} from "@supabase/supabase-js/dist/main/lib/helpers";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  issue: Issue | null = null;
  isLoading: boolean = false;
  isCommentEdit: boolean = false;
  isEdit: boolean = false;
  issueTypes = issueTypes;
  issuePriority = issuePriority;
  issueState = issueState;
  projectExecutors: any[] = [];
  projectId: string | null = null;
  issueComments: any[] = [];

  commentsForm = this.fb.group({
    comment: new FormControl(null, [Validators.required])
  });

  commentsEditForm = this.fb.group({
    comment: new FormControl(null, [Validators.required])
  });

  form = this.fb.group({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(),
    creator: new FormControl()
  });

  selectsForm = this.fb.group({
    projectId: new FormControl(null, [Validators.required]),
    priority: new FormControl(),
    type: new FormControl(),
    state: new FormControl(),
    executor: new FormControl()
  });

  constructor(private route: ActivatedRoute,
              private supabaseService: SupabaseService,
              private fb: FormBuilder,
              private issueService: IssueService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  loadIssue() {
    this.isLoading = true;
    this.route.params
    .pipe(
      takeUntil(this.destroy$),
      switchMap((params) => this.supabaseService.getIssue(+params['id']))
    )
    .subscribe({
      next: data => {
        this.issue = data[0];
        this.form.patchValue(data[0]);
        this.selectsForm.patchValue(data[0]);
        this.commentsForm.patchValue(data[0]);
        this.issueComments = data[0].comments.map((c: any) => ({...c, isEdit: false})) || [];
        this.isLoading = false;
      }, error: () => {
        this.isLoading = false;
      }
    });
  }

  clearExecutorField(id: number | null) {
    if (!id) {
      this.projectExecutors = [];
      this.selectsForm.get('executor')?.patchValue(null);
    }
  }

  loadExecutors() {
    this.selectsForm.controls.projectId.valueChanges
    .pipe(
      takeUntil(this.destroy$),
      tap(id => this.clearExecutorField(id)),
      switchMap(id => id ? this.supabaseService.getProject(id) : EMPTY)
    )
    .subscribe(({data, count}) => {
      const project = data[0];
      this.projectId = `${project.projectId}-${this.issue?.id}`;
      this.projectExecutors = project?.users?.map((user: any) => {
        return {
          label: user.email,
          value: user.id
        }
      }) || [];
    })
  }

  toIssues() {
    this.router.navigateByUrl('issues');
  }

  updateIssue() {
    this.issueService.updateIssue(this.issue?.id || 0, this.form.getRawValue()).subscribe({
      next: () => {
        this.notificationService.showMessage('success', 'Задача успешно обновлена');
        Object.entries(this.form.getRawValue()).forEach(([key, value]) => {
          if (this.issue) {
            // @ts-ignore
            this.issue[key] = value;
          }
        });
        this.form.patchValue({
          title: this.form.getRawValue().title,
          description: this.form.getRawValue().description
        });
        this.isEdit = false;
      }, error: (err) => {
        this.notificationService.showMessage('error', err.message);
      }
    });
  }

  saveComment(newComments?: any) {
    const data = this.commentsForm.getRawValue();
    const comment = {
      comment: data.comment,
      uid: uuid(),
      created_at: new Date(),
      creator: this.supabaseService.user
    };
    const comments = newComments ? newComments : this.issue?.comments ? [...this.issue.comments, comment] : [comment];
    this.issueService.updateIssue(this.issue?.id || 0, {comments}).subscribe({
      next: () => {
        this.notificationService.showMessage('success', newComments ? 'Комментарий обновлен' : 'Комментарий добавлен');
        this.issueComments = comments.map((c: any) => ({...c, isEdit: false}));
        this.commentsForm.reset();
        this.isEdit = false;
      }, error: (err) => {
        this.notificationService.showMessage('error', err.message);
      }
    });
  }

  removeComment(id: string, index: number) {
    this.issueComments.splice(index, 1);
    this.saveComment(this.issueComments);
  }

  openCommentEdit(item: any) {
    item.isEdit = true;
    this.commentsEditForm.patchValue({
      comment: item.comment
    });
  }

  closeCommentEdit(item: any) {
    item.isEdit = false;
    this.commentsEditForm.reset();
  }

  updateComment(item: any, index: number) {
    console.log(item, index)
    const data = this.commentsEditForm.getRawValue();
    item.comment = data.comment;
    this.saveComment(this.issueComments);
    item.isEdit = false;
  }

  isMyComment(creator: any) {
    return (creator?.id === this.supabaseService.user?.id);
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
