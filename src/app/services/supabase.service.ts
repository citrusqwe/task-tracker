import {Injectable} from '@angular/core';
import {AuthChangeEvent, createClient, Session, SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, from, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  private readonly MESSAGE_DURATION = 4000

  currentProject = new BehaviorSubject<any>(null);
  currentProject$ = this.currentProject.asObservable();

  constructor(private message: NzMessageService) {
  }

  get user() {
    return this.supabase.auth.user()
  }

  get session() {
    return this.supabase.auth.session()
  }

  get profile() {
    return this.supabase
      .from('profiles')
      .select('*')
      .eq('id', this.user?.id)
      .single()
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signUp(email: string, password: string) {
    const response = new Promise<any>(async (resolve, reject) => {
      const {user, error} = await this.supabase.auth.signUp({email, password})
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
      const {data, error, count} = await this.supabase.from('projects').select('*', {count: 'exact'})
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

  createIssue(data: any) {
    const response = new Promise<any>(async (resolve, reject) => {
      const {error} = await this.supabase
        .from('issues').insert(data)
      if (error) {
        reject(error)
      } else {
        resolve({})
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
