import React, { Component } from 'react'; // מייבא את המודולים הדרושים מהספריות של ריאקט
import Student from './Student';
import './Style/Student.css';


export default class StudentSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // state הפרמטרים לבנאי של רכיב האב והגדרת המשתנה המצביע
      students: [],
      newStudentName: '',
      newStudentGrade: '',
      idCounter: 1
    };
  }

  addStudent = () => {
      // שימוש בפרמטרים המצויינים ב-state
    const { newStudentName, newStudentGrade, idCounter } = this.state;
      // בדיקת תקינות קלט: האם שם התלמיד החדש והציון החדש אינם ריקים
    if (newStudentName.trim() !== '' && newStudentGrade.trim() !== '') {
      const newStudent = { // יצירת אובייקט שמייצג את התלמיד החדש
        id: idCounter,
        name: newStudentName,
        grade: newStudentGrade,
        isEditing: false 
      };
      // state-עדכון של ערך ה 
      // setState באמצעות 
      this.setState((prevState) => ({
        students: [...prevState.students, newStudent],
        newStudentName: '', // איפוס ערך שם התלמיד החדש לריק
        newStudentGrade: '', // איפוס ערך הציון החדש לריק
        idCounter: prevState.idCounter + 1
        // prevState - שימושי כאשר נרצה לבצע עדכונים דינמיים שמתבצים בהתאם למצה הקודם של הסטייט
      }));
    }
  };

  // מחיקת סטונדט מהמערכת
  deleteStudent = (id) => { 
    this.setState((prevState) => ({
      // עדכון של מערך הסטודנטים שימוש בפונקציית הפילטר
      // כדי ליצור מערך חדש שמכיל את כל הסטודנטים חוץ מהסטודנט שנבחר למחיקה
      students: prevState.students.filter((student) => student.id !== id)
    }));
  };


  editStudent = (id, newName, newGrade) => {
    this.setState((prevState) => ({
      students: prevState.students.map((student) =>
        student.id === id ? { ...student, name: newName, grade: newGrade, isEditing: false } : student
      )
    }));
  };

  // handleInputChange = (name, value) => {
  //   this.setState({ [name]: value });
  // };



  render() {
      //state -חילוץ ההנתונים הדרושים מה
    const { students, newStudentName, newStudentGrade } = this.state;
    return (
      <div>
        <h1>Students list</h1>
        <p>Total Students: {students.length}</p>
        <input
          type="text"
          value={newStudentName}
          onChange={(e) => this.setState({ newStudentName: e.target.value })}
          placeholder="Enter student name"
        />
        <input
          type="number"
          step="0.1"
          value={newStudentGrade}
          onChange={(e) => this.setState({ newStudentGrade: e.target.value })}
          placeholder="Enter student grade"
        />
        <button onClick={this.addStudent}>Add Student</button>
        <div className="students-list-container">
          {/* תנאי: אם יש תלמידים ברשימה, תציג אותם */}
          {students.length > 0 ? 
            students.map((student) => (
              // map - הצגת רשימת הסטודנטים ברכיב הריאקט
              // באמצעות המאפ אנחנו יכולים לעבור על כל תלמיד במערך וליצור רכיב סטודנט עבור כל תלמיד
              <Student
                key={student.id} // כדי לזהות באופן יעיל אילו אלמנטים עליהם יש להתעדכן במקרה שיהיו שינויים ברשימת הסטודנטים
                id={student.id}
                name={student.name}
                grade={student.grade}
                onDelete={this.deleteStudent} // Student - פונקציה המועברת מרכיב האב (עמוד זה) לרכיב הילד
                onEdit={this.editStudent}
                isEditing={student.isEditing}  // ערך בוליאני 
                editedName={student.name} // שם התלמיד המעודכן במצה העריכה בלבד
                editedGrade={student.grade}
                onChange={this.handleInputChange}
              />
              /* אחרת, תציג הודעה כאשר אין תלמידים ברשימה */
            )) : <p>There are no students in the list <br />😭</p>} 
        </div>
      </div>
    );
  }
}
