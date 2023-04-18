import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../utils/connection.service';
import { Item } from '../utils/item';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private connectionService: ConnectionService,
    private router: Router
  ) {}

  data: Item[] = [];

  getData() {
    this.connectionService.getItems().subscribe((resp) => {
      console.log(resp);
      this.data = resp;
    });
  }

  ngOnInit() {
    this.getData();
  }

  viewItem(name: String) {
    this.router.navigate(['/details/' + name]);
  }

  deleteItem(name: String) {
    this.connectionService.deleteItem(name).subscribe((resp) => {
      console.log(resp);
      this.getData();
    });
  }
}
