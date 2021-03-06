import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public navbarOpen:boolean = false;
  public renderLinks: any[] = [];

  constructor(private _router:Router, private _authservice: AuthService) { 
    this._authservice.accessibleLinks.subscribe(l => {
      this.renderLinks = l;
    })
  }

  ngOnInit(): void {
    
  }

  public logout(): void{
    this._authservice.logOut();
  }

  public toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  public onNavLinkClick(link: any){
    this._router.navigateByUrl(link.route);
  };

}
