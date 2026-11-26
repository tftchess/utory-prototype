/// <reference types="vite/client" />
import { useRef } from 'react'
import { ScenarioArt } from './ScenarioArt'
import { LetterTrailer } from './FeaturedLetter'
import '../stories.css'

export const hubTabs = [
  { id: 'scenarios', label: '시나리오' },
  { id: 'history', label: '플레이 기록' },
  { id: 'journal', label: '기록' },
  { id: 'profile', label: '내 정보' },
] as const
export type HubTab = typeof hubTabs[number]['id']
export type Story = typeof stories[number]

const stories = [
  {
    id: 'letter', title: '도착하지 않은 편지', genre: '감성 미스터리', time: '30분',
    difficulty: '쉬움', place: '오래된 우체통', progress: 65,
    // Only enter the user-confirmed venue here. 'place' above is a story checkpoint.
    playLocation: { name: null, address: null, latitude: null, longitude: null },
  },
  { id: 'forest', title: '숲이 건네는 인사', genre: '힐링 어드벤처', time: '45분', difficulty: '보통', place: '오두막 앞 갈림길', progress: 30 },
  { id: 'bookshop', title: '밤 열한 시의 책방', genre: '일상 속 판타지', time: '60분', difficulty: '어려움', place: '책방의 마지막 서가', progress: 85 },
] as const

export const featuredStory = stories[0]

function MenuIcon({ tab }: { tab: HubTab }) {
  const shapes = {
    scenarios: <><path d="M3 4.5q5-1.4 9 1.7 4-3.1 9-1.7v14q-5-1.4-9 1.7-4-3.1-9-1.7z"/><path d="M12 6.2v14"/></>,
    history: <><path d="M4 8a8.5 8.5 0 1 1-.1 8M3.5 3.8V9H9"/><path d="M12 7v5l3 2"/></>,
    journal: <><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 3v18m3-12h6m-6 4h4"/></>,
    profile: <><circle cx="12" cy="7.5" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0z"/></>,
  }
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[tab]}</svg>
}

export function HubNav({ active }: { active: HubTab }) {
  return <nav className="hub-nav" aria-label="메인 메뉴">
    <div>{hubTabs.map(tab => (
      <a key={tab.id} href={`#/${tab.id}`} aria-current={active === tab.id ? 'page' : undefined}>
        <MenuIcon tab={tab.id}/>{tab.label}
      </a>
    ))}</div>
  </nav>
}

function Library({ onSelect }: { onSelect: (story: Story) => void }) {
  const trailer = useRef<HTMLDialogElement>(null)
  return <>
    <button className="hub-feature" onClick={() => trailer.current?.showModal()} aria-haspopup="dialog" aria-label="도착하지 않은 편지 자세히 보기">
      <span className="feature-copy">
        <span className="feature-genre">감성 미스터리</span>
        <strong>도착하지 않은 편지</strong>
        <span>작은 마을의 우체통에 남겨진 마지막 편지.</span>
        <span className="feature-link">자세히 보기 <span aria-hidden="true">→</span></span>
      </span>
    </button>
    <LetterTrailer dialogRef={trailer} title={featuredStory.title} />
    <section className="hub-section" aria-labelledby="resume-title">
      <h2 id="resume-title">진행하던 이야기</h2>
      <div className="resume-rail">
        {stories.map(story => <article className="resume-card" key={story.id}>
          <button onClick={() => onSelect(story)} aria-label={`${story.title} 이어하기 안내`}>
            <span className="resume-art"><ScenarioArt kind={story.id}/></span>
            <strong>{story.title}</strong>
            <span className="resume-place">{story.place}</span>
          </button>
          <div className="resume-status">
            <progress value={story.progress} max={100} aria-label={`${story.title} 진행도`}/>
            <span>{story.progress}%</span>
          </div>
        </article>)}
      </div>
    </section>
    <section className="hub-section" aria-labelledby="recommend-title">
      <h2 id="recommend-title">추천 시나리오</h2>
      <div className="hub-picks">
        {stories.slice(1).map(story => <button key={story.id} className="hub-pick" onClick={() => onSelect(story)}>
          <span className="pick-art"><ScenarioArt kind={story.id}/></span>
          <span className="pick-copy"><small>{story.genre}</small><strong>{story.title}</strong><span>{story.time} · {story.difficulty}</span></span>
          <span className="pick-arrow" aria-hidden="true">›</span>
        </button>)}
      </div>
    </section>
  </>
}

function History() {
  return <ul className="hub-history">{stories.map(story => <li key={story.id}>
    <span className="pick-art"><ScenarioArt kind={story.id}/></span>
    <span className="pick-copy"><strong>{story.title}</strong><span>{story.place} · {story.progress}% 진행</span></span>
  </li>)}</ul>
}

function Journal() {
  return <figure className="hub-entry">
    <div><ScenarioArt kind="forest"/></div>
    <figcaption><strong>오두막 앞에서</strong><p>갈림길에 잠시 멈춰 숲의 오후를 담았다.</p></figcaption>
  </figure>
}

function Profile() {
  return <section className="hub-profile">
    <div><MenuIcon tab="profile"/><strong>이야기 여행자</strong></div>
    <dl><dt>프로필</dt><dd>예시 계정</dd><dt>진행 중인 이야기</dt><dd>{stories.length}개</dd></dl>
  </section>
}

export function StoryHub({ tab, onSelect }: { tab: HubTab; onSelect: (story: Story) => void }) {
  return <div className="hub-content">
    <header className="hub-header">
      <h1 tabIndex={-1}>{hubTabs.find(item => item.id === tab)?.label}</h1>
      <a href="#/welcome" className="hub-brand" aria-label="유토리 시작 화면으로 이동">
        <img src={import.meta.env.BASE_URL + 'assets/yutori-logo.png'} alt=""/>유토리
      </a>
    </header>
    {tab === 'scenarios' && <Library onSelect={onSelect}/>}
    {tab === 'history' && <History/>}
    {tab === 'journal' && <Journal/>}
    {tab === 'profile' && <Profile/>}
  </div>
}
