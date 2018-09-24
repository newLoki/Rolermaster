import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { EnemyPage } from '../pages/enemy/enemy';
import { HomePage } from '../pages/home/home';
import { AttackPage, AttackResult } from '../pages/attack/attack';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EnemyService } from '../services/enemy.service';
import { WeaponService } from '../services/weapon.service';

@NgModule({
  declarations: [
    MyApp,
    EnemyPage,
    HomePage,
    AttackPage,
    AttackResult,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EnemyPage,
    AttackPage,
    AttackResult,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EnemyService,
    WeaponService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
