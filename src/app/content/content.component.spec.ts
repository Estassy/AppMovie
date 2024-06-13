// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ContentComponent } from './content.component';
// import { HookComponent } from '../hook/hook.component';
// import { MoviesComponent } from '../movies/movies.component';
// import { DataService } from '../data.service';


// describe('ContentComponent', () => {
//   let component: ContentComponent;
//   let fixture: ComponentFixture<ContentComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ContentComponent, HookComponent, MoviesComponent]
//     });
//     fixture = TestBed.createComponent(ContentComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

// });

import { ContentComponent } from "./content.component";

describe('ContentComponent', () => {
    let component: ContentComponent;

    beforeEach(() => {
      component = new ContentComponent()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })
  
})