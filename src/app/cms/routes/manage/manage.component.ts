import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublishedService } from './services/published.service';
import { Observable, Subject } from 'rxjs';
import type from '../../../../../_types_';
import { SelectService } from '../../services/select/select.service';
import { DeleteService } from '../../services/delete/delete.service';
import { map, takeUntil } from 'rxjs/operators';
import { fadeInOut } from '../../../shared/animations/fadeInOut';

const animation = fadeInOut();

@Component({
  animations: [animation],
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe = new Subject();

  published$: Observable<type.DataBaseEntryWithId[]>;
  anySelected$: Observable<boolean>;
  processingDeleting: boolean;
  selection$: Observable<type.DataBaseEntryWithId[]>;

  constructor(
    private publishedService: PublishedService,
    private selectService: SelectService,
    private deleteService: DeleteService,
  ) {}

  ngOnInit() {
    this.publishedService.getPublished();
    this.published$ = this.publishedService.published$;
    this.anySelected$ = this.selectService.getSelectionActive();
    this.selection$ = this.selectService.getSelectionData();

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

  deleteSelection = () => {
    this.deleteService.deletePictures({
      pics: this.selectService.getCurrentSelection(),
      callback: () => {
        this.selectService.clearSelection();
      },
    });
  };
}
