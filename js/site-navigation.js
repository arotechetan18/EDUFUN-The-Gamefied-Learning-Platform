(function () {
  function getRootPath() {
    const marker = "/pages/";
    const path = window.location.pathname;

    if (path.includes(marker)) {
      return path.split(marker)[0] + "/";
    }

    return path.substring(0, path.lastIndexOf("/") + 1);
  }

  function toRoot(relativePath) {
    return getRootPath() + relativePath.replace(/^\/+/, "");
  }

  function goBackOrHome() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = toRoot("index.html");
    }
  }

  function getCurrentUserName() {
    return localStorage.getItem("loggedInUser") || "";
  }

  function getAllProfiles() {
    try {
      return JSON.parse(localStorage.getItem("edufunProfileData")) || {};
    } catch (error) {
      return {};
    }
  }

  function formatDisplayName(name) {
    return name
      .split(" ")
      .filter(Boolean)
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");
  }

  function getProfileState() {
    const username = getCurrentUserName();
    const profileImage = localStorage.getItem("profileImage") || "";
    const profiles = getAllProfiles();
    const profile = (username && profiles[username]) || {};
    const displayName = profile.displayName || (username ? formatDisplayName(username) : "Guest User");
    const initials = displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(function (part) {
        return part.charAt(0).toUpperCase();
      })
      .join("") || "GU";

    return {
      isLoggedIn: Boolean(username),
      displayName: displayName,
      profileImage: profileImage,
      initials: initials,
    };
  }

  function buildAvatarMarkup(profileState, className) {
    if (profileState.profileImage) {
      return `<span class="${className}"><img src="${profileState.profileImage}" alt="${profileState.displayName}" /></span>`;
    }

    return `<span class="${className}">${profileState.initials}</span>`;
  }

  function injectStyles() {
    if (document.getElementById("edufun-site-navigation-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "edufun-site-navigation-styles";
    style.textContent = `
      .edufun-back-dock {
        position: fixed;
        top: 18px;
        left: 18px;
        z-index: 1200;
      }

      .edufun-back-btn {
        border: none;
        border-radius: 999px;
        padding: 12px 18px;
        background: rgba(255, 255, 255, 0.94);
        color: #5b21b6;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 14px 30px rgba(76, 29, 149, 0.18);
        backdrop-filter: blur(8px);
      }

      .edufun-back-btn:hover,
      .edufun-avatar-trigger:hover {
        transform: translateY(-2px);
        transition: transform 0.2s ease;
      }

      .edufun-avatar-trigger {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        padding: 0 !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      .edufun-avatar-trigger li {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent !important;
        padding: 0 !important;
      }

      .edufun-nav-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: linear-gradient(135deg, #7c3aed, #a855f7);
        color: #fff;
        font-size: 0.92rem;
        font-weight: 700;
        border: 2px solid rgba(255, 255, 255, 0.95);
        box-shadow: 0 8px 18px rgba(106, 17, 203, 0.22);
        flex-shrink: 0;
      }

      .edufun-nav-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .edufun-avatar-label {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      @media (max-width: 640px) {
        .edufun-back-dock {
          top: 12px;
          left: 12px;
        }

        .edufun-back-btn {
          padding: 11px 15px;
          font-size: 0.9rem;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function addBackButton() {
    if (document.querySelector(".edufun-back-dock")) {
      return;
    }

    const dock = document.createElement("div");
    dock.className = "edufun-back-dock";
    dock.innerHTML = '<button type="button" class="edufun-back-btn" data-edufun-back="true">&larr; Back</button>';
    document.body.appendChild(dock);

    dock.querySelector("[data-edufun-back='true']").addEventListener("click", function () {
      goBackOrHome();
    });
  }

  function renderProfileTrigger(anchor, labelNode, profileState) {
    if (!anchor || !labelNode) {
      return;
    }

    if (profileState.isLoggedIn) {
      anchor.href = toRoot("pages/account.html");
      anchor.classList.add("edufun-avatar-trigger");
      labelNode.innerHTML = `
        <span class="edufun-avatar-label">
          ${buildAvatarMarkup(profileState, "edufun-nav-avatar")}
        </span>
      `;
      labelNode.setAttribute("aria-label", profileState.displayName + " profile");
      labelNode.setAttribute("title", profileState.displayName);
    } else {
      anchor.href = toRoot("pages/login.html");
      anchor.classList.remove("edufun-avatar-trigger");
      labelNode.textContent = "Log In";
      labelNode.removeAttribute("aria-label");
      labelNode.removeAttribute("title");
    }
  }

  function updateAccountNavigation() {
    const profileState = getProfileState();
    renderProfileTrigger(
      document.getElementById("account-page"),
      document.getElementById("pn-UserlogIn"),
      profileState
    );
    renderProfileTrigger(
      document.getElementById("account-page-phn"),
      document.getElementById("UserlogIn"),
      profileState
    );
  }

  function normalizeInternalLinks() {
    document.querySelectorAll('a[target="new"]').forEach(function (link) {
      const href = (link.getAttribute("href") || "").trim();
      if (href && !/^(https?:|mailto:|tel:)/i.test(href)) {
        link.removeAttribute("target");
      }
    });
  }

  function ensureEduNotesLink(navList) {
    if (!navList) {
      return;
    }

    const hasExistingNotesLink = Array.from(navList.querySelectorAll("a")).some(function (link) {
      const text = (link.textContent || "").trim().toLowerCase();
      const href = (link.getAttribute("href") || "").toLowerCase();
      return text.includes("notes") || href.includes("notes.html") || href.includes("edunotes.html");
    });

    if (hasExistingNotesLink || navList.querySelector('[data-edufun-notes-link="true"]')) {
      return;
    }

    const link = document.createElement("a");
    link.href = toRoot("pages/edunotes.html");
    link.setAttribute("data-edufun-notes-link", "true");
    link.innerHTML = "<li>EduNotes</li>";

    const anchors = Array.from(navList.querySelectorAll("a"));
    const aboutLink = anchors.find(function (anchor) {
      return /about/i.test(anchor.textContent || "");
    });

    if (aboutLink) {
      navList.insertBefore(link, aboutLink);
    } else {
      navList.appendChild(link);
    }
  }

  function updateEduNotesLinks() {
    document.querySelectorAll(".navbar ul a, .ham-nav ul a").forEach(function (link) {
      const text = (link.textContent || "").trim().toLowerCase();
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (text.includes("notes") || href.includes("notes.html") || href.includes("edunotes.html")) {
        link.href = toRoot("pages/edunotes.html");
        const item = link.querySelector("li");
        if (item) {
          item.textContent = "EduNotes";
        } else {
          link.textContent = "EduNotes";
        }
      }
    });
  }

  function injectNotesLinks() {
    document.querySelectorAll(".navbar ul, .ham-nav ul").forEach(function (navList) {
      ensureEduNotesLink(navList);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectStyles();
    normalizeInternalLinks();
    injectNotesLinks();
    updateEduNotesLinks();
    updateAccountNavigation();
    addBackButton();
  });
})();

