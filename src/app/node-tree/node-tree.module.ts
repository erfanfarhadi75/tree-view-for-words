import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeTreeComponent } from './node-tree.component';



@NgModule({
  declarations: [NodeTreeComponent],
  exports: [
    NodeTreeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NodeTreeModule { }
