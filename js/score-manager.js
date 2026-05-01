(function () {
  const STORAGE_KEY = "edufunScoreHistory";

  function getLoggedInUser() {
    return localStorage.getItem("loggedInUser") || "guest";
  }

  function getAllScores() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveAllScores(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  function saveScore(entry) {
    const scores = getAllScores();
    const savedEntry = {
      user: getLoggedInUser(),
      id: entry.id,
      title: entry.title,
      category: entry.category || "General",
      score: Number(entry.score) || 0,
      total: Number(entry.total) || 0,
      path: entry.path || window.location.pathname,
      playedAt: new Date().toISOString(),
    };

    scores.push(savedEntry);
    saveAllScores(scores);
    return savedEntry;
  }

  function getUserScores(userName) {
    const user = userName || getLoggedInUser();
    return getAllScores().filter(function (entry) {
      return entry.user === user;
    });
  }

  function getScoreSummary(userName) {
    const entries = getUserScores(userName);
    const byGame = {};

    entries.forEach(function (entry) {
      if (!byGame[entry.id]) {
        byGame[entry.id] = {
          id: entry.id,
          title: entry.title,
          category: entry.category,
          bestScore: entry.score,
          total: entry.total,
          attempts: 1,
          lastPlayedAt: entry.playedAt,
          lastScore: entry.score,
          path: entry.path,
        };
      } else {
        byGame[entry.id].attempts += 1;
        byGame[entry.id].lastPlayedAt = entry.playedAt;
        byGame[entry.id].lastScore = entry.score;
        byGame[entry.id].total = entry.total;

        if (entry.score > byGame[entry.id].bestScore) {
          byGame[entry.id].bestScore = entry.score;
        }
      }
    });

    return Object.values(byGame).sort(function (a, b) {
      return new Date(b.lastPlayedAt) - new Date(a.lastPlayedAt);
    });
  }

  window.EduFunScores = {
    saveScore: saveScore,
    getUserScores: getUserScores,
    getScoreSummary: getScoreSummary,
    getLoggedInUser: getLoggedInUser,
  };
})();
