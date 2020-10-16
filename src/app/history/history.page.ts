import { Component, OnInit } from '@angular/core';
import { Graph } from '../graph/graph.model';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  graphs : Graph[];
  constructor(private historyServices : HistoryService) { }

  ngOnInit() {
    this.graphs = this.historyServices.getGraphs();
  }

}
