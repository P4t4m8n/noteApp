import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeader {


  isSlideIn = false
  
  toggleSlideIn = () => {
    this.isSlideIn = !this.isSlideIn
  }
}
