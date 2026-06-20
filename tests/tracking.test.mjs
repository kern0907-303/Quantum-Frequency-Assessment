import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("installs ABL analytics page view tracking", () => {
  assert.match(html, /ABL_ANALYTICS_SITE_ID\s*=\s*["']quantum_frequency_assessment["']/);
  assert.match(html, /trackAblEvent\(["']page_view["']\)/);
});

test("tracks assessment submit and audio purchase click", () => {
  assert.match(html, /trackAblEvent\(["']assessment_submit["']/);
  assert.match(html, /trackAblEvent\(["']audio_purchase_click["']/);
});
