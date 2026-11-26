import { useEffect, useRef, useState } from 'react'
import type { SVGProps } from 'react'
import { RunningYutori } from './components/RunningYutori'
import './welcome.css'
import { ScenarioArt } from './components/ScenarioArt'

import { HubNav, StoryHub, hubTabs, featuredStory } from './components/StoryHub'
import { LetterDetail, letterRoute } from './components/FeaturedLetter'
import type { HubTab, Story } from './components/StoryHub'
import { letterSteps, type PlayRoute } from './letterSteps'
import { LetterPlay } from './components/LetterPlay'

type Screen = 'welcome' | 'login' | HubTab | typeof letterRoute | PlayRoute
function isPlayRoute(value: string): value is PlayRoute {
  return Object.hasOwn(letterSteps, value)
}
type IconName = 'arrow' | 'back' | 'clock' | 'close' | 'leaf' | 'spark' | 'lock' | 'person'
const screens = [
  { id: 'welcome', label: '스플래시' },
  { id: 'login', label: '로그인' },
  ...hubTabs,
  { id: letterRoute, label: featuredStory.title },
] as const

function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M4 12h15M13 6l6 6-6 6" /></>,
    back: <><path d="m14 6-6 6 6 6" /></>,
    clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    leaf: <><path d="M19 4C10 3 4 7 5 13c1 6 10 7 13 0 1-3 1-6 1-9Z" /><path d="M4 21c1-6 5-11 10-13" /></>,
    spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
    person: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
  }
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
}

function Logo({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <div className={`logo-fallback ${className}`} role="img" aria-label="유토리 로고 자리"><Icon name="leaf" /><span>유토리</span></div>
  ) : <img className={`yutori-logo ${className}`} src={import.meta.env.BASE_URL + 'assets/yutori-logo.png'} alt="군고구마를 안고 있는 유토리 강아지" onError={() => setFailed(true)} />
}

function readScreen(): Screen {
  const value = window.location.hash.replace('#/', '')
  return isPlayRoute(value) || screens.some((screen) => screen.id === value) ? value as Screen : 'welcome'
}

function ScenarioDialog({ scenario, onClose }: { scenario: Story | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (scenario && dialog && !dialog.open) dialog.showModal()
    if (!scenario && dialog?.open) dialog.close()
  }, [scenario])

  return (
    <dialog ref={dialogRef} className="scenario-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      {scenario && <div className="dialog-content">
        <button className="icon-button dialog-close" aria-label="안내 닫기" onClick={onClose}><Icon name="close" /></button>
        <div className={`dialog-art art-${scenario.id}`}><ScenarioArt kind={scenario.id} /></div>
        <div className="dialog-copy">
          <span className="eyebrow">다음 이야기를 준비하고 있어요</span>
          <h2 id="dialog-title">{scenario.title}</h2>
          <p id="dialog-description">게임 화면은 다음 단계에서 구현 예정이에요.<br />곧, 이곳에서 새로운 모험이 시작될 거예요.</p>
          <button className="button button-primary" onClick={onClose} autoFocus>다른 이야기 둘러보기<Icon name="arrow" /></button>
        </div>
      </div>}
    </dialog>
  )
}

function Welcome({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <section className="welcome-screen" aria-labelledby="welcome-title">
      <RunningYutori />
      <h1 id="welcome-title" tabIndex={-1}>
        <span>익숙한 장소에</span>{' '}<span>이야기를 더해요</span>
      </h1>
      <button className="welcome-start" type="button" onClick={() => navigate('login')}>
        시작하기
      </button>
    </section>
  )
}

