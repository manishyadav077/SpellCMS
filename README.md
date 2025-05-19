# SpellCMS — Frontend Developer Challenge Submission

This is my submission for the **SpellCMS Frontend Developer Challenge** by Spell Innovation, Kathmandu.

I built a **mini Content Management System (CMS)** dashboard where users can authenticate and manage blog content including posts, categories, and authors. The project focuses on clean architecture, scalable frontend development, and good user experience.

## Features Implemented

- **Authentication**  
  - Email/password login with mocked token-based auth stored in `localStorage`
  - Create a new account
  - Persistent login state with protected routes and redirects for unauthenticated users  

- **Blog Posts Management**  
  - Full CRUD operations (Create, Read, Update, Delete) on blog posts  
  - Post form with fields: Title, Author (dropdown), Category (dropdown), Tags (multi-input), Status toggle, Cover Image URL with preview  
  - Change post status between Draft and Published  

- **Categories Management**  
  - Add, edit, and delete blog categories
  - 
- **Authors Management**  
  - CRUD operations on authors including name, avatar, and bio  

- **Search & Filter**  
  - Search blog posts by title or tags  
  - Filter posts by status and category  

---

## Technical Details

- **Framework:** React.js with TypeScript  
- **Styling:** Tailwind CSS for responsive and clean UI design  
- **State Management:**  Zustand used for efficient API data fetching and state handling  
- **Routing:** React Router DOM for page navigation and protected routes  
- **Forms:** React Hook Form with Zod schema validation for robust and user-friendly form handling  
- **Backend:** JSON Server simulating a REST API for posts, categories, authors, and auth  
- **Authentication:** Token stored in `localStorage` to mock session persistence  
- **Testing:** Basic validation and filtering test cases implemented using Jest
- **Build Tool:** Vite for fast development and build  

---

## How to Run

1. Clone the repo  
   ```bash
   git clone https://github.com/your-username/spellcms.git
   cd spellcms
