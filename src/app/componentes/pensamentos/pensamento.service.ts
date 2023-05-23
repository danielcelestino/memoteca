import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string): Observable<Pensamento[]>{
    //GET /posts?_page=7&_limit=20
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set("_page",pagina)
      .set("_limit", itensPorPagina);

    if(filtro.trim().length > 0){
      params = params.set("q", filtro);
    }


    //return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${itensPorPagina}`);
    // return this.http.get<Pensamento[]>(this.API, { params: params }); //mesmo nome pode omitir
    return this.http.get<Pensamento[]>(this.API, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  excluir(id: number): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url);
  }

  editar(pensamento: Pensamento): Observable<Pensamento>{
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento);
  }

  buscarPorId(id:number): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url);
  }

}
