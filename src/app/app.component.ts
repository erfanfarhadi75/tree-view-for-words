import {ChangeDetectorRef, Component} from '@angular/core';
import {NodesTreePresentationInterface, NodesTreeProcessInterface} from './_models/node-tree.interface';
import {NodeTreeService} from './_services/node-tree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public fileText: string;
  public model!: NodesTreePresentationInterface;

  constructor(private nodeTreeService: NodeTreeService) {
  }

  // convert file to string on change file
  public onChangeFileInput(event): void {
    const fr = new FileReader();
    fr.readAsText(event.target.files[0]);
    fr.onload = () => {
      this.fileText = fr.result.toString();
      this.model = this.nodeTreeService.generateModel(this.fileText);
    };
  }

  // call generateModel() on change text box
  public onChangeTextarea(event): void {

    this.fileText = event;
    this.model = this.nodeTreeService.generateModel(this.fileText);
  }


}
