import { Injectable } from '@angular/core';
import { CompositBow } from '../weapons/composit_bow'

@Injectable()
export class WeaponService {
    weapons = [];
    names = [];

    constructor(){
        this._addWeapon(new CompositBow());
    }

    _addWeapon(weapon) {
        this.weapons.push(weapon);
        this.names.push(weapon.name);
    }

    _findWeapon(weapon_name) {
        for (let i = 0; i < this.weapons.length; i++) {
            let weapon = this.weapons[i];
            if (weapon.hasOwnProperty('name') && weapon['name'] == weapon_name) {
                return weapon;
            }
        }

        return null;
    }

    getResult(weapon_name, value, armor_class) {
        let selected_weapon = this._findWeapon(weapon_name);
        let value = +value;

        if (value > 150) {
            value = 150;
        }
            
        for (let i = 0; i < selected_weapon.table.length; i++) {
            let data = selected_weapon.table[i];
            if (value >= data['min'] && value <= data['max']) {
                return data[armor_class];
            }
        }

        return 0;
    }
}
