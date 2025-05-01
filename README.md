# Bookmark Manager SPA

A single-page Angular application that allows users to manage a list of bookmarked URLs, including add, edit, delete, and paginate features. Data persistence is handled with `localStorage`.

## Features

- ✅ Add new bookmarks via a validated URL form
- 📝 Edit and update existing bookmarks in-place
- ❌ Delete bookmarks
- 📄 Pagination for easier navigation (20 per page)
- 💾 LocalStorage persistence
- 🔗 Post-submission confirmation page

## Tech Stack

- **Framework:** Angular (standalone components)
- **Styling:** CSS (modular and shared)
- **State & Storage:** Service layer with in-memory state and browser `localStorage`
- **Routing:** Angular Router

## Limitations

- ❌ No backend/API support (per spec)
- 🚫 No advanced form validation (e.g., no async validators)
- 🛠️ No sorting or search features implemented

## Design Considerations

- Clean separation between logic (`component.ts`), presentation (`component.html`), and styles (`component.css`)
- Data is passed between pages using Angular Router’s `state` property
- Default bookmarks are auto-generated on first load for testing UX and pagination

## Author

**Chao Zhang (Steven)**
> _Design and build by Chao Zhang_
