import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ContatoFirebaseService } from 'src/app/services/contato-firebase.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  data: string;
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;
  imagem: any;

  constructor(private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private contatoFS: ContatoFirebaseService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data = new Date().toISOString();
    this.form_cadastrar = this.formBuilder.group({
      nome: ["", [Validators.required]],
      telefone: ["", [Validators.required, Validators.minLength(10)]],
      genero: ["", [Validators.required]],
      data_nascimento: ["", [Validators.required]],
      imagem: ["", [Validators.required]]
    });
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  get errorControl(){
    return this.form_cadastrar.controls;
  }

  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      this.presentAlert("Agenda", "Erro",
       "Todos os campos são Obrigatórios!");
      return false;
    }else{
      this.cadastrar();
    }
  }

  private cadastrar(){
    this.showLoading("Aguarde", 10000);
    this.contatoFS
    .enviarImagem(this.imagem, this.form_cadastrar.value)
    .then(()=>{
      this.loadingCtrl.dismiss();
      this.presentAlert("Agenda", "Sucesso", "Cliente Cadastrado!");
      this.router.navigate(["/home"]);
    })
    .catch((error)=>{
      this.loadingCtrl.dismiss();
      this.presentAlert("Agenda", "Erro", "Erro ao cadastrar Contato!");
      console.log(error);
    })


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

  async showLoading(mensagem: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });
    loading.present();
  }


}
