const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const seedState = {
  currentUserId: "u1",
  cart: null,
  users: [
    {
      id: "u1",
      role: "gamer",
      name: "User",
      game: "Arena Of Valor",
      rank: "Diamond",
      goal: "Rank push",
      premium: false,
      trustScore: 90,
    },
    {
      id: "u2",
      role: "creator",
      name: "Neon Phantom",
      game: "FreeFire",
      rank: "Master",
      goal: "Highlight creator",
      premium: true,
      trustScore: 96,
    },
    {
      id: "u3",
      role: "shop",
      name: "Axiom Vault",
      game: "Valorant",
      rank: "Platinum",
      goal: "Review shop/account",
      premium: false,
      trustScore: 84,
    },
    {
      id: "u4",
      role: "admin",
      name: "TrustOps Admin",
      game: "Arena Of Valor",
      rank: "Master",
      goal: "Community tournament",
      premium: true,
      trustScore: 99,
    },
  ],
  posts: [
    {
      id: "p1",
      authorId: "u2",
      type: "highlight",
      content: "Clutch 1v3 in ranked finals. Looking for a duo and editor for tonight.",
      likes: 18,
      comments: ["Clip is clean. Pin it to profile."],
      sponsored: false,
    },
    {
      id: "p2",
      authorId: "u3",
      type: "review",
      content: "Axiom Vault seller package is live: escrow protected, video proof, refund rules.",
      likes: 9,
      comments: ["Does this include dispute support?"],
      sponsored: true,
    },
  ],
  sponsors: [
    {
      id: "s1",
      shop: "Axiom Vault",
      title: "Pinned marketplace broker post - 7 days",
      price: 99,
      status: "Running",
    },
    {
      id: "s2",
      shop: "Arena Campus",
      title: "Grassroots tournament banner",
      price: 149,
      status: "Pending",
    },
  ],
  transactions: [
    {
      id: "t1",
      user: "Neon Phantom",
      item: "Creator Boost Monthly",
      amount: 79,
      method: "GameTrust Wallet",
      time: "Seed",
    },
    {
      id: "t2",
      user: "Axiom Vault",
      item: "Pinned Shop Ad",
      amount: 99,
      method: "MoMo sandbox",
      time: "Seed",
    },
  ],
};

const listings = [
  {
    id: "l1",
    title: "FreeFire",
    server: "NA - Axiom_V",
    badge: "Radiant",
    code: "VAL",
    wins: "1,842",
    skins: "143",
    level: "287",
    trust: "9.8/10",
    price: 249,
    accent: "#ff3d48",
  },
  {
    id: "l2",
    title: "FreeFire",
    server: "EU - Nullshift",
    badge: "Global Elite",
    code: "CS2",
    wins: "3,120",
    skins: "212",
    level: "40",
    trust: "9.6/10",
    price: 189.5,
    accent: "#ffd400",
  },
  {
    id: "l3",
    title: "Arena Of Valor",
    server: "FR - Crawler",
    badge: "Challenger",
    code: "LEA",
    wins: "2,341",
    skins: "89",
    level: "312",
    trust: "9.9/10",
    price: 314,
    accent: "#ffd400",
  },
  {
    id: "l4",
    title: "Arena Of Valor",
    server: "AS - Vector_X",
    badge: "Predator",
    code: "APE",
    wins: "4,102",
    skins: "67",
    level: "500",
    trust: "9.5/10",
    price: 134.99,
    accent: "#ff3d48",
  },
  {
    id: "l5",
    title: "FreeFire",
    server: "NA - Axiom_W",
    badge: "Top 500",
    code: "OVE",
    wins: "1,567",
    skins: "201",
    level: "198",
    trust: "9.7/10",
    price: 299,
    accent: "#ffd400",
  },
  {
    id: "l6",
    title: "FreeFire",
    server: "EU - Nullshift",
    badge: "Champion",
    code: "FOR",
    wins: "2,891",
    skins: "334",
    level: "452",
    trust: "9.4/10",
    price: 159,
    accent: "#00f6ff",
  },
];

const plans = [
  {
    id: "premium-gamer",
    name: "Premium Gamer",
    price: 49,
    desc: "Profile badge, priority team matching and trophy display.",
    buyerRoles: ["gamer", "creator"],
  },
  {
    id: "creator-boost",
    name: "Creator Boost",
    price: 79,
    desc: "Boost highlights on social feed and unlock engagement analytics.",
    buyerRoles: ["creator", "gamer"],
  },
  {
    id: "shop-pin",
    name: "Shop / Pinned Ad",
    price: 99,
    desc: "Pinned marketplace post for verified seller or game shop.",
    buyerRoles: ["shop", "admin"],
  },
];

let state = loadState();
migrateState();

