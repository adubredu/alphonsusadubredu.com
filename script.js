const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const videoDialog = document.getElementById("video-dialog");

if (videoDialog && typeof videoDialog.showModal === "function") {
  const videoFrame = videoDialog.querySelector("iframe");
  const videoTitle = document.getElementById("video-dialog-title");
  const closeButton = videoDialog.querySelector(".video-dialog-close");

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

  document.querySelectorAll('a[href*="youtu.be/"], a[href*="youtube.com/watch"]').forEach((link) => {
    const videoId = getYouTubeId(link.href);
    if (!videoId) return;

    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();

      const cardTitle = link.closest("article, li")?.querySelector("h3, h4")?.textContent.trim();
      videoTitle.textContent = cardTitle || link.getAttribute("aria-label") || "Video";
      videoFrame.title = `${videoTitle.textContent} — YouTube video player`;
      videoFrame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
      videoDialog.showModal();
    });
  });

  const closeVideo = () => videoDialog.close();

  closeButton.addEventListener("click", closeVideo);
  videoDialog.addEventListener("click", (event) => {
    if (event.target === videoDialog) closeVideo();
  });
  videoDialog.addEventListener("close", () => {
    videoFrame.removeAttribute("src");
  });
}
