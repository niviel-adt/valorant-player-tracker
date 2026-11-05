"use client";

import { useMemo, useState } from "react";

type Match = {
  map: string; mode: string; result: "VICTORY" | "DEFEAT"; score: string;
  agent: string; k: number; d: number; a: number; acs: number; rr: string; when: string;
};

const matches: Match[] = [
  {map:"Ascent",mode:"Competitive",result:"VICTORY",score:"13 : 8",agent:"Jett",k:24,d:15,a:6,acs:286,rr:"+21 RR",when:"18 min ago"},
  {map:"Haven",mode:"Competitive",result:"VICTORY",score:"13 : 10",agent:"Jett",k:21,d:17,a:9,acs:241,rr:"+18 RR",when:"2 hours ago"},
  {map:"Lotus",mode:"Competitive",result:"DEFEAT",score:"9 : 13",agent:"Omen",k:16,d:18,a:11,acs:198,rr:"-17 RR",when:"Yesterday"},
  {map:"Bind",mode:"Competitive",result:"VICTORY",score:"13 : 6",agent:"Reyna",k:25,d:12,a:3,acs:321,rr:"+24 RR",when:"Yesterday"},
  {map:"Sunset",mode:"Competitive",result:"DEFEAT",score:"11 : 13",agent:"Clove",k:19,d:20,a:8,acs:227,rr:"-19 RR",when:"2 days ago"},
  {map:"Split",mode:"Competitive",result:"VICTORY",score:"13 : 7",agent:"Jett",k:22,d:14,a:5,acs:269,rr:"+20 RR",when:"2 days ago"}
];
const agents = [
  {name:"Jett",role:"DUELIST",games:18,win:66,kd:"1.42",color:"blue"},
  {name:"Omen",role:"CONTROLLER",games:12,win:58,kd:"1.18",color:"purple"},
  {name:"Reyna",role:"DUELIST",games:9,win:56,kd:"1.31",color:"pink"},
  {name:"Clove",role:"CONTROLLER",games:7,win:57,kd:"1.09",color:"green"}
];
const maps = [
  {name:"Ascent",games:12,win:75,kd:"1.36"},
  {name:"Haven",games:10,win:60,kd:"1.22"},
  {name:"Bind",games:9,win:56,kd:"1.16"},
  {name:"Lotus",games:8,win:38,kd:"0.91"}
];
const demoProfiles = ["Demo#APAC","RadiantSample#001","ClutchTest#777"];

