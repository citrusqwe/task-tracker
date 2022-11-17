import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {SupabaseService} from "../../../../services/supabase.service";
import {v4 as uuid} from 'uuid';
import {Router} from "@angular/router";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss']
})
export class ProjectsCreateComponent implements OnInit {
  defaultColumns = [
    {
      uid: '1',
      name: 'Открыта',
      issues: []
    }, {
      uid: '2',
      name: 'В обработке',
      issues: []
    }, {
      uid: '3',
      name: 'Исправлена',
      issues: []
    }, {
      uid: '4',
      name: 'Проверена',
      issues: []
    }
  ];

  form = this.fb.group({
    name: new FormControl(null, [Validators.required]),
    projectId: new FormControl(null, [Validators.required]),
    initialNum: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    columns: new FormControl<any[]>([]),
    users: new FormControl<any[]>([]),
    created_at: new FormControl('')
  })

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService,
              private notificationService: NotificationService, private router: Router) {
  }

  onSubmit() {
    const columns = this.defaultColumns.map(col => {
      return {...col, uid: uuid()}
    });
    const users = [{
      id: this.supabaseService.user?.id,
      email: this.supabaseService.user?.email,
      isCreator: true
    }]
    this.form.patchValue({
      columns: columns,
      users: users,
      created_at: new Date().toISOString()
    })

    if (this.form.invalid) {
      Object.entries(this.form.controls).forEach(([key, value]) => {
        this.form.get(key)?.markAsDirty()
        this.form.get(key)?.markAsTouched()
        this.form.get(key)?.updateValueAndValidity()
      })
    } else {

      this.supabaseService.createProject({
        ...this.form.getRawValue(),
        access: [this.supabaseService.user?.id]
      }).subscribe({
        next: () => {
          this.notificationService.showMessage('success', 'Проект успешно создан');
          this.router.navigateByUrl('/projects')
        }, error: (err) => {
          this.notificationService.showMessage('error', err.message);
        }
      })
      console.log(this.form.getRawValue());
    }
  }

  ngOnInit(): void {
    console.log(uuid())
  }

}