function loadState() {
  const raw = localStorage.getItem("gametrust-mvp-state");
  if (!raw) return structuredClone(seedState);
  try {
    return { ...structuredClone(seedState), ...JSON.parse(raw) };
  } catch {
    return structuredClone(seedState);
  }
}

function migrateState() {
  const validGames = ["Arena Of Valor", "FreeFire", "Valorant", "League Of Legends"];
  const validGoals = ["Rank push", "Casual squad", "Community tournament", "Highlight creator", "Review shop/account"];
  state.users.forEach((user, index) => {
    if (!validGames.includes(user.game)) user.game = seedState.users[index]?.game || "Arena Of Valor";
    if (!validGoals.includes(user.goal)) user.goal = seedState.users[index]?.goal || "Rank push";
    if (typeof user.trustScore !== "number") user.trustScore = calculateTrustScore(user);
  });
  saveState();
}

function saveState() {
  localStorage.setItem("gametrust-mvp-state", JSON.stringify(state));
}

function currentUser() {
  return state.users.find((user) => user.id === state.currentUserId) || state.users[0];
}

function byId(id) {
  return document.getElementById(id);
}

function showToast(message) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

function formatAmount(value) {
  return money.format(value);
}

function calculateTrustScore(user) {
  const rankScore = {
    Gold: 58,
    Platinum: 68,
    Diamond: 82,
    Master: 90,
    Challenger: 96,
  }[user.rank] || 60;
  const roleBonus = user.role === "shop" ? 4 : user.role === "creator" ? 3 : 0;
  const premiumBonus = user.premium ? 5 : 0;
  return Math.min(99, rankScore + roleBonus + premiumBonus);
}

function renderAll() {
  renderSession();
  renderTopMetrics();
  renderProfile();
  renderFeed();
  renderListings();
  renderPlans();
  renderSponsors();
  renderCart();
  renderAdmin();
}

function renderSession() {
  const user = currentUser();
  byId("roleSelect").value = user.role;
  byId("sessionLabel").textContent = `${user.name} / ${labelRole(user.role)} / Trust ${user.trustScore}`;
}

function labelRole(role) {
  return {
    gamer: "Gamer",
    creator: "Creator",
    shop: "Shop",
    admin: "Admin",
  }[role] || role;
}

function renderTopMetrics() {
  const revenue = state.transactions.reduce((sum, tx) => sum + tx.amount, 0);
  byId("totalRevenue").textContent = formatAmount(revenue);
  byId("activeUsers").textContent = `${state.users.length}K`;
  byId("premiumUsers").textContent = state.users.filter((user) => user.premium).length;
  byId("feedCount").textContent = state.posts.length;
  byId("matchCount").textContent = getMatches().length;
  byId("sponsorCount").textContent = state.posts.filter((post) => post.sponsored).length + state.sponsors.length;
  byId("transactionCount").textContent = state.transactions.length;
}

function renderProfile() {
  const user = currentUser();
  byId("displayName").value = user.name;
  byId("mainGame").value = user.game;
  byId("rank").value = user.rank;
  byId("goal").value = user.goal;
  byId("profileTitle").textContent = user.name;
  byId("profileTrustScore").textContent = (user.trustScore / 10).toFixed(1);

  byId("profilePreview").innerHTML = `
    <dl>
      <dt>Name</dt><dd>${escapeHtml(user.name)}</dd>
      <dt>Role</dt><dd>${labelRole(user.role)}</dd>
      <dt>Game</dt><dd>${escapeHtml(user.game)}</dd>
      <dt>Rank</dt><dd>${escapeHtml(user.rank)}</dd>
      <dt>Goal</dt><dd>${escapeHtml(user.goal)}</dd>
      <dt>Trust Score</dt><dd>${user.trustScore}/100</dd>
      <dt>Package</dt><dd>${user.premium ? '<span class="badge premium">Premium</span>' : "Free"}</dd>
    </dl>
  `;
}

function renderFeed() {
  const list = byId("feedList");
  list.innerHTML = state.posts
    .map((post) => {
      const author = state.users.find((user) => user.id === post.authorId) || currentUser();
      const comments = post.comments.map((comment) => `<li>${escapeHtml(comment)}</li>`).join("");
      return `
        <article class="feed-item">
          <div class="feed-meta">
            <span>${escapeHtml(author.name)} / ${labelRole(author.role)} / ${post.type}</span>
            ${post.sponsored ? '<span class="badge premium">Pinned</span>' : ""}
          </div>
          <p>${escapeHtml(post.content)}</p>
          <div class="actions">
            <button class="secondary" data-like="${post.id}">Like (${post.likes})</button>
            <button class="secondary" data-comment="${post.id}">Comment</button>
            ${currentUser().role === "shop" || currentUser().role === "admin" ? `<button class="secondary" data-sponsor="${post.id}">Buy Pin</button>` : ""}
          </div>
          <ul>${comments}</ul>
        </article>
      `;
    })
    .join("");
}

