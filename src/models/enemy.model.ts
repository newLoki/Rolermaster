import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class EnemyModel {
    name: string;
    db_1: number;
    db: number;
    armor_class: number;

    constructor(
        public name: string = null,
        public db_1: number = 0,
        public db: number = 0,
        public armor_class: number = 1
    ){
        this.name = name;
        this.db_1 = db_1;
        this.db = db;
        this.armor_class = armor_class;
    }
}