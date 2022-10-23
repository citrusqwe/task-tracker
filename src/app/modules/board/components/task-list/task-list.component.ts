import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {priorities} from "../../../../consts";
import {SupabaseService} from "../../../../services/supabase.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() column: any | null = null;
  currentProject: any | null = null;
  list: any[] = [];
  public priorities = priorities
  isPopoverOpen = false

  form = this.fb.group({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    projectId: new FormControl(),
    comments: new FormControl([]),
    creator: new FormControl(),
    stage: new FormControl(),
    priority: new FormControl(0),
    executor: new FormControl(''),
    created_at: new FormControl(),
    updated_at: new FormControl(),
  })

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService) {
  }

  popoverVisibleChange(state: boolean) {
    if (!state) {
      this.isPopoverOpen = false
      this.form.reset()
      this.form.patchValue({
        title: '',
        description: '',
        priority: 0,
        executor: ''
      })
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  createProject() {
    const data = {...this.form.getRawValue(), created_at: new Date(), updated_at: new Date()};
    this.supabaseService.createIssue(data);
  }

  ngOnInit(): void {
    this.currentProject = this.supabaseService.currentProject.value;
    this.form.get('projectId')?.setValue(this.currentProject.id);
    this.form.get('stage')?.setValue(this.column);
    this.form.get('creator')?.setValue(this.supabaseService.user);
  }
}
