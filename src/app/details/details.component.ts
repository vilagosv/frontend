import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectionService } from '../utils/connection.service';
import { Item } from '../utils/item';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  name: String = '';
  data: Item[] = [];

  constructor(
    private connectionService: ConnectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getItem(name: String) {
    this.connectionService.getItems().subscribe((resp) => {
      console.log('resp:', resp);
      this.data = resp;
      this.data = this.data.filter((el) => {
        return el.name == this.name;
      });
      console.log('filtered: ', this.data);
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.name = params.get('id') || '';
    });
    this.getItem(this.name);
  }

  deleteItem(name: String) {
    this.connectionService.deleteItem(name).subscribe((resp) => {
      console.log(resp);
      this.router.navigate(['/home']);
    });
  }
}
