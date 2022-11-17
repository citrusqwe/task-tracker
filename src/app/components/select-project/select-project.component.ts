import {Component, Input, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-select-project',
  templateUrl: './select-project.component.html',
  styleUrls: ['./select-project.component.scss']
})
export class SelectProjectComponent implements OnInit {
  @Input() set elementFormControl(control: AbstractControl | null) {
    this.formControl = control as FormControl;
  }

  formControl!: FormControl;
  options: any[] = [];

  constructor(private supabaseService: SupabaseService) {
  }

  ngOnInit(): void {
    this.supabaseService.projects$.subscribe((data) => {
      this.options = data?.map((item: any) => {
        return {
          label: item.name, value: item.id
        }
      }) || [];
    })
  }
}
