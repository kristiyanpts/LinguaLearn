import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/userModel';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  user: User | undefined;
  isDataLoading: boolean = false;
  courseTitle: string = 'Loading...';

  ngOnInit(): void {
    this.isDataLoading = true;
    let userId = this.route.snapshot.params['userId'];
    this.userService.getById(userId).subscribe({
      next: (user: User) => {
        this.isDataLoading = false;
        this.user = user;
        this.courseTitle = `${user.username}'s Courses`;
      },
      error: () => {
        this.isDataLoading = false;
        this.router.navigate(['/not-found']);
      },
    });
  }
}
