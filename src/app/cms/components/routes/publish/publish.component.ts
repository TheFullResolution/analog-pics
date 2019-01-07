import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { DataBaseEntry } from '_types_'
import { Store } from '@ngrx/store'
// @ts-ignore
import * as fromCms from '../../../state/cms.reducer'
import { map } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  unpublished$: Observable<DataBaseEntry[]>

  constructor(
    private storage: AngularFireStorage,
    private store: Store<fromCms.State>,
  ) {}

  ngOnInit() {
    this.unpublished$ = this.store.select(fromCms.getUnpublished)
  }


  getDownloadUrl = (location: string) =>
    this.storage
      .ref(location)
      .getDownloadURL()
      .toPromise()
}