function Login({ navigate }: { navigate: (screen: Screen) => void }) {
  return <section className="screen login-screen" aria-labelledby="login-title">
    <header className="inner-top"><button className="icon-button" aria-label="스플래시로 돌아가기" onClick={() => navigate('welcome')}><Icon name="back" /></button><span className="edition">A NEW CHAPTER BEGINS</span><span className="top-spacer" /></header>
    <div className="login-intro"><Logo className="login-logo" /><h1 id="login-title" tabIndex={-1}>유토리<span className="wordmark-dot">.</span></h1><p>이야기를 따라,<br /><strong>현실 속 방탈출을 시작해보세요.</strong></p></div>
    <form className="login-form" onSubmit={(event) => { event.preventDefault(); navigate('scenarios') }} autoComplete="off">
      <label htmlFor="user-id">아이디</label><div className="input-wrap"><Icon name="person" /><input id="user-id" name="design-id" type="text" placeholder="아이디를 입력해주세요" autoCapitalize="none" spellCheck={false} autoComplete="off" /></div>
      <label htmlFor="user-password">비밀번호</label><div className="input-wrap"><Icon name="lock" /><input id="user-password" name="design-password" type="password" placeholder="비밀번호를 입력해주세요" autoComplete="off" /></div>
      <div className="account-links" aria-label="디자인용 계정 안내"><span>회원가입</span><i /><span>비밀번호 찾기</span></div>
      <button className="button button-primary" type="submit">로그인<Icon name="arrow" /></button>
    </form>
    <div className="social-divider"><span />간편하게 이야기 시작하기<span /></div>
    <div className="social-buttons">
      <button className="button button-kakao" onClick={() => navigate('scenarios')}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.9 5.2 4.7 6.5l-.9 3.5c-.1.3.2.5.5.3l4-2.7 1.7.1c5.5 0 10-3.5 10-7.7S17.5 3 12 3Z" /></svg>카카오로 시작하기</button>
      <button className="button button-google" onClick={() => navigate('scenarios')}><svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94a11.1 11.1 0 0 1-4.79 7.23l7.73 6C44.4 38.07 46.98 31.92 46.98 24.55Z"/><path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19A24 24 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.77l-7.73-6c-2.15 1.45-4.92 2.32-8.18 2.32-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/></svg>구글로 시작하기</button>
    </div>
    <p className="prototype-note">디자인 미리보기 · 입력 없이도 다음 화면으로 이동해요.</p>
  </section>
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(readScreen)
  const [selectedScenario, setSelectedScenario] = useState<Story | null>(null)
  const shellRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleHash = () => { setScreen(readScreen()); setSelectedScenario(null) }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    document.title = `유토리 — ${isPlayRoute(screen) ? letterSteps[screen].label : screens.find((item) => item.id === screen)?.label}`
    shellRef.current?.scrollTo({ top: 0 })
    window.scrollTo({ top: 0 })
    shellRef.current?.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })
  }, [screen])

  function navigate(next: Screen) {
    setSelectedScenario(null)
    window.location.hash = `/${next}`
    setScreen(next)
  }

  if (screen === 'welcome') {
    return <main className="welcome-stage" ref={shellRef}><Welcome navigate={navigate} /></main>
  }

  if (isPlayRoute(screen)) {
    return <main className="letter-play" ref={shellRef}><LetterPlay key={screen} step={letterSteps[screen]} /></main>
  }

  if (screen === letterRoute) {
    return <main className="letter-page" ref={shellRef}><LetterDetail story={featuredStory} /></main>
  }

  if (screen !== 'login') {
    return <div className="hub-stage">
      <main ref={shellRef}><StoryHub tab={screen} onSelect={setSelectedScenario} /></main>
      <HubNav active={screen} />
      <ScenarioDialog scenario={selectedScenario} onClose={() => setSelectedScenario(null)} />
    </div>
  }

  return <div className="design-stage">
    <aside className="desktop-note" aria-label="브랜드 소개"><div className="desktop-wordmark"><Icon name="leaf" /><span>yutori</span></div><span className="eyebrow">일상과 모험 사이</span><h2>어쩌면 오늘은,<br />이야기가 되는 날.</h2><p>익숙한 길 위에서 마주하는 작은 설렘.<br />유토리와 함께 당신의 이야기를 찾아보세요.</p><div className="desktop-rule" /><span className="desktop-footnote">A LITTLE ADVENTURE, A WARM MEMORY.</span></aside>
    <main ref={shellRef} className={`app-shell is-${screen}`}>
      <Login navigate={navigate} />
    </main>
    <nav className="preview-switcher" aria-label="디자인 시안 화면 이동"><span className="preview-label">PREVIEW</span>{screens.slice(0, 3).map((item, index) => <button key={item.id} className={screen === item.id ? 'selected' : ''} aria-current={screen === item.id ? 'page' : undefined} onClick={() => navigate(item.id)}><span>0{index + 1}</span>{item.label}</button>)}</nav>
  </div>
}
