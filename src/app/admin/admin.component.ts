import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from '../utils/connection.service';
import { User } from '../utils/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(
    private connectionService: ConnectionService,
    private route: Router
  ) {}

  data: User[] = [];

  getData() {
    this.connectionService.getUsers().subscribe((resp) => {
      console.log(resp);
      this.data = resp;
      this.isAdmin(localStorage.getItem('user') || '');
    });
  }

  isAdmin(username: String) {
    let user = this.data.filter((el) => {
      return el.username == username;
    })[0];

    if (!user || user.accessLevel !== 'admin') {
      alert('Only admins can open the page');
      this.route.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.getData();
  }

  setUserAdmin(username: String) {
    this.connectionService.setUserAdmin(username).subscribe((resp) => {
      console.log(resp);
      this.getData();
    });
  }

  deleteUser(username: String) {
    this.connectionService.deleteUser(username).subscribe((resp) => {
      console.log(resp);
      this.getData();
    });
  }
}
