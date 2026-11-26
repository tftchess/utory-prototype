import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { letterRoute } from './FeaturedLetter'
import type { MissionStep, VideoStep } from '../letterSteps'
import poster from '../assets/letter-lane.jpg'
import '../letter-play.css'

const icons = {
  play: 'M7 4.8 20 12 7 19.2Z',
  pause: 'M8 5v14m8-14v14',
  rewind: 'M3.5 9A9 9 0 1 1 3 15M3 3.8V9h5.2',
  sound: 'M3 9h4l5-4v14l-5-4H3ZM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',
  muted: 'M3 9h4l5-4v14l-5-4H3ZM16 9l6 6m0-6-6 6',
  expand: 'M3 9V3h6m6 0h6v6m0 6v6h-6m-6 0H3v-6',
  shrink: 'M9 3v6H3m18 0h-6V3m0 18v-6h6M3 15h6v6',
  pin: 'M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 1 1 14 0Zm-5 0a2 2 0 1 1-4 0 2 2 0 1 1 4 0Z',
}
function Glyph({ name }: { name: keyof typeof icons }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
    <path d={icons[name]} />
    {name === 'rewind' && <text x="12" y="15.4" fill="currentColor" stroke="none" fontSize="9" textAnchor="middle">10</text>}
  </svg>
}

function Mission({ step }: { step: MissionStep }) {
  return <article className="mission-page">
    <a className="play-exit" href={'#/' + letterRoute}>← 나가기</a>
    <header><p className="mission-number">미션 1</p><h1 tabIndex={-1}>{step.label}</h1></header>
    <p className="mission-description">{step.description}</p>
    <figure className="mission-map">
      <div className="mission-plan" role="img" aria-label={'지도형 시안. ' + step.points.map(point => point.label).join(', ')}>
        <svg className="mission-blocks" viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#fbf7eb" strokeWidth="9" strokeLinejoin="round">
            <path fill="#e2e6ce" d="M-10-10h154l-9 93-145 62Z"/>
            <path fill="#e8ddc8" d="m162-10 155 0 17 71-182 63Z"/>
            <path fill="#e9dfcc" d="m330-10 160 0v109l-135 31Z"/>
            <path fill="#ece2cf" d="m-10 159 133-57-19 111-114 49Z"/>
            <path fill="#dddcc4" d="m143 145 110-39 35 108-161 46Z"/>
            <path fill="#e6dac6" d="m275 100 61-21 17 76 137-36v59l-181 44Z"/>
            <path fill="#dce3c8" d="m321 241 169-43v112H338Z"/>
            <path fill="#e8deca" d="m-10 285 306-50 22 75H-10Z"/>
          </g>
        </svg>
        {step.points.map(point => <span key={point.kind} className={'mission-point ' + point.kind} style={{ left: point.x + '%', top: point.y + '%' }}>
          {point.kind === 'target' ? <Glyph name="pin" /> : <i />}
          <b>{point.label}</b>
        </span>)}
      </div>
      <figcaption>지도형 시안 · 예시 위치 · 실제 GPS 미사용</figcaption>
    </figure>
    <a className="play-next" href={'#/' + step.next}>다음 영상 미리보기</a>
    <p className="mission-note">디자인 확인용이며, 실제 도착을 확인하지 않습니다.</p>
  </article>
}

