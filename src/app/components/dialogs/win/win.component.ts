import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.sass']
})
export class WinComponent implements OnInit {
  player: string
  constructor(public dialogRef: MatDialogRef<WinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.player = this.data.username
  }

  ngOnInit(): void {}

}
