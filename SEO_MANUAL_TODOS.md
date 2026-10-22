# SEO Manual Action Plan — Google Search Console (GSC)

This document contains step-by-step instructions to clear the **"Discovered - currently not indexed"** status in Google Search Console for the 10 target pages of **https://scan.toolgenie.online**.

---

## 1. Summary of Code & Architecture Fixes Completed

All technical prerequisites have been implemented across the codebase:
- **Internal Linking Solved**: Added high-priority crawl paths from the homepage (`index.html`), tool pages (`face-shape-detector.html`, `eye-shape-detector.html`, `golden-ratio-face-calculator.html`), research hubs, and a universal 3-column footer on all 52 pages.
- **Canonical URLs Standardized**: All pages now declare absolute self-referencing canonical tags with trailing slashes (`https://scan.toolgenie.online/<path>/`), eliminating relative `.html` canonical mismatches.
- **Face Shape Cross-Linking**: The 4 core face shape guides (`/face-shape/oval/`, `/round/`, `/square/`, `/triangle/`) now feature reciprocal cards and direct links to `/face-shape-detector/`.
- **Hairstyles Hub & Child Guides**: Fixed navigation in `/hairstyles/` linking to `/hairstyles/italian-bob/` with descriptive anchor texts, breadcrumbs, and face-shape guide callouts.
- **Research Cross-Linking**: Bidirectional links between `/golden-ratio-face-calculator/`, `/research/golden-ratio-limitations/`, `/research/selfie-distance-test/`, and `/about/`.
- **Content Uniqueness Boosted**: The 4 face shape guides were rewritten with unique anthropometric ratios, 4 measurable checks, 5+ tailored haircuts, haircuts to avoid, and 5 targeted FAQs (~1,900–2,000 words each).
- **Clean Sitemaps & Robots.txt**: Clean trailing-slash URLs with zero `.html` extensions.

---

## 2. Immediate Post-Deploy GSC Action Steps

### Step 1: Verify Live Deployment
1. Verify Cloudflare Pages has finished building the latest deployment.
2. Confirm the 10 URLs return HTTP 200 without redirect loops:
   - `https://scan.toolgenie.online/about/`
   - `https://scan.toolgenie.online/face-shape/oval/`
   - `https://scan.toolgenie.online/face-shape/round/`
   - `https://scan.toolgenie.online/face-shape/square/`
   - `https://scan.toolgenie.online/face-shape/triangle/`
   - `https://scan.toolgenie.online/hairstyles/`
   - `https://scan.toolgenie.online/hairstyles/italian-bob/`
   - `https://scan.toolgenie.online/jawline-score/`
   - `https://scan.toolgenie.online/research/golden-ratio-limitations/`
   - `https://scan.toolgenie.online/research/selfie-distance-test/`

---

### Step 2: URL Inspection & "Request Indexing" (Priority Batch)
Google Search Console limits manual indexing requests (~10–12 per day), which fits our 10 URLs.

For **each** of the 10 URLs listed above:
1. Open [Google Search Console](https://search.google.com/search-console).
2. Select property `https://scan.toolgenie.online/` (or domain property).
3. Paste the URL into the **top search bar** ("Inspect any URL in...").
4. Click **"Test Live URL"** in the top right to verify Googlebot can render the page with HTTP 200 and sees the self-referencing canonical tag.
5. Click **"Request Indexing"**.
6. Repeat for all 10 target URLs.

*Recommended submission order:*
1. `https://scan.toolgenie.online/` (Homepage — so Googlebot picks up the new internal link hub)
2. `https://scan.toolgenie.online/face-shape/oval/`
3. `https://scan.toolgenie.online/face-shape/round/`
4. `https://scan.toolgenie.online/face-shape/square/`
5. `https://scan.toolgenie.online/face-shape/triangle/`
6. `https://scan.toolgenie.online/hairstyles/`
7. `https://scan.toolgenie.online/hairstyles/italian-bob/`
8. `https://scan.toolgenie.online/jawline-score/`
9. `https://scan.toolgenie.online/research/golden-ratio-limitations/`
10. `https://scan.toolgenie.online/research/selfie-distance-test/`
11. `https://scan.toolgenie.online/about/`

---

### Step 3: Validate Fix in "Page Indexing" Report
1. In the left navigation menu, go to **Indexing > Pages**.
2. Scroll to the table titled **"Why pages aren't indexed"**.
3. Click on the row: **"Discovered - currently not indexed"**.
4. Click the blue **"Validate Fix"** button at the top of the report.
   - *Note:* Google will begin a validation cycle that checks sample URLs across the cluster.

---

### Step 4: Re-Submit Sitemap
1. In the left navigation menu, go to **Indexing > Sitemaps**.
2. Under "Add a new sitemap", enter: `sitemap.xml`.
3. Click **Submit**.
4. Confirm status changes to **"Success"** and shows **48 discovered pages**.

---

## 3. Monitoring Schedule & Expected Timeline

| Milestone | Expected Window | What to Check |
| :--- | :--- | :--- |
| **Initial Crawl** | 24 – 72 hours | In GSC URL Inspection, check "Last crawl date". Should reflect recent crawl. |
| **Validation Progress** | 3 – 7 days | In GSC Pages report, validation status changes from "Started" to "Passed" for sampled URLs. |
| **Indexation Transition** | 5 – 14 days | Affected URLs transition from "Discovered" into **"Indexed"** green bucket. |
| **Search Impressions** | 2 – 4 weeks | Performance report starts recording impressions for queries (e.g. "oval face shape guide", "italian bob by face shape"). |

---

## 4. Troubleshooting Checklist

If any URL remains in "Discovered" after 14 days:
1. **Check Live Test Screenshot**: In URL Inspection > Test Live URL > View Tested Page > Screenshot, confirm Googlebot renders full HTML including the footer and body text without JavaScript errors.
2. **Check Crawled As**: Verify Googlebot Smartphone was used.
3. **Check Referring Page**: In URL Inspection, verify that Google recognizes internal referring pages (`https://scan.toolgenie.online/`, `https://scan.toolgenie.online/hairstyles/`, etc.).
