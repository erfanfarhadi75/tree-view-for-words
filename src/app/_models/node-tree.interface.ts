export interface NodesTreeProcessInterface {
  totalWordsQuantity: number;
  totalWords: [string, number][];
  uniqueWords: [string, number][];
  duplicatedWord: [string, number][];
}


export interface NodesTreePresentationInterface {
  nodeTitle: string | '##root##' | '##unique##';
  nodeQuantity: number;
  node: [string, number];
  child?: NodesTreePresentationInterface[];
}
