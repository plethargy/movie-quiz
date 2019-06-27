import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCategory(category: number) {
    this.router.navigate(['/question', category], { skipLocationChange: true });
    
  }

  goBack() {
    localStorage.removeItem("username");
    if (localStorage.getItem('username')==null) {
      // go back to klogin screen
      this.router.navigate(['/login'], { skipLocationChange: true });

    }
  }
  
}
