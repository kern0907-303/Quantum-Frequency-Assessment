# Quiz Funnel Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the assessment and sales pages so Facebook ad visitors are pulled into the quiz, complete it, see a useful result, and move naturally toward the NT$299 matched audio offer.

**Architecture:** Both sites are static HTML pages. The assessment page owns quiz motivation, lead capture, result explanation, and result-specific outbound links. The sales page owns product education, trust, checkout, and highlighting the product that matches `?result=A/B/C/D`.

**Tech Stack:** Static HTML/CSS/JavaScript, Node.js built-in test runner (`node --test`), existing ABL analytics endpoint, existing n8n and ECPay webhooks.

---

### Task 1: Add Regression Tests For Funnel-Critical Behavior

**Files:**
- Modify: `/Users/erickair/Documents/New project 2/Quantum-Frequency-Assessment/tests/tracking.test.mjs`
- Modify: `/Users/erickair/Documents/New project 2/-timewaver-audio-sales/tests/tracking.test.mjs`

- [ ] **Step 1: Add assessment-page tests before changing production HTML**

Add assertions that require the pain-led hero, lower-friction lead copy, result CTA, and new tracking events:

```js
test("uses pain-led quiz positioning for Facebook ad visitors", () => {
  assert.match(html, /你不是不夠累，是大腦還沒下班/);
  assert.match(html, /開始 60 秒睡前檢測/);
  assert.doesNotMatch(html, /前端不公開完整內容/);
});

test("tracks quiz funnel steps and result recommendation clicks", () => {
  assert.match(html, /trackAblEvent\(["']quiz_start["']/);
  assert.match(html, /trackAblEvent\(["']quiz_complete["']/);
  assert.match(html, /trackAblEvent\(["']lead_form_view["']/);
  assert.match(html, /trackAblEvent\(["']result_view["']/);
  assert.match(html, /trackAblEvent\(["']recommended_audio_click["']/);
});

test("result page links to matched audio with result parameter", () => {
  assert.match(html, /result-sales-link/);
  assert.match(html, /result=\$\{userResultType\}/);
  assert.match(html, /查看我的對應音頻 NT\$299/);
});
```

- [ ] **Step 2: Add sales-page tests before changing production HTML**

Add assertions that require result-aware sales-page behavior:

```js
test("supports result-aware product highlighting from assessment links", () => {
  assert.match(html, /data-product-card="A"/);
  assert.match(html, /data-product-card="B"/);
  assert.match(html, /data-product-card="C"/);
  assert.match(html, /data-product-card="D"/);
  assert.match(html, /highlightRecommendedProduct/);
  assert.match(html, /URLSearchParams\(window\.location\.search\)/);
});

test("sales page acknowledges visitors coming from the sleep checkpoint test", () => {
  assert.match(html, /如果你剛完成睡前卡點檢測/);
  assert.match(html, /先看對應你的那一款/);
});
```

- [ ] **Step 3: Run tests and verify they fail for missing behavior**

Run:

```bash
node --test /Users/erickair/Documents/New\ project\ 2/Quantum-Frequency-Assessment/tests/tracking.test.mjs
node --test /Users/erickair/Documents/New\ project\ 2/-timewaver-audio-sales/tests/tracking.test.mjs
```

Expected: both commands fail because production HTML still uses the old quiz framing and sales page has no result-aware highlighting.

### Task 2: Rework Assessment Page Copy And Result Flow

**Files:**
- Modify: `/Users/erickair/Documents/New project 2/Quantum-Frequency-Assessment/index.html`

- [ ] **Step 1: Replace hero and start-screen copy**

Change the hero from brand/technology-first to pain-first:

- Main headline: `你不是不夠累，是大腦還沒下班`
- Supporting copy: explain that replaying thoughts, light sleep, tomorrow pressure, and underlying unease are different sleep checkpoints.
- Start card headline: `先找出你卡在哪一型`
- CTA: `開始 60 秒睡前檢測`

- [ ] **Step 2: Replace defensive lead form copy**

Change the lead title and copy:

- Title: `你的睡前卡點已經分析完成`
- Body: `留下 Email，我們會把完整結果與今晚可使用的聲音路徑寄給你。`
- CTA: `解鎖我的睡前卡點報告`

- [ ] **Step 3: Add quiz funnel tracking**

Add `trackAblEvent` calls:

- `quiz_start` inside `startQuiz()`.
- `quiz_complete` when question 8 is completed.
- `lead_form_view` inside `showLeadStep()`.
- `result_view` after successful lead submit and before showing result.
- `recommended_audio_click` on result-page sales CTA click.

- [ ] **Step 4: Add result-page bridge copy and result-specific links**

Use a richer result data map with:

- `checkpoint`: A/B/C/D checkpoint label.
- `firstStep`: simple tonight action.
- `audioName`: recommended product.

Update result page so it shows:

- Main result.
- Why this sleep pattern happens.
- Tonight first step.
- Matched audio recommendation.
- Main CTA to `https://timewaver-audio-sales.netlify.app/?result=${userResultType}#purchase`.
- Secondary CTA to `https://timewaver-audio-sales.netlify.app/#purchase`.

### Task 3: Make Sales Page Result-Aware

**Files:**
- Modify: `/Users/erickair/Documents/New project 2/-timewaver-audio-sales/index.html`

- [ ] **Step 1: Add assessment handoff message**

Add a short bridge block near the top of the product decision area:

`如果你剛完成睡前卡點檢測，請先看對應你的那一款。`

- [ ] **Step 2: Add product card identifiers**

Add `data-product-card="A"`, `data-product-card="B"`, `data-product-card="C"`, and `data-product-card="D"` to the four product cards.

- [ ] **Step 3: Add recommended-card styling**

Add CSS for highlighted product cards:

```css
.product-card.is-recommended {
  border-color: rgba(212,175,55,0.72);
  box-shadow: 0 24px 52px rgba(212,175,55,0.18);
}
.recommendation-badge {
  display: none;
}
.product-card.is-recommended .recommendation-badge {
  display: inline-flex;
}
```

- [ ] **Step 4: Add result-parameter JavaScript**

Add `highlightRecommendedProduct()` that reads `new URLSearchParams(window.location.search).get('result')`, validates A/B/C/D, adds `is-recommended` to the matching card, and tracks `recommended_product_view`.

### Task 4: Verify

**Files:**
- Test: `/Users/erickair/Documents/New project 2/Quantum-Frequency-Assessment/tests/tracking.test.mjs`
- Test: `/Users/erickair/Documents/New project 2/-timewaver-audio-sales/tests/tracking.test.mjs`
- Manual visual check: both `index.html` files via local static server or file URL.

- [ ] **Step 1: Run assessment tests**

```bash
node --test /Users/erickair/Documents/New\ project\ 2/Quantum-Frequency-Assessment/tests/tracking.test.mjs
```

Expected: all tests pass.

- [ ] **Step 2: Run sales tests**

```bash
node --test /Users/erickair/Documents/New\ project\ 2/-timewaver-audio-sales/tests/tracking.test.mjs
```

Expected: all tests pass.

- [ ] **Step 3: Inspect diffs**

```bash
git -C /Users/erickair/Documents/New\ project\ 2/Quantum-Frequency-Assessment diff -- index.html tests/tracking.test.mjs docs/superpowers/plans/2026-06-21-quiz-funnel-redesign.md
git -C /Users/erickair/Documents/New\ project\ 2/-timewaver-audio-sales diff -- index.html tests/tracking.test.mjs
```

Expected: diffs only include approved funnel changes.
