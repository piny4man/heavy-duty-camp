import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import '@fontsource/share-tech-mono';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'heavy-duty-camp-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'heavy-duty-camp';
}
