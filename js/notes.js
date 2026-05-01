(function () {
  function hamburgerMenu() {
    const hamNav = document.getElementById("ham-nav");
    if (!hamNav) {
      return;
    }

    hamNav.style.display = hamNav.style.display === "flex" ? "none" : "flex";
  }

  function getCustomNotes() {
    try {
      return JSON.parse(localStorage.getItem("edufunCustomNotes")) || [];
    } catch (error) {
      return [];
    }
  }

  function saveCustomNotes(notes) {
    localStorage.setItem("edufunCustomNotes", JSON.stringify(notes));
  }

  function buildSectionOptions(notes) {
    return Array.from(new Set(notes.map(function (note) {
      return note.section;
    }))).sort();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderSectionOptions(notes) {
    const select = document.getElementById("custom-note-section");
    if (!select) {
      return;
    }

    select.innerHTML = '<option value="">Choose a section</option>' + buildSectionOptions(notes)
      .map(function (section) {
        return '<option value="' + escapeHtml(section) + '">' + escapeHtml(section) + '</option>';
      })
      .join("");
  }

  function buildBuiltInCard(note) {
    return (
      '<article class="note-card" data-note-card="true">' +
        '<div class="note-tag">' + escapeHtml(note.section) + '</div>' +
        '<h3>' + escapeHtml(note.title) + '</h3>' +
        '<p class="note-summary">' + escapeHtml(note.summary) + '</p>' +
        '<div class="note-meta"><span>' + escapeHtml(note.level) + '</span><span>' + note.topics.length + ' topic blocks</span></div>' +
        '<a class="note-link" href="./note-detail.html?id=' + encodeURIComponent(note.id) + '">Open Notes</a>' +
      '</article>'
    );
  }

  function buildCustomCard(note) {
    return (
      '<article class="custom-note-card" data-note-card="true">' +
        '<div class="note-tag">' + escapeHtml(note.section) + '</div>' +
        '<h3>' + escapeHtml(note.title) + '</h3>' +
        '<p class="note-summary">' + escapeHtml(note.body.substring(0, 220)) + (note.body.length > 220 ? '...' : '') + '</p>' +
      '</article>'
    );
  }

  function groupBySection(notes) {
    return buildSectionOptions(notes).map(function (section) {
      return {
        section: section,
        items: notes.filter(function (note) {
          return note.section === section;
        })
      };
    });
  }

  function renderSectionsOverview(notes) {
    const sectionGrid = document.getElementById("notes-section-grid");
    const chipBar = document.getElementById("section-chip-bar");
    if (!sectionGrid || !chipBar) {
      return;
    }

    const grouped = groupBySection(notes);
    sectionGrid.innerHTML = grouped.map(function (group) {
      return (
        '<article class="section-card">' +
          '<h3>' + escapeHtml(group.section) + '</h3>' +
          '<p>' + group.items.length + ' built-in notes available in this section.</p>' +
        '</article>'
      );
    }).join("");

    chipBar.innerHTML = grouped.map(function (group) {
      return '<a class="chip-link" href="#section-' + encodeURIComponent(group.section) + '">' + escapeHtml(group.section) + '</a>';
    }).join("");
  }

  function renderSectionNotes(notes, query) {
    const container = document.getElementById("section-notes-container");
    if (!container) {
      return;
    }

    const normalizedQuery = (query || "").trim().toLowerCase();
    const grouped = groupBySection(notes).map(function (group) {
      const filteredItems = normalizedQuery
        ? group.items.filter(function (item) {
            const haystack = [item.section, item.title, item.summary, item.level]
              .concat(item.topics.map(function (topic) {
                return topic.heading + ' ' + topic.points.join(' ');
              }))
              .join(' ')
              .toLowerCase();
            return haystack.includes(normalizedQuery);
          })
        : group.items;

      return {
        section: group.section,
        items: filteredItems
      };
    }).filter(function (group) {
      return group.items.length > 0;
    });

    if (!grouped.length) {
      container.innerHTML = '<div class="empty-state">No built-in notes match this search yet. Try a broader keyword or add your own note below.</div>';
      return;
    }

    container.innerHTML = grouped.map(function (group) {
      return (
        '<section class="group-card" id="section-' + encodeURIComponent(group.section) + '">' +
          '<div class="group-header"><h3>' + escapeHtml(group.section) + '</h3><span class="group-count">' + group.items.length + ' matching notes</span></div>' +
          '<div class="note-grid">' + group.items.map(buildBuiltInCard).join("") + '</div>' +
        '</section>'
      );
    }).join("");
  }

  function renderCustomNotes(query) {
    const container = document.getElementById("custom-notes-container");
    if (!container) {
      return;
    }

    const notes = getCustomNotes();
    if (!notes.length) {
      container.innerHTML = '<div class="empty-state">No custom notes added yet. Use the form above to create section-wise notes.</div>';
      return;
    }

    const normalizedQuery = (query || "").trim().toLowerCase();
    const filtered = normalizedQuery
      ? notes.filter(function (note) {
          return [note.section, note.title, note.body].join(' ').toLowerCase().includes(normalizedQuery);
        })
      : notes;

    if (!filtered.length) {
      container.innerHTML = '<div class="empty-state">No custom notes match this search.</div>';
      return;
    }

    const grouped = buildSectionOptions(filtered).map(function (section) {
      return {
        section: section,
        items: filtered.filter(function (item) {
          return item.section === section;
        }).slice().reverse()
      };
    });

    container.innerHTML = grouped.map(function (group) {
      return (
        '<section class="group-card">' +
          '<div class="group-header"><h3>' + escapeHtml(group.section) + '</h3><span class="group-count">' + group.items.length + ' personal notes</span></div>' +
          '<div class="note-grid">' + group.items.map(buildCustomCard).join("") + '</div>' +
        '</section>'
      );
    }).join("");
  }

  function renderSearchResults(notes, query) {
    const panel = document.getElementById("search-results-panel");
    const summary = document.getElementById("search-results-summary");
    const grid = document.getElementById("search-results-grid");
    if (!panel || !summary || !grid) {
      return;
    }

    const normalizedQuery = (query || "").trim().toLowerCase();
    if (!normalizedQuery) {
      panel.classList.add("hidden");
      summary.textContent = "";
      grid.innerHTML = "";
      return;
    }

    const builtInMatches = notes.filter(function (item) {
      const haystack = [item.section, item.title, item.summary, item.level]
        .concat(item.topics.map(function (topic) {
          return topic.heading + ' ' + topic.points.join(' ');
        }))
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });

    const customMatches = getCustomNotes().filter(function (item) {
      return [item.section, item.title, item.body].join(' ').toLowerCase().includes(normalizedQuery);
    });

    const resultCards = builtInMatches.map(function (item) {
      return (
        '<article class="result-card">' +
          '<div class="note-tag">' + escapeHtml(item.section) + '</div>' +
          '<h3>' + escapeHtml(item.title) + '</h3>' +
          '<p>' + escapeHtml(item.summary) + '</p>' +
          '<a class="note-link" href="./note-detail.html?id=' + encodeURIComponent(item.id) + '">Open Notes</a>' +
        '</article>'
      );
    }).concat(customMatches.map(function (item) {
      return (
        '<article class="result-card">' +
          '<div class="note-tag">' + escapeHtml(item.section) + '</div>' +
          '<h3>' + escapeHtml(item.title) + '</h3>' +
          '<p>' + escapeHtml(item.body.substring(0, 220)) + (item.body.length > 220 ? '...' : '') + '</p>' +
        '</article>'
      );
    }));

    panel.classList.remove("hidden");
    summary.textContent = 'Found ' + resultCards.length + ' matching note result(s) for "' + query.trim() + '".';
    grid.innerHTML = resultCards.length ? resultCards.join("") : '<div class="empty-state">No notes matched this search.</div>';
  }

  function renderAll(notes, query) {
    renderSectionsOverview(notes);
    renderSectionNotes(notes, query);
    renderCustomNotes(query);
    renderSearchResults(notes, query);
  }

  function setupSearch(notes) {
    const searchInput = document.getElementById("notes-search");
    if (!searchInput) {
      return;
    }

    searchInput.addEventListener("input", function () {
      renderAll(notes, searchInput.value);
    });
  }

  function setupCustomNoteForm(notes) {
    const form = document.getElementById("custom-note-form");
    const message = document.getElementById("custom-note-message");
    const searchInput = document.getElementById("notes-search");

    if (!form) {
      return;
    }

    renderSectionOptions(notes);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const section = document.getElementById("custom-note-section").value.trim();
      const title = document.getElementById("custom-note-title").value.trim();
      const body = document.getElementById("custom-note-body").value.trim();

      if (!section || !title || !body) {
        if (message) {
          message.textContent = "Complete every field before saving your note.";
        }
        return;
      }

      const allNotes = getCustomNotes();
      allNotes.push({
        section: section,
        title: title,
        body: body,
        createdAt: new Date().toISOString()
      });
      saveCustomNotes(allNotes);
      form.reset();
      if (message) {
        message.textContent = "Your note has been added to this section.";
      }
      renderAll(notes, searchInput ? searchInput.value : "");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const notes = window.EduFunNotesLibrary || [];
    renderAll(notes, "");
    setupSearch(notes);
    setupCustomNoteForm(notes);
  });

  window.hamburgerMenu = hamburgerMenu;
})();
