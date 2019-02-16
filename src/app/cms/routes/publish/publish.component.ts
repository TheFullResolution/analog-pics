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
  unpublished$: Observable<type.DataBaseEntryWithId[]>

  constructor(private unpublishedService: UnpublishedService) {}

  ngOnInit() {
    this.unpublishedService.getUnpublished()

    this.unpublished$ = this.unpublishedService.unpublished$
    this.loading = this.unpublishedService.loading$
  }
}
