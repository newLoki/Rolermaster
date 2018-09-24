import { Component } from '@angular/core';
import { EnemyPage } from '../enemy/enemy';
import { HomePage } from '../home/home';
import { AttackPage } from '../attack/attack';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EnemyPage;
  tab3Root = AttackPage;

  constructor() {

  }
}
