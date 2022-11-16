import {Component, Input, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-select-executor',
  templateUrl: './select-executor.component.html',
  styleUrls: ['./select-executor.component.scss']
})
export class SelectExecutorComponent implements OnInit {
  @Input() id: number | null = null;
  options: any = [];

  constructor(private supabaseService: SupabaseService) {
  }

  setOptions() {
    if (this.id) {
      this.supabaseService.getProject(this.id).subscribe(({data, count}) => {
        console.log(data)
        // this.options = data?.map((item: any) => {
        //   return {
        //     label: item.email,
        //     value: item.id
        //   }
        // });
      })
    }
  }

  ngOnInit(): void {
    this.setOptions();
  }

}
