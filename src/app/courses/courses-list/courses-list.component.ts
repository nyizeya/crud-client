import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courseName?: string;

  ngOnInit(): void {
    
  }

  onSearch() {
    console.log("Course Name: ", this.courseName);
    this.courseName = '';
  }

}
