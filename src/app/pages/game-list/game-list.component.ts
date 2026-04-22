import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Game, GameService } from '../../services/game.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { JwtDecodeService } from '../../services/jwt-decode.service';

@Component({
  selector: 'app-game-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
})
export class GameListComponent implements OnInit {
  games: Game[] | null = null;

  constructor(
    private gameService: GameService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private jwt: JwtDecodeService,
  ) {}

  ngOnInit() {
    if (this.jwt.validateToken(<string>localStorage.getItem('authToken'))) {
      this.loadGames();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadGames() {
    this.gameService.getGames().subscribe((g) => {
      this.games = g;
      this.cd.detectChanges();
    });
  }

  createGame() {
    this.gameService.createGame().subscribe((id) => {
      this.router.navigate(['/game', id]);
    });
  }
}
