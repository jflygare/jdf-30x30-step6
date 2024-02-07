import { Injectable } from '@angular/core';
import { Course, Student } from '../../public-api';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students: Student[] = [
    {
      id: 0,
      firstName: "Joe",
      lastName: "Smith",
      isActive: true,
      courses: [
        Course.MachineLearning
      ]
    },
    {
      id: 1,
      firstName: "Jane",
      lastName: "Doe",
      isActive: false,
      courses: [
        Course.IntroToHtml,
        Course.FunctionalJavaScript
      ]
    }
  ];

  constructor() { }

  getStudents(): Student[] {
    return this.students;
  }

  newStudent(): Student {
    return this.getStudentById(-1);
  }

  deleteStudent(student: Student): void {
    this.students.splice(this.students.findIndex((s) => student.id === s.id), 1);
  }

  saveStudent(student: Student): Student {
    const isNew = student.id === -1;
    if (isNew)
      student.id = this.getNextId();
    else
      // remove and re-add, as instances may not be equal
      this.deleteStudent(student);

    this.students.push(student);
    return student;
  }

  private getNextId(): number {
    if (this.students.length === 0) {
      return 0;
    }
    return this.students.map(s => s.id).reduce((prev, current) => (prev > current) ? prev : current) + 1;
  }

  getStudentById(id: number): Student {
    if (id == -1) {
      return {
        id: id,
        firstName: null!,
        lastName: null!,
        isActive: false,
        courses: []
      }
    }
    return this.students.find((s) => s.id === id)!
  }
}
