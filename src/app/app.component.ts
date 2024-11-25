import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'jkl-healthcare-service-frontend';
  router = 'layout';
  loadingRouteConfig: any;

  constructor(
    // private previous_route: PreviousRouteService,
    private routerModule: Router
  ) {}

  ngOnInit() {
    // this.routerModule.events.subscribe((event) => {
    //   if (event instanceof RouteConfigLoadStart) {
    //     this.loadingRouteConfig = true;
    //   } else if (event instanceof RouteConfigLoadEnd) {
    //     this.loadingRouteConfig = false;
    //   } else if (event instanceof NavigationError) {
    //     console.log('error loading in component', { event });
    //   }
    // });
  }

  // onActivate(componentRef: any) {
  //   if (componentRef.title !== 'login') {
  //     const elems = document.querySelectorAll('.selectside');
  //     [].forEach.call(elems, function (el) {
  //       el.classList.remove('selectside');
  //     });

  //     if (componentRef.title !== undefined) {
  //       this.title = componentRef.title;
  //       const elem = document.getElementById(this.title);
  //       elem.classList.add('selectside');
  //     }

  //     // return true
  //   } else {
  //     this.router = 'login';
  //     // return false
  //   }
  // }

  // routing(componentRef) {
  //   if (componentRef.title !== 'login') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
