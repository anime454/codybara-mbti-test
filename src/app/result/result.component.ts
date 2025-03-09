import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  @Input() mbtiType: string = "ENTJ"; // Default value
  @Input() description: string = "are analytical problem-solvers, eager to improve systems and processes with their innovative ideas. They have a talent for seeing possibilities for improvement, whether at work, at home, or in themselves.";
  @Input() imageUrl: string = "assets/images/entj.png"; // Replace with actual image URL

  shareResult(): void {
    const shareText = `I got ${this.mbtiType} in the MBTI Test!`;
    if (navigator.share) {
      navigator.share({
        title: "MBTI Test Result",
        text: shareText,
        url: window.location.href
      }).catch(err => console.log("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  }
}