export default function Home() {
  const [query,setQuery] = useState("Demo#APAC");
  const [player,setPlayer] = useState("Demo#APAC");
  const [activeTab,setActiveTab] = useState("Overview");
  const [filter,setFilter] = useState("ALL");
  const [notice,setNotice] = useState("");
  const visibleMatches = useMemo(() => filter === "ALL" ? matches : matches.filter((m) => m.result === filter),[filter]);

  function searchPlayer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleaned = query.trim();
    if (!cleaned) return;
    setPlayer(cleaned);
    setNotice(demoProfiles.includes(cleaned) ? "Loaded an included sample profile." : "Showing the demo profile layout for this search. Statistics are illustrative, not live player records.");
    setActiveTab("Overview");
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Tracker home"><span className="brand-mark">V</span><span>VALORANT<span className="brand-light"> TRACKER</span></span></a>
        <nav className="top-nav"><a className="nav-active" href="#overview">PLAYER</a><a href="#matches">MATCHES</a><a href="#agents">AGENTS</a><a href="#maps">MAPS</a></nav>
        <div className="top-right"><span className="status-dot" /><span>DEMO ENVIRONMENT</span></div>
      </header>

      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> PLAYER INTELLIGENCE</div><h1>KNOW YOUR<br /><span>GAME.</span></h1><p>Performance insights, match history, and competitive trends — all in one place.</p></div>
        <div className="hero-art" aria-hidden="true"><div className="hero-ring ring-one" /><div className="hero-ring ring-two" /><div className="hero-slash" /><div className="hero-v">V</div><div className="hero-caption">COMPETE<br />WITH PURPOSE</div></div>
      </section>

      <section className="search-wrap">
        <form className="search-form" onSubmit={searchPlayer}>
          <div className="search-icon">⌕</div>
          <input aria-label="Search player" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter Riot ID — Name#TAG" />
          <button type="submit">SEARCH PLAYER <span>↗</span></button>
        </form>
        <div className="search-hint">TRY A SAMPLE: {demoProfiles.map((name) => <button key={name} onClick={() => {setQuery(name);setPlayer(name);setNotice("Loaded an included sample profile.");}}>{name}</button>)}</div>
      </section>

      <div className="demo-banner"><span className="demo-pill">DEMO DATA</span><span>This dashboard currently uses sample statistics. Live Riot/Tencent account lookup is not connected.</span></div>

      <section className="player-card" id="overview">
        <div className="player-main"><div className="avatar-frame"><span className="avatar-letter">{player.slice(0,1).toUpperCase()}</span><span className="avatar-level">LVL 284</span></div>
          <div className="player-identity"><div className="player-label">PLAYER PROFILE <span className="online-tag"><i /> SAMPLE</span></div>
            <h2>{player.includes("#") ? player.split("#")[0] : player}<span>#{player.includes("#") ? player.split("#").slice(1).join("#") : "APAC"}</span></h2>
            <div className="player-meta"><span>🇵🇭 APAC</span><span>•</span><span>LEVEL 284</span><span>•</span><span>LAST SEEN: TODAY</span></div>
          </div>
        </div>
        <div className="rank-block"><div className="rank-icon">✦</div><div><div className="rank-label">CURRENT RANK</div><div className="rank-name">PLATINUM <b>III</b></div><div className="rank-progress"><span /></div><div className="rank-sub">87 / 100 RR</div></div></div>
      </section>

      {notice && <div className="notice">{notice}</div>}
      <nav className="section-tabs" aria-label="Player sections">{["Overview","Matches","Agents","Maps"].map((tab) => <button key={tab} className={activeTab === tab ? "tab active" : "tab"} onClick={() => setActiveTab(tab)}>{tab.toUpperCase()}</button>)}</nav>

      {activeTab === "Overview" && <>
        <section className="stats-grid"><Stat label="WIN RATE" value="58.4%" sub="+4.2% this act" trend="up" /><Stat label="K/D RATIO" value="1.21" sub="Above average" trend="up" /><Stat label="HEADSHOT %" value="26.8%" sub="+1.7% this act" trend="up" /><Stat label="AVG. COMBAT SCORE" value="218" sub="Top 32% sample" trend="neutral" /></section>
        <div className="content-grid">
          <section className="panel match-panel" id="matches"><PanelHeading title="RECENT MATCHES" subtitle="Your latest competitive performance" action="VIEW ALL" onAction={() => setActiveTab("Matches")} /><MatchRows data={matches.slice(0,4)} /></section>
          <section className="panel form-panel"><PanelHeading title="PERFORMANCE" subtitle="Recent form · last 10 matches" /><div className="form-score"><strong>7<span>W</span>–3<span>L</span></strong><em>70% win rate</em></div><div className="form-bars">{[1,1,0,1,1,0,1,1,1,0].map((win,index) => <div key={index} className={win ? "form-bar win" : "form-bar loss"} />)}</div><div className="form-legend"><span><i className="legend-win" /> VICTORY</span><span><i className="legend-loss" /> DEFEAT</span></div><div className="performance-divider" /><div className="mini-stat"><span>Average K / D / A</span><b>20.4 / 16.2 / 7.1</b></div><div className="mini-stat"><span>First bloods per match</span><b>2.8</b></div><div className="mini-stat"><span>Clutch success</span><b>31%</b></div></section>
        </div>
        <section className="panel" id="agents"><PanelHeading title="TOP AGENTS" subtitle="Performance by agent" action="VIEW AGENTS" onAction={() => setActiveTab("Agents")} /><AgentCards /></section>
      </>}

      {activeTab === "Matches" && <section className="panel full-panel" id="matches"><PanelHeading title="MATCH HISTORY" subtitle="Competitive match results · sample records" /><div className="filter-row">{["ALL","VICTORY","DEFEAT"].map((item) => <button key={item} className={filter === item ? "filter active-filter" : "filter"} onClick={() => setFilter(item)}>{item}</button>)}</div><MatchRows data={visibleMatches} /></section>}
      {activeTab === "Agents" && <section className="panel full-panel" id="agents"><PanelHeading title="AGENT PERFORMANCE" subtitle="Win rate, combat rating, and pick frequency" /><AgentCards detailed /></section>}
      {activeTab === "Maps" && <section className="panel full-panel" id="maps"><PanelHeading title="MAP PERFORMANCE" subtitle="Results by map · competitive queue" /><div className="map-list">{maps.map((map,index) => <div className="map-row" key={map.name}><div className="map-index">0{index+1}</div><div className="map-name">{map.name}</div><div className="map-games">{map.games} MATCHES</div><div className="map-bar"><span style={{width:map.win+"%"}} /></div><div className="map-win">{map.win}%</div><div className="map-kd">K/D <b>{map.kd}</b></div></div>)}</div></section>}

      <footer className="footer"><span className="footer-brand">V<span> TRACKER</span></span><span>UNOFFICIAL FAN-MADE TRACKER CONCEPT · NOT AFFILIATED WITH RIOT GAMES</span><span>BUILD 1.0.0</span></footer>
    </main>
  );
}

