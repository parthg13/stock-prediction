import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private handlerShowLoader: Subscription;
  isLoader = false;
  constructor(private sharedService: SharedService){
    this.subscribeServiceData();
  }
  ngOnDestroy() {
    this.unSubscribeServiceData();
  }
  protected subscribeServiceData() {
    this.handlerShowLoader = this.sharedService.updatedShowLoaderSubject$.subscribe(
      status => {
        setTimeout(() => {
          this.isLoader = status;
        }, 0);
      }
    );
  }

  protected unSubscribeServiceData() {
    if (this.handlerShowLoader) {
      this.handlerShowLoader.unsubscribe();
    }
  }
}
