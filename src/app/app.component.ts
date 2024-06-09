import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = false;
  title = 'bbva-frontend';

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.loading = false;
  //   }, 1000);
  // }
}
