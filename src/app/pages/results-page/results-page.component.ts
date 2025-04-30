import { RouterModule } from '@angular/router'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-results-page',
  imports: [RouterModule],
  styleUrls: ['./results-page.component.css', '../../../styles/shared.css'],
  templateUrl: './results-page.component.html',
})
export class ResultsPageComponent {
  url: string = history.state?.url || ''
}
