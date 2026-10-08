# Benjamin Atta Owusu: personal website

This repository is a complete website. GitHub builds and hosts it for free.
You never need RStudio, Quarto, a terminal or git. Everything is done on github.com.

## Part 1. Where the site lives

The site is published from this repository at **https://benteeta.github.io**.
Every change you commit here goes live by itself in 1 to 2 minutes.
To check that a change worked, open the **Actions** tab: a green tick means
the site rebuilt, a red cross means it didn't (see the end of this page).

---

## Part 2. Change something

Every change works the same way:

1. Open the repository on github.com and click the file you want to change.
2. Click the **pencil icon** (top right of the file).
3. Make your edit.
4. Click **Commit changes**, then **Commit changes** again in the box that appears.
5. The site updates in 1 to 2 minutes. Refresh the page to see it.

### Which file to edit

| To change... | Edit this file |
|---|---|
| Your name, job title, email, profile links, the facts under your name | `_config.yml` |
| Home page text | `index.md` |
| Research page (projects, methods, funding, talks, teaching) | `research.md` |
| The list of publications | `_data/publications.yml` |
| The "Work with me" page | `work-with-me.md` |
| Colours | `assets/style.css` (the two blocks at the top) |

You should not need to edit anything in `_layouts`, `_includes` or `assets/publications.js`.

### Add a new paper

Open `_data/publications.yml`, click the pencil, and paste a block like this
above the first paper, then change the text:

```yaml
- title: "Title of the paper: subtitle"
  authors: "Owusu BA, Smith J, Kadam UT"
  status: published
  journal: "Journal name"
  year: 2026
  details: "12(3):45-56"
  doi: "10.1234/abcd.5678"
  topics: ["Heart failure and multimorbidity"]
```

- Keep the quotes, and keep two spaces at the start of each line after `- title:`.
- For a paper under review, write `status: under review` and leave out journal, year, details and doi.
- When a paper is accepted, change `under review` to `published` and add journal, year, details and doi.
- Use an existing topic label where you can, so the filter groups papers together.
  Current labels: Heart failure and multimorbidity; Machine learning and digital health;
  Environmental health; Spatial analysis; Neonatal health.

The publication counts on the home page and the first-author filter update by themselves.

### Add your photo

1. Open the `assets` folder on GitHub, click **Add file**, then **Upload files**.
2. Upload a square photo named `photo.jpg` and commit.
3. In `_config.yml`, change `photo: ""` to `photo: "/assets/photo.jpg"` and commit.

The same steps add your CV: upload `cv.pdf` to `assets`, then set `cv_pdf: "/assets/cv.pdf"`.

### Show or hide the "Work with me" page

It is hidden for now. In `_config.yml`, change `show_services: false` to
`show_services: true` to add the menu link and the home-page button.
Check the university's policy on outside work before you do.

---

## If the site does not update

Open the **Actions** tab. A red cross means the last change broke the build.
Click it to read the error. It usually names the file and line. The most
common causes are:

- a missing quote, or a colon in a title without quotes around the title
- a line in `_data/publications.yml` that lost its two leading spaces

Open the file, fix the line and commit again. The old version of the site stays
online until the build succeeds, so a mistake never takes the site down.
