import {Injectable} from '@angular/core';
import {SupabaseClient} from "@supabase/supabase-js";
import {SupabaseService} from "../../../services/supabase.service";
import {catchError, from, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  supabase!: SupabaseClient;

  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }

  addUserToProject(projectId: number, usersList: any[]) {
    const usersIdList = usersList.map((user) => (user.id));
    const response = new Promise<any>(async (resolve, reject) => {
      const {error} = await this.supabase.from('projects')
        .update({users: usersList, access: usersIdList})
        .eq('id', projectId)
        .select()

      if (error) {
        reject(error)
      } else {
        resolve({})
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }
}
