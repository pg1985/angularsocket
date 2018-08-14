import { Component } from '@angular/core';
import { DiceService } from './dice-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-strayos';
  dieRoll = '';

  constructor(private diceGame: DiceService){ }

  ngOnInit() {
    this.diceGame.messages.subscribe(msg => {
      this.dieRoll = msg;
    })
  }

  rollSingleDie() {
    this.diceGame.rollSingleDie("Test Message");
  }
}
