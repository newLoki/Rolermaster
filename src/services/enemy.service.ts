import { Injectable } from '@angular/core';
import { EnemyModel } from '../models/enemy.model'

@Injectable()
export class EnemyService {
    enemies = [];

    constructor(){}

    deleteEnemy(enemy){
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].name === enemy.name) {
                delete this.enemies[i];
                return;
            }
        }
    }

    find(name) {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].name === name) {
                return this.enemies[i];
            }
        }

        return null;
    }

    createEnemy(values){
        let data = new EnemyModel();
        data.name = values.name;
        data.db = values.db;
        data.db_1 = values.db_1;
        data.armor_class = values.armor_class;

        this.enemies.push(data);

        return data;
    }

}
