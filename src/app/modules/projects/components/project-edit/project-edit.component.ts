import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SupabaseService} from "../../../../services/supabase.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ProjectsService} from "../../services/projects.service";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  project: any | null = null;
  isLoading: boolean = false;
  isModalVisible: boolean = false;
  searchedUsers: any = [];
  selectedUser: any | null = null;

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
    term: new FormControl(null, [Validators.required]),
    field: new FormControl<string>('username')
  })

  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService,
              private projectsService: ProjectsService, private notificationService: NotificationService,
              private fb: FormBuilder) {
  }

  addUser() {
    if (this.selectedUser) {
      const userToAdd = {
        id: this.selectedUser.id,
        email: this.selectedUser.email,
        username: this.selectedUser.username,
        full_name: this.selectedUser.full_name,
        role: this.teamForm.controls.role.getRawValue(),
        isCreator: false
      };
      const usersList = [...this.project.users, userToAdd];
      console.log(usersList)
      this.projectsService.addUserToProject(this.project.id, usersList).subscribe({
        next: (data) => {
          console.log(data)
          this.notificationService.showMessage('success', 'Пользователь успешно добавлен в команду');
          this.closeModal();
        }, error: (error) => {
          this.notificationService.showMessage('error', error.message);
        }
      });
    } else {
      this.notificationService.showMessage('error', 'Не удалось выбрать пользователя. Попробуйте снова.')
    }
  }

  closeModal() {
    this.isModalVisible = false;
    this.searchUsersForm.patchValue({
      term: null,
      field: 'username'
    })
  }

  loadProject() {
    this.isLoading = true;
    this.route.params
      .pipe(switchMap((params) => this.supabaseService.getProject(params['id'])))
      .subscribe(({data}) => {
        this.form.patchValue(data[0]);
        console.log(data)
        this.project = data[0];
        this.isLoading = false;
      })
  }

  selectUser(user
               :
               any
  ) {
    this.selectedUser = user;
  }

  searchUsers() {
    this.searchUsersForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), switchMap(data => this.supabaseService.searchUsers(data.field || '', data.term)))
      .subscribe(data => {
        console.log(data)
        this.searchedUsers = data;
      })
  }

  ngOnInit()
    :
    void {
    this.searchUsers();
    this.loadProject();
  }
}
