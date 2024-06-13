import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  const unusedV: string = "I am not used";

  // Error: Type 'any' should not be used.
  const shouldBeStrn: any = "This should be a string";

    add(a: number, b: number){
      return a + b;
    }
}
