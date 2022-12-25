import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import {issueState} from "../../consts/index";
import {IssueService} from "../../modules/issues/services/issue.service";
import {Issue} from "../../models/issue.model";
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-select-state',
  templateUrl: './select-state.component.html',
  styleUrls: ['./select-state.component.scss']
})
export class SelectStateComponent implements OnInit {
  @Input() set elementFormControl(control: AbstractControl | null) {
    this.formControl = control as FormControl;
  }

  @Input() issue: Issue | null = null;
  currentExecutorId: any = null;

  formControl!: FormControl;
  options: any[] = issueState;

  constructor(private issueService: IssueService, private supabaseService: SupabaseService) {
  }

  onStateChange(state: number) {
    switch (state) {
      case 5:
        if (!this.issue?.isEnded) {
          this.issueService.updateIssue(this.issue?.id || 0, {isEnded: true});
          // this.supabaseService.updateProfile(this.currentExecutorId, {tasksEnded: });
        }
        break;
      default:
        if (this.issue?.isEnded) {
          this.issueService.updateIssue(this.issue?.id || 0, {isEnded: false});
        }
        break;
    }
  }

  ngOnInit(): void {
    this.issueService.currentExecutorId.subscribe(id => this.currentExecutorId = id);
  }

}
