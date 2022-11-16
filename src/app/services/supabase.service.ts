import {Injectable} from '@angular/core';
import {AuthChangeEvent, createClient, Session, SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, from, map, tap, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  private readonly MESSAGE_DURATION = 4000

  currentProject = new BehaviorSubject<any>(null);
  currentProject$ = this.currentProject.asObservable();
  projects = new BehaviorSubject<any>([]);
  projects$ = this.projects.asObservable();
  executors = new BehaviorSubject<any>([]);
  executors$ = this.executors.asObservable();

  constructor(private message: NzMessageService) {
  }

  get user() {
    return this.supabase.auth.user()
  }

  get session() {
    return this.supabase.auth.session()
  }

  profile() {
    const response = new Promise<any>(async (resolve, reject) => {
      const {data, error} = await this.supabase.from('profiles').select('*')
        .eq('id', this.user?.id)
        .single();
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  updateProfile(id: number, data: any) {
    const response = new Promise<any>(async (resolve, reject) => {
      const {error} = await this.supabase
        .from('profiles')
        .update(data)
        .eq('id', id)
      if (error) {
        reject(error)
      } else {
        resolve({})
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  searchUsers(field: string, user: any) {
    const response = new Promise<any>(async (resolve, reject) => {
      const {data, error} = await this.supabase
        .from('profiles')
        .select('*')
        .textSearch(field, user)
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signUp(data: any) {
    const response = new Promise<any>(async (resolve, reject) => {
      console.log(data)
      const {user, error} = await this.supabase.auth
        .signUp({email: data.email, password: data.password}, {
          data: {
            full_name: `${data.firstName} ${data.lastName}`,
          }
        });
      if (error) {
        reject(error)
      } else {
        resolve(user)
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  signIn(email: string, password: string) {
    const response = new Promise<any>(async (resolve, reject) => {
      const {user, error} = await this.supabase.auth.signIn({email, password})
      if (error) {
        reject(error)
      } else {
        resolve(user)
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  getProjects() {
    const response = new Promise<any>(async (resolve, reject) => {
      const {data, error, count} = await this.supabase.from('projects')
        .select('*', {count: 'exact'})
      if (error) {
        reject(error)
      } else {
        resolve({data, count})
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  getProject(id: number) {
    const response = new Promise<any>(async (resolve, reject) => {
      const {data, error, count} = await this.supabase.from('projects')
        .select('*', {count: 'exact'})
        .eq('id', id)
      if (error) {
        reject(error)
      } else {
        resolve({data, count})
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  getIssues(projectId: number) {
    const response = new Promise<any>(async (resolve, reject) => {
      const {data, error, count} = await this.supabase.from('issues')
        .select('*', {count: 'exact'})
        .eq('projectId', projectId)
      if (error) {
        reject(error)
      } else {
        resolve({data, count})
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  getAllIssues() {
    const response = new Promise<any>(async (resolve, reject) => {
      const {data, error, count} = await this.supabase.from('issues')
        .select('*', {count: 'exact'})
      if (error) {
        reject(error)
      } else {
        resolve({data, count})
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  getIssue(id: number) {
    const response = new Promise<any>(async (resolve, reject) => {
      if (id) {
        const {data, error} = await this.supabase.from('issues')
          .select('*')
          .eq('id', id)
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  createProject(data: any) {
    const response = new Promise<any>(async (resolve, reject) => {
      const {error} = await this.supabase
        .from('projects').insert(data)
      if (error) {
        reject(error)
      } else {
        resolve({})
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  createIssueBoard(columns: any, projectId: number) {
    // const response = new Promise<any>(async (resolve, reject) => {
    //   const {error} = await this.supabase
    //     .from('issues').insert(columns)
    //   if (error) {
    //     reject(error)
    //   } else {
    //     resolve({})
    //   }
    // })
    const response = new Promise<any>(async (resolve, reject) => {
      const {data, error} = await this.supabase
        .from('projects')
        .update({columns})
        .eq('id', projectId)
        .select()
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  createIssue(issue: any) {
    const response = new Promise<any>(async (resolve, reject) => {
      const {data, error} = await this.supabase
        .from('issues')
        .insert(issue)
        .select()
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
    return from(response).pipe(catchError(err => throwError(err)))
  }

  showMessage(type: string, message: string) {
    this.message.create(type, message)
  }

  signOut() {
    return this.supabase.auth.signOut()
  }
}
