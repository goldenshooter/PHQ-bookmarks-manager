import { Routes } from '@angular/router'
import { OverviewPageComponent } from './pages/overview-page/overview-page.component'
import { ResultsPageComponent } from './pages/results-page/results-page.component'

export const routes: Routes = [
  { path: '', component: OverviewPageComponent },
  { path: 'results', component: ResultsPageComponent },
]
