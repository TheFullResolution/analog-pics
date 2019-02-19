import { SelectService } from './../../services/select/select.service'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import type from '_types_'
import { UnpublishedService } from './service/unpublished.service'

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  loading: Observable<boolean>
  anySelected: Observable<boolean>
  unpublished$: Observable<type.DataBaseEntryWithId[]>

  constructor(
    private unpublishedService: UnpublishedService,
    private selectService: SelectService,
  ) {}

  ngOnInit() {
    this.unpublishedService.getUnpublished()
    this.anySelected = this.selectService.getSelectionActive()
    this.unpublished$ = this.unpublishedService.unpublished$
    this.loading = this.unpublishedService.loading$
  }

  addSelected(img: type.DataBaseEntryWithId) {
    this.selectService.addSelection(img)
  }

  removeSelected(img: type.DataBaseEntryWithId) {
    this.selectService.removeSelection(img)
  }

}
