# AIMEET independent website preview

This preview lives only under `preview/` on branch `preview/complete-website-20261012`, based on verified website commit `e6cfa9c691bf35f3d2aa17bcebd10285a37e6345`. No production root file, DNS or deployment was changed.

## Open
Download this branch as ZIP from GitHub, extract, and open `preview/index.html` in a browser. The static site has no build or dependencies. Independent policy pages are `privacy.html` and `terms.html`. All three pages offer Chinese/English switching.

For a development server, from the extracted repository run `python -m http.server 8080` and open `http://localhost:8080/preview/`.

## Architecture
Buildless HTML with inline CSS and JavaScript. All fixed-example state and form draft inputs stay in browser memory. No website API, cookies, localStorage or analytics. CSP blocks connections and permits only the optional YouTube iframe. The iframe is created after the visitor explicitly clicks Load; the default page makes no YouTube request.

Product walkthrough source: the AIMEET product repository README links https://youtu.be/27ZzpMc-uB0. Browser verification on 2026-10-12 confirmed the title, a 52-second duration, playback advancing to 0:07, and AIMEET's live meeting UI. No fabricated video or screenshots were created.

Contact validation prepares an encoded mailto draft to mumu@aimeet-ai.com. It does not send, store, or claim a successful submission. The visitor chooses to open their email application and send it.

## Completed implementation
- Product → use cases → evidence → team navigation.
- Product video with click-to-load player and original source link.
- Local three-step example: capture → conflicting deadline → explicit correction.
- Previous / next / reset controls and live status.
- Product flow, target audiences, proposed commercial direction.
- Confirmed founder profile and social links.
- Development metrics with scope and source index.
- FAQ in plain product language.
- Independent bilingual privacy and terms pages, linked beside form and in footer.
- Labeled contact form, required email, non-whitespace message, 1000-character limit, clear/reset and reviewed email-draft handoff.
- Responsive CSS, visible keyboard focus, reduced-motion preference and skip link.
- No named model vendor, program badge, subsidy claim, fabricated users or company data.

## Verification
Automated in-memory checks passed for all three authored documents: JavaScript syntax, duplicate IDs, missing local anchors, forbidden vendor/program wording. File contents were retrieved from GitHub after creation; subsequent commits use returned blob SHAs.

The local exec server failed before process creation:
`Failed to create unified exec process: exec-server rejected request (-32603): helper_unknown_error: setup refresh had errors`.
Local apply_patch returned no confirmed write; an attempted deletion reported the file did not exist. No local artifact should be claimed.

Library attachments were read completely through authenticated Library text reads (283 and 317 lines). prepare_materialize returned signed transfers, not local paths. Because no local process can run the mandated metadata-preserving transfer helper, local materialization was not completed. No guessed storage URL or raw download workaround was used.

Browser policy rejected file:// navigation. No alternate surface was used to bypass that policy. Since no HTTP preview server could start, rendered desktop/mobile, keyboard traversal, embedded-player and real form interaction checks remain pending. The video source itself was verified at its ordinary HTTPS YouTube page.

## Required connection
Direct form delivery requires an authorized receiving endpoint and matching handling policy. Do not enable success UI before an actual receipt response. Until then use the explicit draft-email mode.

## Facts to supply separately
Company legal name/location/founding year, approved founder photo, founder motivation/background detail, user and waitlist records, approved customer feedback, final pricing, Chinese quantitative tests, overall false-positive rate, owner/deadline extraction evaluation, production retention/access/consent/third-party processing rules and brand-name review.

These facts are not presented as blank public templates or invented values.

## Safe next step
Use an available local runtime or authorized private preview environment to serve and visually test this exact branch. Do not merge/deploy onto the production root without separate user instruction.
