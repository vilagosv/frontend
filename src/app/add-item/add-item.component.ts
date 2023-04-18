import { isNgTemplate } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from '../utils/connection.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent {
  name = '';
  value = '';
  description = '';

  constructor(
    private connectionService: ConnectionService,
    private router: ActivatedRoute
  ) {}

  addItem() {
    let item = {
      name: this.name,
      value: this.value,
      description: this.description,
    };
    this.connectionService.addItem(item).subscribe(
      (resp) => console.log('resp:', resp),
      (err) => alert('item already exists'),
      () => alert('item added')
    );
  }
}
