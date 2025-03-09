import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { QuestionComponent } from "./question/question.component";
import { Question } from './shared/models/question.model';
import { Answer } from './shared/models/answer.model';
import { ResultComponent } from "./result/result.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, QuestionComponent, ResultComponent],
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
  mbtiDescriptions: Record<string, string> = {
    "ENTJ": "ENTJs are analytical problem-solvers, eager to improve systems and processes with their innovative ideas. They have a talent for seeing possibilities for improvement, whether at work, at home, or in themselves.",
    "ENTP": "ENTPs are energetic and curious, always looking for new challenges and opportunities. They thrive on debate, enjoy intellectual discussions, and are excellent at thinking on their feet.",
    "ENFJ": "ENFJs are charismatic and inspiring leaders, motivated by their deep care for others. They excel in bringing people together and guiding them toward a shared vision.",
    "ENFP": "ENFPs are enthusiastic, creative, and free-spirited. They are deeply passionate about their beliefs and have an infectious energy that inspires those around them.",
    
    "ESTJ": "ESTJs are strong-willed, organized, and dependable. They thrive in leadership roles and believe in structure, efficiency, and upholding traditions.",
    "ESTP": "ESTPs are bold, energetic, and action-oriented. They love taking risks, enjoy excitement, and prefer to learn by doing rather than theorizing.",
    "ESFJ": "ESFJs are warm, outgoing, and deeply loyal. They value relationships and traditions and are happiest when they can help and support others.",
    "ESFP": "ESFPs are lively, spontaneous, and love to entertain. They are highly social and thrive in environments where they can express themselves and enjoy the moment.",
    
    "INTJ": "INTJs are strategic thinkers, known for their independence and ability to turn visions into reality. They are highly focused and excel at long-term planning.",
    "INTP": "INTPs are logical and curious, always seeking to understand complex systems and concepts. They are deep thinkers who thrive on knowledge and discovery.",
    "INFJ": "INFJs are insightful, compassionate, and driven by a strong sense of purpose. They seek to create meaningful change in the world through their ideas and actions.",
    "INFP": "INFPs are deeply introspective, idealistic, and value authenticity. They are passionate about personal growth and helping others reach their potential.",
    
    "ISTJ": "ISTJs are responsible, practical, and highly detail-oriented. They believe in tradition, structure, and following through on commitments.",
    "ISTP": "ISTPs are hands-on problem solvers, known for their practicality and adaptability. They enjoy experimenting with how things work and are naturally resourceful.",
    "ISFJ": "ISFJs are nurturing, loyal, and dedicated to supporting those around them. They value harmony and work hard to maintain stability in their relationships.",
    "ISFP": "ISFPs are gentle, creative, and deeply attuned to their surroundings. They appreciate beauty, enjoy self-expression, and prefer a flexible lifestyle."
  };
  currentQuestion = 0;
  answers: Answer[] = [];

  result: string = "";

  startTest() {
    this.isStarted = true;
  }

  addAnswer(answer: Answer) {
    this.answers.push(answer);
    if (this.currentQuestion === this.questions.length - 1) {
      this.result = this.getResult(answer);
      this.isFinished = true;
      return;
    }
    this.currentQuestion += 1;
  }

  getResult(submitData: Answer): string {
    interface MBTIScores {
      E: number;
      I: number;
      S: number;
      N: number;
      T: number;
      F: number;
      J: number;
      P: number;
    }

    let scores: MBTIScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    const getOppositeType = (type: keyof MBTIScores): keyof MBTIScores => {
      const opposites: Record<keyof MBTIScores, keyof MBTIScores> = {
        E: "I", I: "E",
        S: "N", N: "S",
        T: "F", F: "T",
        J: "P", P: "J"
      };
      return opposites[type];
    };

    for (const question of this.questions) {
      const answer = submitData[question.id];
      if (answer === "A") {
        scores[question.positive]++;
      } else if (answer === "D") {
        scores[getOppositeType(question.positive)]++;
      }
    }

    const mbtiType =
      (scores.E >= scores.I ? "E" : "I") +
      (scores.S >= scores.N ? "S" : "N") +
      (scores.T >= scores.F ? "T" : "F") +
      (scores.J >= scores.P ? "J" : "P");

    return mbtiType;
  }

}


