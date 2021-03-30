import { ElementRef } from '@angular/core';
import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  // @ViewChild('loaderImg') loader:ElementRef;
  title = 'EsadManazel';
  ngAfterViewInit() {
    // this.loader.nativeElement.style.display='none';
  }
}
