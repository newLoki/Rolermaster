import { Injectable } from '@angular/core';
import { Weapon } from '../weapons/weapon';
import { composit_bow_table } from '../weapons/composit_bow';
import { stitch_table } from '../crits/stitch'

@Injectable()
export class WeaponService {
    weapons = [];
    names = [];

    constructor(){
        this._addWeapon(new Weapon(composit_bow_table, 'Composit Bow', stitch_table));
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
        let data = selected_weapon.getResult(value, armor_class);
        data['weapon'] = selected_weapon;

        return data;
    }
}
