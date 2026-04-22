import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCard, GameService } from '../../services/game.service';
import { CardComponent } from './card/card.component';
import { JwtDecodeService } from '../../services/jwt-decode.service';

@Component({
  selector: 'app-game',
  imports: [CardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  cards: GameCard[] = [];
  isFinished = false;
  gameId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private cd: ChangeDetectorRef,
    private jwt: JwtDecodeService,
  ) {}

  ngOnInit() {
    if (this.jwt.validateToken(<string>localStorage.getItem('authToken'))) {
      this.gameId = Number(this.route.snapshot.paramMap.get('id'));

      this.gameService.getGame(this.gameId).subscribe((game) => {
        this.cards = game.cards.filter((c) => c.location === 'Table');
        this.isFinished = game.isFinished;
        this.cd.detectChanges();
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  endGame() {
    this.gameService.endGame(this.gameId).subscribe();
  }

  getHint() {
    this.gameService.getHint(this.gameId).subscribe((hints) => {
      console.log(hints);
    });
  }

  deleteGame() {
    this.gameService.deleteGame(this.gameId).subscribe();
    this.router.navigate(['/']);
  }

  drawCard() {
    this.gameService.drawCard(this.gameId).subscribe((card) => {
      this.cards.push(card);
      this.cd.detectChanges();
    });
  }
}
