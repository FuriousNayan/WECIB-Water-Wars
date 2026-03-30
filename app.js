// ================================================================
//  WECIB WATER WARS — APP LOGIC
//  Reads data from data.js and renders the dynamic sections.
// ================================================================

(function () {
  "use strict";

  function getTeam(id) {
    return TEAMS.find(function (t) { return t.id === id; });
  }

  function teamName(id) {
    var t = getTeam(id);
    return t ? t.name : null;
  }

  function getMatch(id) {
    return MATCHES.find(function (m) { return m.id === id; });
  }

  function activePlayers(team) {
    if (!team) return [];
    var benched = team.benched ? team.benched.split(",").map(function (s) { return s.trim(); }) : [];
    return team.players.filter(function (p) { return benched.indexOf(p.name) === -1; });
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  // ---------- Navbar ----------
  function initNavbar() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // ---------- Hero ----------
  function renderHero() {
    var sub = document.getElementById("heroSubtitle");
    if (sub) sub.textContent = TOURNAMENT.status + " \u2022 Week " + TOURNAMENT.currentWeek;

    var box = document.getElementById("announcements");
    if (!box) return;
    ANNOUNCEMENTS.forEach(function (text) {
      box.appendChild(el("span", "announcement-item", text));
    });
  }

  // ---------- Scoreboard ----------
  function renderScoreboard() {
    var sub = document.getElementById("scoreboardSub");
    var grid = document.getElementById("scoreboardGrid");
    if (!sub || !grid) return;

    sub.textContent = TOURNAMENT.status + " — Week " + TOURNAMENT.currentWeek;

    var currentMatches = MATCHES.filter(function (m) {
      return m.bracket === "winners" && m.round === TOURNAMENT.currentWeek;
    });
    if (currentMatches.length === 0) {
      currentMatches = MATCHES.filter(function (m) {
        return m.status === "in-progress";
      });
    }
    if (currentMatches.length === 0) {
      currentMatches = MATCHES.filter(function (m) {
        return m.bracket === "winners" && m.round === 1;
      });
    }

    currentMatches.forEach(function (match, idx) {
      var t1 = getTeam(match.team1);
      var t2 = getTeam(match.team2);
      if (!t1 || !t2) return;

      var t1Active = activePlayers(t1);
      var t2Active = activePlayers(t2);
      var t1Kills = t1Active.reduce(function (s, p) { return s + p.kills; }, 0);
      var t2Kills = t2Active.reduce(function (s, p) { return s + p.kills; }, 0);
      var t1Remaining = t1Active.filter(function (p) { return !p.eliminated; }).length;
      var t2Remaining = t2Active.filter(function (p) { return !p.eliminated; }).length;
      var t1Pts = t1Kills + t1Remaining;
      var t2Pts = t2Kills + t2Remaining;

      var statusLabel = match.status === "in-progress" ? "Live" : match.status === "completed" ? "Final" : "Upcoming";
      var t1Cls = match.winner === match.team1 ? " is-winner" : match.winner === match.team2 ? " is-loser" : "";
      var t2Cls = match.winner === match.team2 ? " is-winner" : match.winner === match.team1 ? " is-loser" : "";

      var elimHTML = "";
      var t1Elim = t1.players.filter(function (p) { return p.eliminated; });
      var t2Elim = t2.players.filter(function (p) { return p.eliminated; });
      var anyElim = t1Elim.length > 0 || t2Elim.length > 0;

      if (anyElim) {
        var events = "";
        t2Elim.forEach(function (p) {
          events += '<div class="sc-event"><div class="sc-dot"></div><div class="sc-body">' +
            '<div class="sc-text"><span class="victim">' + p.name + '</span> <span class="team-label">(' + t2.name + ')</span> was eliminated</div></div></div>';
        });
        t1Elim.forEach(function (p) {
          events += '<div class="sc-event"><div class="sc-dot"></div><div class="sc-body">' +
            '<div class="sc-text"><span class="victim">' + p.name + '</span> <span class="team-label">(' + t1.name + ')</span> was eliminated</div></div></div>';
        });
        elimHTML = '<div class="sc-elim-title">Eliminations</div><div class="sc-timeline">' + events + '</div>';
      } else {
        elimHTML = '<div class="sc-no-events">No eliminations yet</div>';
      }

      var card = el("div", "scoreboard-card");
      card.innerHTML =
        '<div class="scoreboard-card-header">' +
          '<span class="scoreboard-card-label">' + match.label + '</span>' +
          '<span class="sc-status ' + match.status + '">' + statusLabel + '</span>' +
        '</div>' +
        '<div class="scoreboard-score-row">' +
          '<div class="sc-team-side' + t1Cls + '">' +
            '<span class="sc-team-name">' + t1.name + '</span>' +
            '<span class="sc-team-pts">' + t1Pts + '</span>' +
            '<span class="sc-team-pts-label">Points</span>' +
          '</div>' +
          '<div class="sc-vs">VS</div>' +
          '<div class="sc-team-side' + t2Cls + '">' +
            '<span class="sc-team-name">' + t2.name + '</span>' +
            '<span class="sc-team-pts">' + t2Pts + '</span>' +
            '<span class="sc-team-pts-label">Points</span>' +
          '</div>' +
        '</div>' +
        '<div class="sc-details">' +
          '<div class="sc-breakdown">' +
            '<div class="sc-col"><div class="sc-col-title">' + t1.name + '</div>' +
              '<div class="sc-row"><span>Kills</span><span class="sc-val kills">' + t1Kills + '</span></div>' +
              '<div class="sc-row"><span>Remaining</span><span class="sc-val remaining">' + t1Remaining + '/' + t1Active.length + '</span></div>' +
              '<div class="sc-row"><span>Benched</span><span class="sc-val benched">' + (t1.benched || '—') + '</span></div>' +
            '</div>' +
            '<div class="sc-col"><div class="sc-col-title">' + t2.name + '</div>' +
              '<div class="sc-row"><span>Kills</span><span class="sc-val kills">' + t2Kills + '</span></div>' +
              '<div class="sc-row"><span>Remaining</span><span class="sc-val remaining">' + t2Remaining + '/' + t2Active.length + '</span></div>' +
              '<div class="sc-row"><span>Benched</span><span class="sc-val benched">' + (t2.benched || '—') + '</span></div>' +
            '</div>' +
          '</div>' +
          elimHTML +
        '</div>';

      grid.appendChild(card);
    });
  }

  // ---------- Bracket ----------
  function renderBracket() {
    var container = document.getElementById("bracketContent");
    if (!container) return;

    ["winners", "losers"].forEach(function (key) {
      var cfg = BRACKET_STRUCTURE[key];
      var wrapper = el("div", "bracket-wrapper" + (key === "losers" ? " hidden" : ""));
      wrapper.setAttribute("data-bracket", key);

      var scroll = el("div", "bracket-scroll");
      var view = el("div", "bracket-view" + (key === "losers" ? " losers-bracket" : ""));

      cfg.rounds.forEach(function (round) {
        var col = el("div", "bracket-round" + (round.headerOnly ? " header-only" : ""));
        col.appendChild(el("div", "round-label", round.label));
        if (round.dates) {
          col.appendChild(el("div", "round-dates", round.dates));
        }

        if (round.headerOnly) {
          view.appendChild(col);
          return;
        }

        var matchesWrap = el("div", "round-matches");
        if (round.underConstruction) {
          var placeholder = el("div", "match-card under-construction");
          placeholder.innerHTML = '<div class="match-label">TBD</div>' +
            '<div class="uc-icon">\u{1F6A7}</div>' +
            '<div class="uc-text">Under Construction</div>';
          matchesWrap.appendChild(placeholder);
        } else {
          round.matchIds.forEach(function (matchId) {
            matchesWrap.appendChild(buildMatchCard(getMatch(matchId)));
          });
        }
        col.appendChild(matchesWrap);
        view.appendChild(col);
      });

      scroll.appendChild(view);
      wrapper.appendChild(scroll);
      container.appendChild(wrapper);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          drawConnectors(view, cfg.connections);
        });
      });
    });
  }

  function initBracketTabs() {
    var tabs = document.querySelectorAll(".bracket-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var target = tab.getAttribute("data-bracket");
        document.querySelectorAll(".bracket-wrapper").forEach(function (w) {
          w.classList.toggle("hidden", w.getAttribute("data-bracket") !== target);
        });
        redrawConnectors();
      });
    });
  }

  function buildMatchCard(match) {
    var card = el("div", "match-card " + match.status);
    card.setAttribute("data-match-id", match.id);
    card.appendChild(el("div", "match-label", match.label));
    card.appendChild(buildTeamRow(match, "team1"));
    card.appendChild(buildTeamRow(match, "team2"));
    if (match.team3 !== undefined) {
      card.appendChild(buildTeamRow(match, "team3"));
    }
    return card;
  }

  function buildTeamRow(match, side) {
    var teamId = match[side];
    var score = match[side + "Score"];
    var placeholder = match[side + "Placeholder"] || "TBD";
    var name = teamName(teamId);

    var isWinner = match.winner && match.winner === teamId;
    var isLoser = match.winner && match.winner !== teamId;

    var rowCls = "match-team";
    if (isWinner) rowCls += " winner";
    else if (isLoser) rowCls += " loser";

    var row = el("div", rowCls);
    var nameEl = el("span", "match-team-name" + (name ? "" : " placeholder"));
    nameEl.textContent = name || placeholder;
    row.appendChild(nameEl);

    var scoreEl = el("span", "match-team-score");
    scoreEl.textContent = score !== null && score !== undefined ? score : "\u2013";
    row.appendChild(scoreEl);

    return row;
  }

  // ---------- SVG Connectors ----------
  function drawConnectors(view, connections) {
    var existing = view.querySelector(".bracket-connectors");
    if (existing) existing.remove();

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "bracket-connectors");
    svg.setAttribute("width", view.scrollWidth);
    svg.setAttribute("height", view.scrollHeight);

    var viewRect = view.getBoundingClientRect();

    connections.forEach(function (conn) {
      var fromCards = conn.from.map(function (id) {
        return view.querySelector('[data-match-id="' + id + '"]');
      }).filter(Boolean);
      var toCard = view.querySelector('[data-match-id="' + conn.to + '"]');
      if (!fromCards.length || !toCard) return;

      var fromRects = fromCards.map(function (c) {
        var r = c.getBoundingClientRect();
        return { x: r.right - viewRect.left, y: r.top + r.height / 2 - viewRect.top };
      });

      var toRect = toCard.getBoundingClientRect();
      var toX = toRect.left - viewRect.left;
      var toY = toRect.top + toRect.height / 2 - viewRect.top;
      var rightmostX = Math.max.apply(null, fromRects.map(function (r) { return r.x; }));
      var midX = (rightmostX + toX) / 2;
      var d = "";

      fromRects.forEach(function (from) {
        d += "M " + from.x + " " + from.y + " H " + midX + " ";
      });

      if (fromRects.length > 1) {
        var ys = fromRects.map(function (r) { return r.y; });
        d += "M " + midX + " " + Math.min.apply(null, ys) + " V " + Math.max.apply(null, ys) + " ";
      }

      if (fromRects.length === 1 && fromRects[0].y !== toY) {
        d += "M " + midX + " " + fromRects[0].y + " V " + toY + " ";
      }

      d += "M " + midX + " " + toY + " H " + toX;

      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "rgba(0, 119, 182, 0.35)");
      path.setAttribute("stroke-width", "2");
      svg.appendChild(path);
    });

    view.appendChild(svg);
  }

  function redrawConnectors() {
    document.querySelectorAll(".bracket-connectors").forEach(function (s) { s.remove(); });
    document.querySelectorAll(".bracket-view").forEach(function (view) {
      if (view.closest(".bracket-wrapper.hidden")) return;
      var isLosers = view.classList.contains("losers-bracket");
      drawConnectors(view, BRACKET_STRUCTURE[isLosers ? "losers" : "winners"].connections);
    });
  }

  // ---------- Teams ----------
  function renderTeams() {
    var grid = document.getElementById("teamsGrid");
    if (!grid) return;

    TEAMS.forEach(function (team) {
      var stats = computeTeamStats(team.id);
      var card = el("div", "team-card" + (stats.isEliminated ? " eliminated-team" : ""));

      var header = el("div", "team-card-header");
      header.appendChild(el("span", "team-card-name", team.name));
      header.appendChild(el("span", "team-card-record", stats.wins + "-" + stats.losses));
      card.appendChild(header);

      var players = el("div", "team-card-players");
      team.players.forEach(function (p) {
        var row = el("div", "player-row");
        var info = el("div", "player-info");
        info.appendChild(el("span", "player-status " + (p.eliminated ? "eliminated" : "active")));
        var nameEl = el("span", "player-name" + (p.eliminated ? " is-eliminated" : ""));
        nameEl.textContent = p.name;
        info.appendChild(nameEl);
        row.appendChild(info);
        row.appendChild(el("span", "player-kills", p.kills + " kill" + (p.kills !== 1 ? "s" : "")));
        players.appendChild(row);
      });
      card.appendChild(players);

      var footer = el("div", "team-card-footer");
      footer.innerHTML =
        '<span>Total Kills: <span class="team-stat-value">' + stats.totalKills + "</span></span>" +
        '<span>Points: <span class="team-stat-value">' + stats.totalPoints + "</span></span>";
      card.appendChild(footer);

      grid.appendChild(card);
    });
  }

  function computeTeamStats(teamId) {
    var wins = 0, losses = 0, totalPoints = 0;

    MATCHES.forEach(function (m) {
      if (m.status !== "completed") return;
      if (m.team1 !== teamId && m.team2 !== teamId) return;
      if (m.winner === teamId) wins++;
      else if (m.winner) losses++;
      if (m.team1 === teamId && m.team1Score != null) totalPoints += m.team1Score;
      if (m.team2 === teamId && m.team2Score != null) totalPoints += m.team2Score;
    });

    var team = getTeam(teamId);
    var totalKills = 0;
    if (team) team.players.forEach(function (p) { totalKills += p.kills; });

    return { wins: wins, losses: losses, totalKills: totalKills, totalPoints: totalPoints, isEliminated: losses >= 2 };
  }

  // ---------- Leaderboard ----------
  function renderLeaderboard() {
    var wrapper = document.getElementById("leaderboardWrapper");
    if (!wrapper) return;

    var players = [];
    TEAMS.forEach(function (team) {
      team.players.forEach(function (p) {
        players.push({ name: p.name, team: team.name, kills: p.kills });
      });
    });

    players = players.filter(function (p) { return p.kills > 0; });
    players.sort(function (a, b) {
      return b.kills - a.kills || a.name.localeCompare(b.name);
    });

    var MAX = 5;
    var header = el("div", "lb-header");
    header.innerHTML = "<span>#</span><span>Player</span><span>Team</span><span>Kills</span>";
    wrapper.appendChild(header);

    for (var i = 0; i < MAX; i++) {
      var row = el("div", "lb-row");
      if (i < players.length) {
        var p = players[i];
        var rankCls = "lb-rank";
        if (i === 0) rankCls += " top-1";
        else if (i === 1) rankCls += " top-2";
        else if (i === 2) rankCls += " top-3";

        row.innerHTML =
          '<span class="' + rankCls + '">' + (i + 1) + "</span>" +
          '<span class="lb-name">' + p.name + "</span>" +
          '<span class="lb-team">' + p.team + "</span>" +
          '<span class="lb-kills">' + p.kills + "</span>";
      } else {
        row.innerHTML =
          '<span class="lb-rank">' + (i + 1) + "</span>" +
          '<span class="lb-name lb-empty">—</span>' +
          '<span class="lb-team"></span>' +
          '<span class="lb-kills">0</span>';
      }
      wrapper.appendChild(row);
    }
  }

  // ---------- Reels ----------
  function renderReels() {
    var grid = document.getElementById("reelsGrid");
    if (!grid || typeof REELS === "undefined" || REELS.length === 0) return;

    grid.innerHTML = "";

    REELS.slice().reverse().forEach(function (reel) {
      var card = el("div", "reel-card");
      var video = document.createElement("video");
      video.className = "reel-video";
      video.src = reel.src + "#t=0.001";
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      if (reel.landscape) video.classList.add("reel-video-landscape");
      card.appendChild(video);

      var info = el("div", "reel-info");
      info.innerHTML =
        '<div class="reel-title">' + reel.title + '</div>' +
        '<div class="reel-week">Week ' + reel.week + '</div>';
      card.appendChild(info);

      grid.appendChild(card);
    });
  }

  // ---------- Scroll Animations ----------
  function initScrollAnimations() {
    var targets = document.querySelectorAll(".section-title, .team-card, .reel-card, .rules-card, .leaderboard-wrapper");
    targets.forEach(function (el) { el.classList.add("fade-in"); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.1 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  // ---------- Resize ----------
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(redrawConnectors, 150);
  });

  // ---------- Purge Day Overlay ----------
  function initPurgeOverlay() {
    if (typeof PURGE_DAY === "undefined" || !PURGE_DAY.active) return;

    var overlay = document.getElementById("purgeOverlay");
    var rulesEl = document.getElementById("purgeRules");
    var dismiss = document.getElementById("purgeDismiss");
    if (!overlay || !rulesEl || !dismiss) return;

    PURGE_DAY.rules.forEach(function (rule) {
      var li = el("li", null, rule);
      rulesEl.appendChild(li);
    });

    var siren = new Audio("sounds/purgeSiren.mp3");
    siren.loop = true;

    var purgeContent = document.getElementById("purgeContent");
    purgeContent.style.display = "none";

    var gate = el("div", "purge-gate");
    gate.innerHTML = '<span class="purge-gate-text">CLICK TO ENTER</span>';
    overlay.appendChild(gate);

    document.body.style.overflow = "hidden";
    overlay.classList.add("active");

    gate.addEventListener("click", function () {
      siren.play();
      gate.remove();
      purgeContent.style.display = "";
    });

    dismiss.addEventListener("click", function () {
      siren.pause();
      siren.currentTime = 0;
      overlay.classList.add("hiding");
      document.body.style.overflow = "";
      setTimeout(function () {
        overlay.remove();
      }, 500);
    });
  }

  // ---------- Init ----------
  function init() {
    initPurgeOverlay();
    initNavbar();
    renderHero();
    renderScoreboard();
    renderBracket();
    initBracketTabs();
    renderLeaderboard();
    renderReels();
    renderTeams();
    initScrollAnimations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
