import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { QuestionComponent } from "./question/question.component";
import { Question } from './shared/models/question.model';
import { Answer } from './shared/models/answer.model';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, QuestionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'codebara-mbti-test';
  isStarted = false;
  isFinished = false;
  questions: Question[] = [
    { id: 1, text: "You enjoy social gatherings and feel energized after meeting new people.", dimension: "E/I", positive: "E" },
    { id: 2, text: "You prefer making detailed plans rather than being spontaneous.", dimension: "J/P", positive: "J" },
    { id: 3, text: "You often rely on logic rather than emotions when making decisions.", dimension: "T/F", positive: "T" },
    { id: 4, text: "You enjoy deep and meaningful conversations more than casual small talk.", dimension: "S/N", positive: "N" },
    { id: 5, text: "You feel drained after long social interactions, even if you enjoyed them.", dimension: "E/I", positive: "I" },
    { id: 6, text: "You are more interested in theories and abstract ideas than real-world applications.", dimension: "S/N", positive: "N" },
    { id: 7, text: "You trust facts and experiences more than gut feelings or intuition.", dimension: "S/N", positive: "S" },
    { id: 8, text: "You tend to make decisions based on your emotions and personal values.", dimension: "T/F", positive: "F" },
    { id: 9, text: "You prefer a structured and organized environment over flexibility and freedom.", dimension: "J/P", positive: "J" },
    { id: 10, text: "You often find yourself lost in thought, imagining different possibilities.", dimension: "S/N", positive: "N" },
    { id: 11, text: "You enjoy trying new experiences rather than sticking to what you know.", dimension: "S/N", positive: "N" },
    { id: 12, text: "You prefer to keep your options open rather than sticking to a fixed plan.", dimension: "J/P", positive: "P" },
    { id: 13, text: "You are comfortable with last-minute changes and unexpected situations.", dimension: "J/P", positive: "P" },
    { id: 14, text: "You consider yourself more practical than creative.", dimension: "S/N", positive: "S" },
    { id: 15, text: "You tend to focus on the present rather than worrying about the future.", dimension: "S/N", positive: "S" },
    { id: 16, text: "You are more interested in helping others than achieving personal success.", dimension: "T/F", positive: "F" },
    { id: 17, text: "You feel uncomfortable in leadership positions.", dimension: "E/I", positive: "I" },
    { id: 18, text: "You value tradition and rules more than innovation and change.", dimension: "S/N", positive: "S" },
    { id: 19, text: "You feel more comfortable expressing yourself through writing than speaking.", dimension: "E/I", positive: "I" },
    { id: 20, text: "You prefer working alone rather than in a team.", dimension: "E/I", positive: "I" }
  ];
  answers: Answer[] = [];

  startTest() {
    this.isStarted = true;
  }
  addAnswer(answer: Answer) {
    this.answers.push(answer);
    if (this.answers.length === this.questions.length) {
      this.isFinished = true;
    }
  }
}


