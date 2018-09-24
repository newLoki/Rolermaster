import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnemyService } from '../../services/enemy.service';
import { AttackPage } from '../attack/attack';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public enemyService: EnemyService) {
  }

  onAttack() {
    this.navCtrl.push(AttackPage);
    console.log('Attack');
  }
}
