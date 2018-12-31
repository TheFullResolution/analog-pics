import { Component, OnInit } from '@angular/core'
import { DatabaseService } from 'src/app/cms/services/database.service'
import { Observable } from 'rxjs'
import { DataBaseEntry } from '_types_'
import { Store } from '@ngrx/store'
import * as fromCms from '../../../state/cms.reducer'

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  unpublished$: Observable<DataBaseEntry[]>

  constructor(
    private databaseService: DatabaseService,
    private store: Store<fromCms.State>,
  ) {}

  ngOnInit() {
    this.unpublished$ = this.store.select(fromCms.getUnpublished)
  }
}
