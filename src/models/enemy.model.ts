import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class EnemyModel {
    constructor(
        public name: string = null,
        public db_1: number = 0,
        public db: number = 0,
        public armor_class: number = 1
    ){
    }
}