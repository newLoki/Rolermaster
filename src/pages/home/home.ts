import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnemyService } from '../../services/enemy.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public enemyService: EnemyService) {
  }

}
