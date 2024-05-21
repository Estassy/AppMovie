import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any = null;
  dataService: DataService = inject(DataService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    console.log(this.movie)
  }

  ngOnInit(): void {
    console.log(this.movie)
    /*
    this.activatedRoute.params.subscribe((params) => {
      console.log("Paramètres reçus:", params);
      this.dataService.getMovieById(params['id']).subscribe((data) => {
        this.movie = data;
        console.log("Données du film:", this.movie);

      });
    });
    */
    this.activatedRoute.params.pipe(
      switchMap(params => {
        return this.dataService.getMovieById(params['id']);
      })
    ).subscribe(data => {
      this.movie = data;
      console.log(this.movie)
  });
    console.log(this.movie)
  }

}
