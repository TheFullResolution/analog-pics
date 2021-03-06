import { SelectService } from '../../services/select/select.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import type from '_types_';
import { UnpublishedService } from './services/unpublished.service';
import { fadeInOut } from '../../../shared/animations/fadeInOut';
import { map, takeUntil } from 'rxjs/operators';
import { PublishService } from './services/publish.service';
import { DeleteService } from '../../services/delete/delete.service';

const animation = fadeInOut();

@Component({
  animations: [animation],
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe = new Subject();

  loadingUnpublished$: Observable<boolean>;
  anySelected$: Observable<boolean>;
  processingPublishing: boolean;
  processingDeleting: boolean;
  selection$: Observable<type.DataBaseEntryWithId[]>;
  unpublished$: Observable<type.DataBaseEntryWithId[]>;

  constructor(
    private deleteService: DeleteService,
    private publishService: PublishService,
    private selectService: SelectService,
    private unpublishedService: UnpublishedService,
  ) {}

  ngOnInit() {
    this.unpublishedService.getUnpublished();
    this.anySelected$ = this.selectService.getSelectionActive();
    this.selection$ = this.selectService.getSelectionData();
    this.unpublished$ = this.unpublishedService.unpublished$;
    this.loadingUnpublished$ = this.unpublishedService.loading$;

    this.publishService.processing$
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(status => {
        this.processingPublishing = status;
      });

    this.deleteService.processing$
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(status => {
        this.processingDeleting = status;
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
    this.selectService.clearSelection();
  }

  checkSelectionState = (img: type.DataBaseEntryWithId) =>
    this.selection$.pipe(map(list => list.some(el => el.id === img.id)));

  addSelected = (img: type.DataBaseEntryWithId) => {
    this.selectService.addSelection([img]);
  };

  removeSelected = (img: type.DataBaseEntryWithId) => {
    this.selectService.removeSelection(img);
  };

  selectAll = (list: type.DataBaseEntryWithId[]) => {
    this.selectService.addSelection(list);
  };

  deselectAll = () => {
    this.selectService.clearSelection();
  };

  publishSelection = () => {
    this.publishService.publishPictures({
      pics: this.selectService.getCurrentSelection(),
      callback: () => {
        this.selectService.clearSelection();
      },
    });
  };

  deleteSelection = () => {
    this.deleteService.deletePictures({
      pics: this.selectService.getCurrentSelection(),
      callback: () => {
        this.selectService.clearSelection();
      },
    });
  };
}
