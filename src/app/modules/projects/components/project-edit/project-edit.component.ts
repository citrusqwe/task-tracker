import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SupabaseService} from "../../../../services/supabase.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  project: any | null = null;
  isLoading: boolean = false;
  isModalVisible: boolean = false;

  roles: any = [
    {label: 'Разработчик', value: 'developer'},
    {label: 'Администратор', value: 'admin'},
    {label: 'Читатель задач', value: 'viewer'},
  ]

  form = this.fb.group({
    name: new FormControl(null, [Validators.required]),
    projectId: new FormControl(null, [Validators.required]),
    initialNum: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    columns: new FormControl<any[]>([]),
    users: new FormControl<any[]>([]),
    created_at: new FormControl('')
  })

  teamForm = this.fb.group({
    role: new FormControl('developer')
  })

  searchUsersForm = this.fb.group({
    term: new FormControl(),
    field: new FormControl<string>('username')
  })

  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService, private fb: FormBuilder) {
  }

  addUser() {

  }

  searchUsers() {

  }

  loadProject() {
    this.isLoading = true;
    this.route.params
      .pipe(switchMap((params) => this.supabaseService.getProject(params['id'])))
      .subscribe(({data}) => {
        this.form.patchValue(data[0]);
        this.project = data[0];
        this.isLoading = false;
      })
  }

  ngOnInit(): void {
    this.searchUsersForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), switchMap(data => this.supabaseService.searchUsers(data.field || '', data.term)))
      .subscribe(data => {
        console.log(data)
      })

    this.loadProject();
  }
}