function renderListings() {
  byId("listingGrid").innerHTML = listings
    .map(
      (listing) => `
        <article class="listing-card" style="--accent-line: ${listing.accent}">
          <div class="listing-top">
            <div>
              <h3>${escapeHtml(listing.title)}</h3>
              <small>${escapeHtml(listing.server)}</small>
            </div>
            <span class="rating">* ${listing.trust}</span>
          </div>
          <div class="account-art">
            <span>${escapeHtml(listing.code)}</span>
          </div>
          <span class="chip amber">${escapeHtml(listing.badge)}</span>
          <div class="listing-data">
            <div><small>Wins</small><strong>${listing.wins}</strong></div>
            <div><small>Skins</small><strong>${listing.skins}</strong></div>
            <div><small>Lvl</small><strong>${listing.level}</strong></div>
          </div>
          <div class="listing-bottom">
            <div>
              <small>Escrow protected</small>
              <div class="escrow-price">${formatAmount(listing.price)}</div>
            </div>
            <button class="secondary" data-listing-buy="${listing.id}">Buy</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function getMatches() {
  const user = currentUser();
  return state.users
    .filter((candidate) => candidate.id !== user.id && candidate.role !== "admin")
    .map((candidate) => {
      let score = 35;
      if (candidate.game === user.game) score += 30;
      if (candidate.rank === user.rank) score += 20;
      if (candidate.goal === user.goal) score += 15;
      if (candidate.premium) score += 5;
      return { ...candidate, matchScore: Math.min(100, score) };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

function renderMatching() {
  const results = byId("matchingResults");
  const matches = getMatches();
  results.innerHTML = matches
    .map(
      (match) => `
        <article class="match-card">
          <h3>${escapeHtml(match.name)}</h3>
          <p>${escapeHtml(match.game)} / ${escapeHtml(match.rank)} / ${escapeHtml(match.goal)}</p>
          <span class="badge ${match.matchScore >= 70 ? "good" : "risk"}">${match.matchScore}% match</span>
          <button class="secondary" data-invite="${match.id}">Invite</button>
        </article>
      `,
    )
    .join("");
}

function renderPlans() {
  const user = currentUser();
  byId("plans").innerHTML = plans
    .map((plan) => {
      const allowed = plan.buyerRoles.includes(user.role);
      return `
        <article class="plan-card">
          <p class="section-code">Revenue stream</p>
          <h2>${plan.name}</h2>
          <p>${plan.desc}</p>
          <div class="price">${formatAmount(plan.price)}</div>
          <button class="primary" data-buy="${plan.id}" ${allowed ? "" : "disabled"}>${allowed ? "Select Package" : "Role Locked"}</button>
        </article>
      `;
    })
    .join("");
}

function renderSponsors() {
  byId("sponsorList").innerHTML = state.sponsors
    .map(
      (sponsor) => `
        <article class="sponsor-card">
          <div class="feed-meta">
            <strong>${escapeHtml(sponsor.shop)}</strong>
            <span>${escapeHtml(sponsor.status)}</span>
          </div>
          <p>${escapeHtml(sponsor.title)}</p>
          <span class="badge premium">${formatAmount(sponsor.price)}</span>
        </article>
      `,
    )
    .join("");
}

function renderCart() {
  const cart = state.cart;
  byId("cartBox").innerHTML = cart
    ? `
      <div class="cart-row">
        <div>
          <h3>${escapeHtml(cart.name)}</h3>
          <p>${escapeHtml(cart.desc)}</p>
        </div>
        <strong class="price">${formatAmount(cart.price)}</strong>
      </div>
    `
    : "<p>No package selected. Choose a premium plan, pinned ad, or marketplace account.</p>";
}

function renderAdmin() {
  const revenue = state.transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const engagement = state.posts.reduce((sum, post) => sum + post.likes + post.comments.length, 0);
  byId("adminRevenue").textContent = formatAmount(revenue);
  byId("adminUsers").textContent = state.users.length;
  byId("adminEngagement").textContent = engagement;
  byId("adminArpu").textContent = formatAmount(Math.round(revenue / Math.max(1, state.users.length)));

  byId("transactionLog").innerHTML = state.transactions
    .slice()
    .reverse()
    .map(
      (tx) => `
        <div class="log-item">
          <strong>${escapeHtml(tx.item)}</strong>
          <p>${escapeHtml(tx.user)} / ${escapeHtml(tx.method)} / ${escapeHtml(tx.time)}</p>
          <span class="badge good">${formatAmount(tx.amount)}</span>
        </div>
      `,
    )
    .join("");

  byId("moderationList").innerHTML = state.posts
    .map((post) => {
      const author = state.users.find((user) => user.id === post.authorId) || currentUser();
      return `
        <div class="log-item">
          <strong>${escapeHtml(author.name)}</strong>
          <p>${escapeHtml(post.content)}</p>
          <span class="badge ${post.sponsored ? "premium" : "good"}">${post.sponsored ? "Sponsored" : "Organic"}</span>
        </div>
      `;
    })
    .join("");
}

function setView(viewId) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.view === viewId));
  if (viewId === "matching") renderMatching();
}

function buyPlan(planId) {
  const plan = plans.find((item) => item.id === planId);
  if (!plan) return;
  state.cart = plan;
  saveState();
  renderAll();
  setView("checkout");
  showToast(`${plan.name} added to escrow checkout.`);
}

function buyListing(listingId) {
  const listing = listings.find((item) => item.id === listingId);
  if (!listing) return;
  state.cart = {
    id: `listing-${listing.id}`,
    name: `${listing.title} account / ${listing.badge}`,
    price: listing.price,
    desc: `Escrow protected account, trust score ${listing.trust}, server ${listing.server}.`,
  };
  saveState();
  renderAll();
  setView("checkout");
  showToast("Marketplace listing added to escrow checkout.");
}

function completeCheckout(event) {
  event.preventDefault();
  if (!state.cart) {
    showToast("Cart is empty.");
    return;
  }
  const user = currentUser();
  const method = byId("paymentMethod").value;
  const transaction = {
    id: `t${Date.now()}`,
    user: user.name,
    item: state.cart.name,
    amount: state.cart.price,
    method,
    time: new Date().toLocaleString("en-US"),
  };

  state.transactions.push(transaction);
  if (state.cart.id.includes("premium") || state.cart.id.includes("creator")) {
    user.premium = true;
    user.trustScore = calculateTrustScore(user);
  }
  if (state.cart.id === "shop-pin") {
    state.sponsors.push({
      id: `s${Date.now()}`,
      shop: user.name,
      title: "New pinned shop placement",
      price: state.cart.price,
      status: "Running",
    });
  }
  state.cart = null;
  saveState();
  renderAll();
  setView("admin");
  showToast("Payment complete. Revenue and admin dashboard updated.");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const jump = target.dataset.jump;
  if (jump) setView(jump);

  if (target.matches(".nav-btn")) {
    setView(target.dataset.view);
  }

  if (target.dataset.buy) {
    buyPlan(target.dataset.buy);
  }

  if (target.dataset.listingBuy) {
    buyListing(target.dataset.listingBuy);
  }

  if (target.dataset.like) {
    const post = state.posts.find((item) => item.id === target.dataset.like);
    if (post) post.likes += 1;
    saveState();
    renderAll();
  }

  if (target.dataset.comment) {
    const post = state.posts.find((item) => item.id === target.dataset.comment);
    if (post) post.comments.push(`${currentUser().name}: Interested. Invite me to squad.`);
    saveState();
    renderAll();
  }

  if (target.dataset.sponsor) {
    const post = state.posts.find((item) => item.id === target.dataset.sponsor);
    if (post) post.sponsored = true;
    buyPlan("shop-pin");
  }

  if (target.dataset.invite) {
    const candidate = state.users.find((user) => user.id === target.dataset.invite);
    showToast(`Team invite sent to ${candidate?.name || "player"}.`);
  }
});

byId("loginBtn").addEventListener("click", () => {
  const role = byId("roleSelect").value;
  const user = state.users.find((item) => item.role === role);
  if (user) state.currentUserId = user.id;
  saveState();
  renderAll();
  showToast(`Identity switched to ${labelRole(role)}.`);
});

byId("profileForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const user = currentUser();
  user.name = byId("displayName").value.trim() || user.name;
  user.game = byId("mainGame").value;
  user.rank = byId("rank").value;
  user.goal = byId("goal").value;
  user.trustScore = calculateTrustScore(user);
  saveState();
  renderAll();
  showToast("Gamer profile saved. Trust Score recalculated.");
});

byId("postForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const content = byId("postContent").value.trim();
  if (!content) return;
  state.posts.unshift({
    id: `p${Date.now()}`,
    authorId: currentUser().id,
    type: byId("postType").value,
    content,
    likes: 0,
    comments: [],
    sponsored: false,
  });
  byId("postContent").value = "";
  saveState();
  renderAll();
  showToast("Post published to the social feed.");
});

byId("runMatchingBtn").addEventListener("click", () => {
  renderMatching();
  showToast("Matching scores recalculated from current profile.");
});

byId("checkoutForm").addEventListener("submit", completeCheckout);

renderAll();
