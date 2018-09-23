import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder} from '@angular/forms';
import { EnemyModel} from '../../models/enemy.model';
import { EnemyService } from '../../services/enemy.service'
import { HomePage } from '../home/home'

@Component({
    selector: 'page-enemy',
    templateUrl: 'enemy.html'
})
export class EnemyPage {
    enemy: EnemyModel = null;
    enemyForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public enemyService: EnemyService,
        private formBuilder: FormBuilder
    ) {
        this.enemyForm = this.formBuilder.group({
            name: [''],
            db_1: [''],
            db: [''],
            armor_class: [''],
        });
    }

    onSubmit() {
        //@todo validate before save
        this.enemyService.createEnemy(this.enemyForm.value);
        this.navCtrl.parent.select(0);
    }
}
