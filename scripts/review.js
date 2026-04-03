
function updateReviewCount() {
  let count = parseInt(localStorage.getItem("reviewCount") || "0", 10);
  count += 1;
  localStorage.setItem("reviewCount", count);

  const el = document.getElementById("reviewCount");
  if (el) el.textContent = count;
}

function displayReviewSummary() {
  const params = new URLSearchParams(window.location.search);
  const container = document.getElementById("reviewSummary");
  if (!container) return;

  const product   = params.get("productName") || "—";
  const rating    = params.get("rating")      || "—";
  const date      = params.get("installDate") || "—";
  const features  = params.getAll("features");
  const review    = params.get("writtenReview") || "—";
  const userName  = params.get("userName")    || "Anonymous";

  const starStr = rating !== "—" ? "★".repeat(parseInt(rating)) + " (" + rating + "/5)" : "—";

  const featureStr = features.length > 0 ? features.join(", ") : "None selected";

  let dateStr = date;
  if (date && date !== "—") {
    const d = new Date(date + "T00:00:00");
    dateStr = d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  const rows = [
    { key: "Product",           val: product },
    { key: "Overall Rating",    val: starStr },
    { key: "Installation Date", val: dateStr },
    { key: "Useful Features",   val: featureStr },
    { key: "Written Review",    val: review },
    { key: "Reviewer Name",     val: userName }
  ];

  let html = "<h3>Your Submission</h3>";
  rows.forEach(function (row) {
    html += `<div class="summary-row">
               <span class="summary-key">${row.key}</span>
               <span class="summary-val">${escapeHtml(row.val)}</span>
             </div>`;
  });

  container.innerHTML = html;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setLastModified() {
  const el = document.getElementById("lastMod");
  if (el) el.textContent = document.lastModified;
}

updateReviewCount();
displayReviewSummary();
setLastModified();