function stamp(seconds: number) {
  const s = Math.floor(seconds)
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')
}
const playbackLabels = { ready: '재생 준비', playing: '재생 중', paused: '일시정지', ended: '영상 종료', error: '영상을 재생할 수 없어요' }
function rejectedPlayback(video: HTMLVideoElement, reason: unknown) {
  const interrupted = reason instanceof DOMException && ['NotAllowedError', 'AbortError'].includes(reason.name)
  return interrupted && !video.error ? 'paused' : 'error'
}
function Movie({ step }: { step: VideoStep }) {
  const stage = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLVideoElement>(null)
  const [state, setState] = useState<keyof typeof playbackLabels>('ready')
  const [visible, setVisible] = useState(true)
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  const [scrubbing, setScrubbing] = useState(false)
  const [muted, setMuted] = useState(true)
  const [duration, setDuration] = useState(0)
  const [time, setTime] = useState(0)
  const [nativeFull, setNativeFull] = useState(false)
  const [webFull, setWebFull] = useState(false)
  const [activity, setActivity] = useState(0)
  const expanded = nativeFull || webFull
  const source = step.file ? import.meta.env.BASE_URL + step.file : undefined
  const playable = Boolean(source) && state !== 'error'
  const preview = !source || state === 'error'
  const next = step.next && (preview || state === 'ended') ? step.next : undefined

  useEffect(() => {
    const video = media.current
    if (!video) return
    let active = true
    if (!document.hidden) video.play().catch(reason => {
      if (active) { setVisible(true); setState(rejectedPlayback(video, reason)) }
    })
    const pauseHidden = () => { if (document.hidden) video.pause() }
    document.addEventListener('visibilitychange', pauseHidden)
    return () => {
      active = false
      document.removeEventListener('visibilitychange', pauseHidden)
      video.pause()
    }
  }, [source])

  useEffect(() => {
    function updateFull() { setNativeFull(document.fullscreenElement === stage.current) }
    function onEscape(event: KeyboardEvent) { if (event.key === 'Escape') setWebFull(false) }
    document.addEventListener('fullscreenchange', updateFull)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('fullscreenchange', updateFull)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  useEffect(() => {
    if (!visible || state !== 'playing' || keyboardFocus || scrubbing) return
    const timeout = window.setTimeout(() => setVisible(false), 3000)
    return () => window.clearTimeout(timeout)
  }, [activity, visible, state, keyboardFocus, scrubbing])

  async function toggleFull() {
    const container = stage.current
    if (!container) return
    if (webFull) { setWebFull(false); return }
    if (document.fullscreenElement === container) {
      await document.exitFullscreen().catch(() => {})
      return
    }
    try {
      if (document.fullscreenEnabled && container.requestFullscreen) {
        await container.requestFullscreen()
        return
      }
    } catch { /* A rejected request can still use the in-page layout. */ }
    if (stage.current === container) setWebFull(true)
  }

  async function leave(route: string) {
    const container = stage.current
    media.current?.pause()
    if (container && document.fullscreenElement === container) await document.exitFullscreen().catch(() => {})
    if (container && stage.current === container) window.location.hash = '/' + route
  }

  async function togglePlay() {
    const video = media.current
    if (!video) return
    if (!video.paused) { video.pause(); return }
    try { await video.play() }
    catch (reason) { if (media.current === video) { setState(rejectedPlayback(video, reason)); setVisible(true) } }
  }
  function seek(value: number) {
    if (media.current && duration) media.current.currentTime = Math.max(0, Math.min(duration, value))
  }
  function control(label: string, icon: keyof typeof icons, action: () => void, disabled = false) {
    return <button type="button" aria-label={label} title={label} onClick={action} disabled={disabled}><Glyph name={icon} /></button>
  }

  return <div ref={stage} className={'movie-stage' + (expanded ? ' expanded' : '')} aria-label={step.label}>
    <header><button className="play-exit" onClick={() => leave(letterRoute)}>← 나가기</button></header>
    <div className="movie-frame">
      {source ? <video ref={media} src={source} playsInline muted={muted} preload="metadata" aria-label={step.label}
        onPlaying={() => setState('playing')}
        onPause={e => { if (!e.currentTarget.ended && !e.currentTarget.error) { setState('paused'); setVisible(true) } }}
        onEnded={() => { setState('ended'); setVisible(true) }}
        onSeeked={e => { if (e.currentTarget.paused && !e.currentTarget.ended && !e.currentTarget.error) setState('paused') }}
        onError={() => { setState('error'); setVisible(true) }}
        onDurationChange={e => setDuration(Number.isFinite(e.currentTarget.duration) ? e.currentTarget.duration : 0)}
        onTimeUpdate={e => setTime(e.currentTarget.currentTime)}
        onVolumeChange={e => setMuted(e.currentTarget.muted)} />
        : <img src={poster} className="movie-still" alt="" />}
      <button className="movie-surface" aria-label={visible ? '영상 조작부 숨기기' : '영상 조작부 표시'} aria-expanded={visible} aria-controls="movie-controls" onClick={() => setVisible(!visible)} />
      <span className="movie-state" role="status">{!source ? '영상 준비 중 · 디자인 시안' : playbackLabels[state]}</span>
      <div id="movie-controls" className={'movie-controls' + (visible ? '' : ' concealed')} inert={!visible} aria-hidden={!visible}
        onKeyDown={() => setKeyboardFocus(true)}
        onFocus={e => setKeyboardFocus(e.target.matches(':focus-visible'))}
        onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setKeyboardFocus(false) }}
        onPointerDown={() => { setKeyboardFocus(false); setActivity(n => n + 1) }}>
        <input type="range" min="0" max={duration || 1} step="any" value={Math.min(time, duration)} disabled={!playable || !duration}
          aria-label="영상 재생 위치" aria-valuetext={stamp(time)}
          style={{ '--played': (duration ? time / duration * 100 : 0) + '%' } as CSSProperties}
          onChange={e => seek(Number(e.target.value))}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); setScrubbing(true) }}
          onLostPointerCapture={() => setScrubbing(false)} />
        <div className="movie-toolbar">
          {control(state === 'playing' ? '일시정지' : '재생', state === 'playing' ? 'pause' : 'play', togglePlay, !playable)}
          {control('10초 되감기', 'rewind', () => seek((media.current?.currentTime ?? 0) - 10), !playable || !duration)}
          <span className="movie-time">{stamp(time)} / {duration ? stamp(duration) : '–:––'}</span>
          {control(muted ? '음소거 해제' : '음소거', muted ? 'muted' : 'sound', () => setMuted(!muted), !playable)}
          {control(expanded ? '원래 화면으로' : '전체화면 또는 확대', expanded ? 'shrink' : 'expand', toggleFull)}
        </div>
      </div>
    </div>
    <footer>{next && <button className="play-next" onClick={() => leave(next)}>{preview ? '미션 화면 미리보기' : '미션 확인하기'}</button>}</footer>
  </div>
}

export function LetterPlay({ step }: { step: VideoStep | MissionStep }) {
  return step.kind === 'mission' ? <Mission step={step} /> : <Movie step={step} />
}
