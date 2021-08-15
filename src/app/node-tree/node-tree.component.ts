import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NodesTreePresentationInterface} from '../_models/node-tree.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tree-node',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeTreeComponent implements OnInit, AfterViewInit {
  @Input() model: NodesTreePresentationInterface;

  constructor() {
  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
  }


}
