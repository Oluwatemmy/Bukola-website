# Bukola's photos go here

Drop the real photos into **this folder** using the exact file names below.
Nothing else needs to change — each slot already reserves the right shape, so
the layout will not move when the real photo arrives.

| File name            | Where it appears                          | Best shape       |
| -------------------- | ----------------------------------------- | ---------------- |
| `signing-out.jpg`    | Screen 2 — the reveal, main card           | portrait 3:4     |
| `signing-out1.jpg`   | Screen 2 — the reveal, card tucked behind  | portrait 3:4     |
| `beginning.jpg`      | Chapter 1 — the early days, when she started | portrait 4:5   |
| `project-1.jpg`      | Chapter 2 — The Work                       | landscape 4:3    |
| `project-3.jpg`      | Chapter 2 — second project/stress photo    | portrait 4:5     |
| `project-2.jpg`      | Chapter 3 — The Struggle                   | landscape 5:4    |
| `hard-days.jpg`      | Chapter 3 — the quiet beat (when she was sick) | portrait 4:5 |
| `gown.jpg`           | Chapter 5 — the blurred photo that resolves| portrait 4:5     |
| `convocation-1.jpg`  | Chapter 5 — the second card                | portrait 4:5     |
| `convocation-2.jpg`  | Look at you now — stack 1                  | portrait 4:5     |
| `signing-out-2.jpg`  | Look at you now — stack 1                  | portrait 4:5     |
| `friends-1.jpg`      | Look at you now — stack 1                  | square 1:1       |
| `convocation-3.jpg`  | Look at you now — stack 2                  | portrait 4:5     |
| `friends-2.jpg`      | Look at you now — stack 2                  | landscape 5:4    |
| `hero-wide.jpg`      | Look at you now — the full-screen moment   | portrait 3:4     |
| `final.jpg`          | Final scene — the last photo               | portrait 4:5     |

## Renaming, adding or removing slots

Everything about photos lives in one file: `app/src/content/photos.ts`.
Change a `file`, a `label`, or a `ratio` there and the site follows.

## Two rules that actually matter

### 1. The file name must match exactly

Lowercase, and the extension too. `convocation-1.JPG` will **not** be found —
the slot just keeps showing its placeholder, with no error anywhere. If a
photo isn't appearing, check the name first.

Each placeholder prints the file name it's waiting for right on the page, so
you can read straight off the screen which file a slot wants.

### 2. Resize before you drop them in

Phones are the main device here, and these load over mobile data.

- **Longest edge ~1600px.** A 4000px camera file is ~8× the bytes for zero
  visible difference on a phone. `hero-wide.jpg` can go to 2000px.
- **Under ~300 KB each**, ideally the whole folder under ~3 MB.
- **Crop to the shape in the table above** so the framing is your choice
  rather than the crop's.

Easiest way without installing anything — **[squoosh.app](https://squoosh.app)**
works in a phone or desktop browser, offline, no upload to a server. Open the
photo, set Resize → 1600px, pick MozJPEG at quality ~78, download.

Tapping a photo on the site opens it full-screen, so they do get seen at a
decent size — but 1600px is already more than any phone screen can show.

If you'd rather use `.webp` (roughly 30% smaller at the same quality), export
it and update the file names in `../../../src/content/photos.ts` to match.

## Videos

The site does not use video anywhere by default, on purpose — a still frame
communicates the same thing at a fraction of the bandwidth. If you want one
short clip later, pull a frame out of it first and see whether the frame is
enough.
