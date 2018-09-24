export class Weapon {
    constructor(public table = [], public name, public crit_table = []) {
    }

    getCrit(hit) {
        let regex = /[A-E]$/;
        let matches = regex.exec(hit);

        if (matches.length > 0) {
            return matches[0];
        }

        return '';
    }

    getHit(hit) {
        let regex = /^[0-9]{1,3}/;
        let matches = regex.exec(hit);

        if (matches.length > 0) {
            return matches[0];
        }

        return '';
    }

    getCritText(crit_class, dice_roll) {
        for (let i = 0; i < this.crit_table.length; i++) {
            let crit_data = this.crit_table[i];

            if (dice_roll >= crit_data['min'] && dice_roll <= crit_data['max']) {
                return crit_data['min'] + ' - ' + crit_data['max'] + '\n' + crit_data[crit_class]['text'];
            }

        }

        return '';
    }

    getResult(value, armor_class) {
        let int_value = +value;

        if (int_value > 150) {
            int_value = 150;
        }

        for (let i = 0; i < this.table.length; i++) {
            let data = this.table[i];
            if (int_value >= data['min'] && int_value <= data['max']) {
                let hit = this.getHit(data[armor_class]);
                let crit = this.getCrit(data[armor_class]);

                return {
                    hit: hit,
                    crit_class: crit
                }
            }
        }

        return {
            hit: 0,
            crit_class: ''
        }
    }
}