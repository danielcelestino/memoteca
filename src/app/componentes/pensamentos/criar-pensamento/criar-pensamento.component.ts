import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from '../../validators/minusculoValidators';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

   formulario!: FormGroup;


  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.formulario = new FormGroup({ jeito não simplificado
    //   conteudo: new FormControl(''),
    //   autoria: new FormControl(''),
    //   modelo: new FormControl('')
    // })

    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        minusculoValidator
      ])],
      modelo:['modelo1']
    })

  }

  criarPensamento(){
    console.log(this.formulario.status);
    console.log(this.formulario.get('autoria')?.errors);
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe();
      this.router.navigate(['/listarPensamento']);
    }
  }

  cancelar(){
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string{
    if(this.formulario.valid){
      return 'botao';
    }
    return 'botao__desabilitado';
  }

}
