import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StudentListComponent } from '../student-list/student-list.component';
import { StudentDetailComponent } from '../student-detail/student-detail.component';
import {
  Student,
  StudentsService,
} from '../../../../lib-core/src/public-api';

@Component({
  selector: 'lib-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
  standalone: true,
  imports: [
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    StudentListComponent,
    StudentDetailComponent,
  ],
})
export class StudentDashboardComponent implements OnInit {
  selectedStudent!: Student;

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    this.selectedStudent = this.studentService.newStudent();
  }

  getStudents(): Student[] {
    return this.studentService.getStudents();
  }

  selectStudent(student: Student): void {
    this.selectedStudent = student;
  }

  newStudent(): void {
    this.selectedStudent = this.studentService.newStudent();
  }

  deleteStudent(student: Student): void {
    this.studentService.deleteStudent(student);
    if (this.selectedStudent.id === student.id) this.newStudent();
  }

  saveStudent(student: Student): void {
    this.selectedStudent = this.studentService.saveStudent(student);
  }
}
