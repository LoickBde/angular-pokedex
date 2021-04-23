import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'pkmn-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(private authSerive: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authSerive.logout();
    this.router.navigate(['']);
  }
}
