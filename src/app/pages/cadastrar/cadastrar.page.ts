import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from '../../models/contato';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome: string;
  telefone: number;
  genero: string;
  dataNascimento: string;
  data: string;

  constructor(private alertController: AlertController,
    private router: Router, private contatoService: ContatoService) { }

  ngOnInit() {
    this.data = new Date().toISOString();
  }

  cadastrar(){
    this.dataNascimento = this.dataNascimento.split('T')[0];
    console.log(this.genero+" "+this.dataNascimento)
   if((this.validar(this.nome)) && this.validar(this.telefone)){
    let contato : Contato = new Contato(this.nome, this.telefone, this.genero, this.dataNascimento);
    this.contatoService.inserir(contato);
    this.presentAlert("Agenda", "Sucesso", "Cliente Cadastrado!");
    this.router.navigate(["/home"]);
  }else{
    this.presentAlert("Agenda", "Erro", "Todos os campos são Obrigatórios!");
   }
  }

  private validar(campo: any): boolean{
    if(!campo){
      return false;
    }
    return true;
  }

  async presentAlert(header: string, subHeader: string,
    message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