function Stat({label,value,sub,trend}:{label:string;value:string;sub:string;trend:"up"|"neutral"}) {
  return <div className="stat-card"><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className={trend === "up" ? "stat-sub positive" : "stat-sub"}>{trend === "up" && <span>↗ </span>}{sub}</div><div className="stat-corner" /></div>;
}
function PanelHeading({title,subtitle,action,onAction}:{title:string;subtitle:string;action?:string;onAction?:()=>void}) {
  return <div className="panel-heading"><div><h3>{title}</h3><p>{subtitle}</p></div>{action && <button className="panel-action" onClick={onAction}>{action} ↗</button>}</div>;
}
function MatchRows({data}:{data:Match[]}) {
  if (!data.length) return <div className="empty-state">No matches in this filter.</div>;
  return <div className="match-list">{data.map((match,index) => <div className="match-row" key={match.map+index}>
    <div className={match.result === "VICTORY" ? "match-result victory" : "match-result defeat"}><span>{match.result === "VICTORY" ? "W" : "L"}</span><small>{match.result}</small></div>
    <div className="match-map"><b>{match.map}</b><span>{match.mode} · {match.when}</span></div>
    <div className="match-agent"><span className="agent-token">{match.agent.slice(0,1)}</span><span>{match.agent}</span></div>
    <div className="match-score"><b>{match.score}</b><span>SCORE</span></div>
    <div className="match-kda"><b>{match.k} / {match.d} / {match.a}</b><span>K / D / A</span></div>
    <div className="match-acs"><b>{match.acs}</b><span>ACS</span></div>
    <div className={match.result === "VICTORY" ? "match-rr rr-up" : "match-rr rr-down"}>{match.rr}</div>
  </div>)}</div>;
}
function AgentCards({detailed=false}:{detailed?:boolean}) {
  return <div className="agent-grid">{agents.map((agent,index) => <div className="agent-card" key={agent.name}>
    <div className={"agent-art "+agent.color}><span>{agent.name.slice(0,1)}</span><small>0{index+1}</small></div>
    <div className="agent-info"><div className="agent-name">{agent.name}</div><div className="agent-role">{agent.role}</div><div className="agent-metrics"><span><b>{agent.win}%</b><small>WIN RATE</small></span><span><b>{agent.kd}</b><small>K/D</small></span><span><b>{agent.games}</b><small>MATCHES</small></span></div>{detailed && <div className="agent-progress"><span style={{width:agent.win+"%"}} /></div>}</div>
  </div>)}</div>;
}
