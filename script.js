const AFFILIATE_URL = "https://stripchat.com/SmoothTwinkVibes/follow-me";

function syncMetadataUrl() {
  const isHttp = window.location.protocol === "http:" || window.location.protocol === "https:";
  if (!isHttp) {
    return;
  }

  const absoluteUrl = window.location.href;
  const canonical = document.querySelector('link[rel="canonical"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');

  if (canonical) {
    canonical.setAttribute("href", absoluteUrl);
  }

  if (ogUrl) {
    ogUrl.setAttribute("content", absoluteUrl);
  }
}

function trackCtaClick(location) {
  const payload = {
    event: "affiliate_cta_click",
    location,
    href: AFFILIATE_URL,
    timestamp: new Date().toISOString()
  };

  window.smoothTwinkVibesAnalytics = window.smoothTwinkVibesAnalytics || [];
  window.smoothTwinkVibesAnalytics.push(payload);
  window.dispatchEvent(new CustomEvent("affiliate-cta-click", { detail: payload }));
}

function wireAffiliateLinks() {
  const links = document.querySelectorAll("[data-cta-location]");

  links.forEach((link) => {
    link.setAttribute("href", AFFILIATE_URL);
    link.addEventListener("click", () => {
      trackCtaClick(link.dataset.ctaLocation || "unknown");
    });
  });
}

syncMetadataUrl();
wireAffiliateLinks();
