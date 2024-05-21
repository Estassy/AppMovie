import { Component, Input, inject } from '@angular/core';
import { DataService } from '../data.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  movies: any[] = []
  moviesDes: any


  @Input() id: string = ''
  @Input() title: string = 'All'


  movieService: DataService = inject(DataService)
  movieDesService: DataService = inject(DataService)
  router: Router = inject(Router)

  ngOnInit(): void {

    this.movieService.getMovies(this.title).subscribe(
      (data) => {
        this.movies = data.Search
        //console.log(this.movies)
      }
    )

  }
  
  onDescription(imdbID : string): void{
    console.log("Navigating with ID:", imdbID);
    this.router.navigate(['/movie', imdbID]);
  }
  
  
  // onDescription(imdbID: string): void {
  //   this.movieDesService.getMovieById(imdbID).subscribe(
  //     (data: any) => {
  //       this.moviesDes = data
  //       console.log(this.moviesDes)
  //     }
  //   )
  // }

}
