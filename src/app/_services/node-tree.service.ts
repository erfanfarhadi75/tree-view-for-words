import {Injectable} from '@angular/core';
import {NodesTreePresentationInterface, NodesTreeProcessInterface} from '../_models/node-tree.interface';

@Injectable({
  providedIn: 'root'
})
export class NodeTreeService {
  processModel = {} as NodesTreeProcessInterface;
  presentationModel = {child: []} as NodesTreePresentationInterface;

  constructor() {
  }

  // make a complete detailed (processModel) and (presentationModel)
  public generateModel(txt: string): NodesTreePresentationInterface {
    this.presentationModel = {node: ['', 0], nodeQuantity: 0, nodeTitle: null, child: []}; // reset
    this.processModel = {totalWordsQuantity: null, totalWords: null, duplicatedWord: null, uniqueWords: null}; //reset
    const wordsArray = txt.split((/\s+/)).filter(item => item !== '');
    const words = wordsArray;
    const count = (names: string[]) =>
      names.reduce((a, b) => ({
        ...a,
        [b]: (a[b] || 0) + 1
      }), {});
    const sortable = [];
    for (const vehicle in count(words)) {
      sortable.push([vehicle, count(words)[vehicle]]);
    }
    this.processModel.totalWords = sortable.sort((a, b) => {
      return a[1] - b[1];
    }).reverse(); // [["a",2],["this",1],["is",1],["test",1]]

    this.processModel.duplicatedWord = this.processModel.totalWords.filter(item => {
      return item[1] > 1;
    }); // [["a",2]]

    this.processModel.uniqueWords = this.processModel.totalWords.filter(item => {
      return item[1] === 1;
    }); //  [["this",1],["is",1],["test",1]]

    if (this.processModel.duplicatedWord.length > 0) {
      this.fillDuplicatedWordPresentationModel();
    }
    if (this.processModel.uniqueWords.length > 0) {
      this.fillUniqueWordsPresentationModel();
    }

    return this.presentationModel;
  }


  // give value to duplicated presentationModel based on processModel
  private fillDuplicatedWordPresentationModel(): void {
    this.presentationModel.nodeTitle = '##root##';
    this.presentationModel.nodeQuantity = this.processModel.totalWords.length + 1;
    this.presentationModel.node = ['##root##', this.processModel.totalWords.length];
    this.presentationModel.child = [];
    for (let i = 0; i < this.processModel.duplicatedWord.length; i++) {
      this.presentationModel.child.push(this.makeRecursiveNodeModel([...this.processModel.duplicatedWord[i]]));
    }
    this.presentationModel = {...this.presentationModel};
  }

  // give value to unique presentationModel based on processModel
  private fillUniqueWordsPresentationModel(): void {

    const uniqueWordsTemp = {child: []} as NodesTreePresentationInterface;
    for (let i = 0; i < this.processModel.uniqueWords.length / 2; i++) {
      uniqueWordsTemp.child.push(
        {
          child: [
            this.makeRecursiveNodeModel(this.processModel.uniqueWords[i]),
            this.makeRecursiveNodeModel(this.processModel.uniqueWords[i + 1])],
          nodeTitle: '2',
          node: this.processModel.uniqueWords[i],
          nodeQuantity: 2
        }
      );
    }
    if (this.processModel.uniqueWords.length % 2 !== 0) {
      uniqueWordsTemp.child.push(this.makeRecursiveNodeModel(this.processModel.uniqueWords[this.processModel.uniqueWords.length - 1]));
    }
    this.presentationModel.child.push({
      node: ['##unique##', this.processModel.uniqueWords.length],
      child: uniqueWordsTemp.child,
      nodeQuantity: this.processModel.uniqueWords.length,
      nodeTitle: '##unique##'
    });

    this.presentationModel = {...this.presentationModel};
  }

  // generate presentation model based on NodesTreePresentationInterface
  makeRecursiveNodeModel(item): NodesTreePresentationInterface { // item example  ['flex',3] or ['css',4]
    const model: NodesTreePresentationInterface = {
      node: item,
      nodeQuantity: item[1],
      nodeTitle: item[0],
      child: null
    };
    if (item[1] > 2) {
      if (!model.child) {
        model.child = [];
      }
      if (item[1] % 2 === 0) {
        for (let i = 0; i < (item[1] / 2); i++) {
          model.child.push(this.makeRecursiveNodeModel([item[0], 2]));
        }
      } else {
        for (let i = 0; i < (item[1] / 2) - 1; i++) {
          model.child.push(this.makeRecursiveNodeModel([item[0], 2]));
        }
        model.child.push(this.makeRecursiveNodeModel([item[0], 1]));
      }

    } else {
      model.child = null;
    }
    return model;
  }

}
