import { Component, EventEmitter, Input, input, output, Output } from '@angular/core';
import { Question } from '../shared/models/question.model';
import { Answer } from '../shared/models/answer.model';

@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})

export class QuestionComponent {
  error: string = '';
  @Input({ required: true }) question!: Question;
  addAnswer = output<Answer>();

  answer: Answer = {}

  checkboxIsChecked(answer: "A" | "N" | "D") {
    return this.answer[this.question.id] === answer;
  }

  updateAnswer(answer: "A" | "N" | "D") {
    if (this.answer[this.question.id] === answer) {
      delete this.answer[this.question.id];
    } else {
      this.answer[this.question.id] = answer;
    }
    console.log(this.answer);
  }


  submitAnswer() {
    if (!this.answer[this.question.id]) {
      this.error = "Please select an answer before submitting.";
      return;
    }

    this.addAnswer.emit(this.answer);
  }

  errorMessage: string = '';

  validateAndSubmit() {
    if (!this.checkboxIsChecked('A') && !this.checkboxIsChecked('N') && !this.checkboxIsChecked('D')) {
      this.errorMessage = 'Please select an answer before proceeding.';
    } else {
      this.errorMessage = '';
      this.submitAnswer();
    }
  }

  clearError() {
    this.errorMessage = '';
  }
}
