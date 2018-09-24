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
        private formBuilder: FormBuilder,
        private navParams: NavParams
    ) {
        let enemy_db_1 = 0;
        let enemy_db = 0;
        let enemy_armor_class = 1;
        let enemy = navParams.get('enemy');
debugger;
        if (enemy !== undefined) {
            enemy_db = enemy['db'];
            enemy_db_1 = enemy['db_1'];
            enemy_armor_class = enemy['armor_class'];
        }

        //@todo get the enemy if pre filled
        this.attackForm = this.formBuilder.group({
            enemy_db_1: enemy_db_1,
            enemy_db: enemy_db,
            enemy_armor_class: enemy_armor_class,
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
          <h1>
            {{result.hit}} <b>{{result.crit_class}}</b>
            <button *ngIf="result.crit_class != ''" (click)="rollCrit()"><ion-icon name="cube"></ion-icon> Roll Dice</button>
          </h1>
      </ion-item>
      <ion-item>{{crit_text}}</ion-item>
  </ion-list>
</ion-content>
`
})
export class AttackResult {
    result;
    crit_text;
    critForm: FormGroup;

    constructor(public viewCtrl: ViewController, public params: NavParams, private formBuilder: FormBuilder) {
        this.result = params.get('result');
        this.critForm = this.formBuilder.group({
            crit_roll: 1
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    rollCrit() {
        this.critForm.value['crit_roll'] = this.getRandomInt(1, 100);
        this.calculateCrit();
    }

    calculateCrit() {
        let value = +this.critForm.value['crit_roll'];
        let weapon = this.result['weapon'];
        this.crit_text = weapon.getCritText(this.result['crit_class'], value);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
