import { SelectService } from './../../services/select/select.service'
import { Component, OnInit } from '@angular/core'
import { Observable, combineLatest } from 'rxjs'
import type from '_types_'
import { UnpublishedService } from './service/unpublished.service'
import { fadeInOut } from '../../animations/fadeInOut'
import { take, map } from 'rxjs/operators'

@Component({
  animations: [fadeInOut()],
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  loading: Observable<boolean>
  anySelected: Observable<boolean>
  selection$: Observable<type.DataBaseEntryWithId[]>
  unpublished$: Observable<type.DataBaseEntryWithId[]>

  constructor(
    private unpublishedService: UnpublishedService,
    private selectService: SelectService,
  ) {}

  ngOnInit() {
    this.unpublishedService.getUnpublished()
    this.anySelected = this.selectService.getSelectionActive()
    this.selection$ = this.selectService.getSelectionData()
    this.unpublished$ = this.unpublishedService.unpublished$
    this.loading = this.unpublishedService.loading$
  }

  checkSelectionState = (img: type.DataBaseEntryWithId) =>
    this.selection$.pipe(map(list => list.some(el => el.id === img.id)))

  addSelected = (img: type.DataBaseEntryWithId) => {
    this.selectService.addSelection([img])
  }

  removeSelected = (img: type.DataBaseEntryWithId) => {
    this.selectService.removeSelection(img)
  }

  selectAll = (list: type.DataBaseEntryWithId[]) => {
    this.selectService.addSelection(list)
  }

  deselectAll = () => {
    this.selectService.clearSelection()
  }
}
