import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { Contato } from 'src/app/models/contato';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  contato: Contato;
  nome: string;
  telefone: number;
  genero: string;
  dataNascimento: string;
  data: string;

  constructor(private router: Router) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.contato = nav.extras.state.objeto;
    this.data = new Date().toISOString();
    this.nome = this.contato.nome;
    this.telefone = this.contato.telefone;
    this.genero = this.contato.genero;
    this.dataNascimento = this.contato.data_nascimento
  }

  editar(){}
  excluir(){}

}
