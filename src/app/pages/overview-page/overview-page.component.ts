import { v4 as uuidv4 } from 'uuid'
import { Bookmark } from '../../models/bookmark.model'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { BookmarkService } from '../../services/bookmark.service'

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css', '../../../styles/shared.css'],
  imports: [CommonModule, FormsModule],
})
export class OverviewPageComponent {
  url = ''
  error = ''
  page = 1
  pageSize = 20
  editingId: string | null = null
  editedUrl: string = ''

  constructor(
    private router: Router,
    private bookmarkService: BookmarkService,
  ) {}

  isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url)
      return !!parsed.hostname
    } catch (_) {
      return false
    }
  }

  get isUrlValid(): boolean {
    return this.isValidUrl(this.url.trim())
  }

  get isUpdatedUrlValid(): boolean {
    return this.isValidUrl(this.editedUrl.trim())
  }

  get totalPages(): number {
    return Math.ceil(this.bookmarkService.getAll().length / this.pageSize) || 1
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1)
  }

  setPage(n: number) {
    this.page = n
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++
  }

  prevPage() {
    if (this.page > 1) this.page--
  }

  get pagedBookmarks(): Bookmark[] {
    console.log('all bookmarks', this.bookmarkService.getAll())
    const start = (this.page - 1) * this.pageSize
    return this.bookmarkService.getAll().slice(start, start + this.pageSize)
  }

  add(): void {
    const newUrl = this.url.trim()
    if (!this.isValidUrl(newUrl)) {
      this.error = 'Invalid URL'
      return
    }

    this.error = ''
    this.bookmarkService.add(newUrl)
    this.bookmarkService.saveToStorage()
    this.router.navigate(['/results'], { state: { url: this.url } })
  }

  delete(id: string) {
    this.bookmarkService.delete(id)
    this.bookmarkService.saveToStorage()
  }

  update(id: string) {
    if (this.editedUrl.trim()) {
      this.bookmarkService.update(id, this.editedUrl)
    }
    this.finishUpdate()
    this.bookmarkService.saveToStorage()
  }

  startEditing(id: string, currentUrl: string) {
    this.editingId = id
    this.editedUrl = currentUrl
  }

  finishUpdate() {
    this.editingId = null
    this.editedUrl = ''
  }
}
