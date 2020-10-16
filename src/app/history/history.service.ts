import { Injectable } from '@angular/core';
import {Graph} from '../graph/graph.model'


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private graphs : Graph[] = [{
    id:"graph1",
    title :"graph1",
    imageUrl:"http://math.jacobs-university.de/oliver/teaching/iub/resources/octave/octave-intro/img1.png"
  }];
  constructor() { }
  getGraphs(){
    return [...this.graphs];
  }
  getGraph(graphId:string){
    return {...this.graphs.find(graph=>{
      return graph.id === graphId;
    })
  };
  }
  
}
