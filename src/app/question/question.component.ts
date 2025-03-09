import { Component, Input, input } from '@angular/core';
import { Question } from '../shared/models/question.model';

@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})

export class QuestionComponent {
  @Input({required: true}) question!: Question;
}
