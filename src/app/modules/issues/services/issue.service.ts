import {Injectable} from '@angular/core';
import {SupabaseService} from "../../../services/supabase.service";
import {SupabaseClient} from "@supabase/supabase-js";
import {BehaviorSubject, catchError, from, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  supabase!: SupabaseClient;
  currentExecutorId = new BehaviorSubject<any>(null);

  constructor(private supabaseService: SupabaseService) {

    this.supabase = this.supabaseService.supabase;
  }

  updateIssue(id: number, data: any) {
    const response = new Promise<any>(async (resolve, reject) => {
      const {error} = await this.supabase.from('issues')
      .update(data)
      .eq('id', id)
      if (error) {
        reject(error)
      } else {
        resolve({})
      }
    });
    return from(response).pipe(catchError(err => throwError(err)));
  }
}
