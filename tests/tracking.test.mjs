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
