const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const getYouTubeId = (href) => {
  const url = new URL(href);

  if (url.hostname === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0];
  }

  if (url.hostname.endsWith("youtube.com") && url.pathname === "/watch") {
    return url.searchParams.get("v");
  }

  return null;
};

document.querySelectorAll('.news-feature-media[href*="youtu.be/"], .news-feature-media[href*="youtube.com/watch"]').forEach((media) => {
  const videoId = getYouTubeId(media.href);
  if (!videoId) return;

  const article = media.closest("article");
  const title = article?.querySelector("h3, h4")?.textContent.trim() || media.getAttribute("aria-label") || "Video";
  let player;

  const playVideo = (event) => {
    if (event && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
    if (event) event.preventDefault();

    if (player) {
      player.scrollIntoView({ block: "nearest" });
      return;
    }

    player = document.createElement("div");
    player.className = `${media.className} is-playing`;

    const iframe = document.createElement("iframe");
    iframe.title = `${title} — YouTube video player`;
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    player.append(iframe);
    media.replaceWith(player);
  };

  media.addEventListener("click", playVideo);

  article?.querySelectorAll('a[href*="youtu.be/"], a[href*="youtube.com/watch"]').forEach((link) => {
    if (link !== media && getYouTubeId(link.href) === videoId) {
      link.addEventListener("click", playVideo);
    }
  });
});
