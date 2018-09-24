import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { EnemyService } from '../../services/enemy.service';
import { WeaponService } from '../../services/weapon.service';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
    selector: 'page-attack',
    templateUrl: 'attack.html'
})
export class AttackPage {
    attackForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public weaponService: WeaponService,
        public enemyService: EnemyService,
        private formBuilder: FormBuilder
    ) {
        //@todo get the enemy if pre filled
        this.attackForm = this.formBuilder.group({
            enemy_db_1: 0,
            enemy_db: 0,
            enemy_armor_class: 1,
            weapon: [''],
            modifier: 0,
            first_round: false,
            dice_roll: [''],
        });
    }

    onSubmit() {
        let enemy_db = +this.attackForm.value['enemy_db'];
        let modifier = +this.attackForm.value['modifier'];
        let dice_roll = +this.attackForm.value['dice_roll'];

        if (this.attackForm.value['first_round']) {
            enemy_db = this.attackForm.value['enemy_db_1']
        }

        let enemy_armor_class = 1;
        let value =  modifier + dice_roll + enemy_db;
        let result = this.weaponService.getResult(this.attackForm.value['weapon'], value, enemy_armor_class);

        let profileModal = this.modalCtrl.create(AttackResult, { result: result });
        profileModal.present();
    }

}

@Component({
    template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Result
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      <ion-item>
          <h1>{{result}}</h1>
      </ion-item>
  </ion-list>
</ion-content>
`
})
export class AttackResult {
    result;
    constructor(public viewCtrl: ViewController, public params: NavParams) {
        this.result = params.get('result');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
