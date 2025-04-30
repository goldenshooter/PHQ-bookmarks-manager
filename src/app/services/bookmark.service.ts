import { Injectable } from '@angular/core'
import { Bookmark } from '../models/bookmark.model'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'bookmarks'
const DEFAULT_BOOKMARKS: Bookmark[] = []

for (let i = 1; i <= 50; i++) {
  DEFAULT_BOOKMARKS.push({ id: uuidv4(), url: `https://example.com/page-${i}` })
}

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private bookmarks: Bookmark[] = DEFAULT_BOOKMARKS

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored) {
      // Parse from localStorage
      this.bookmarks = JSON.parse(stored)
      console.log('Loaded bookmarks from localStorage:', this.bookmarks.length)
    } else {
      // First-time load: generate initial bookmarks
      this.bookmarks = DEFAULT_BOOKMARKS
      this.saveToStorage()
      console.log('Generated default bookmarks:', this.bookmarks.length)
    }
  }

  saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookmarks))
  }

  getAll(): Bookmark[] {
    return this.bookmarks
  }

  add(url: string): void {
    this.bookmarks.unshift({ id: uuidv4(), url })
  }

  delete(id: string): void {
    this.bookmarks = this.bookmarks.filter((b) => b.id !== id)
  }

  update(id: string, newUrl: string): void {
    this.bookmarks = this.bookmarks.map((b) =>
      b.id === id ? { ...b, url: newUrl } : b,
    )
  }
}
