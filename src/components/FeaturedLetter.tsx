import type { RefObject } from 'react'
import poster from '../assets/letter-lane.jpg'
import type { Story } from './StoryHub'
import { PlayLocation } from './PlayLocation'
import { firstVideo } from '../letterSteps'
import '../featured-letter.css'

export const letterRoute = 'scenarios/letter'

// Supply a bundled local clip here when a trailer is available.
const trailerMedia: { poster: string; src?: string } = { poster }

type TrailerProps = {
  dialogRef: RefObject<HTMLDialogElement | null>
  title: string
}

export function LetterTrailer({ dialogRef, title }: TrailerProps) {
  function close() {
    dialogRef.current?.close()
  }

  return (
    <dialog ref={dialogRef} className="letter-dialog" aria-labelledby="letter-trailer-title"
      onClose={() => dialogRef.current?.querySelector('video')?.pause()}
      onClick={event => { if (event.target === event.currentTarget) close() }}>
      <div className="letter-sheet">
        <header>
          <div>
            <p className="letter-caption">시나리오 예고편</p>
            <h2 id="letter-trailer-title">{title}</h2>
          </div>
          <button className="letter-dismiss" aria-label="예고편 닫기" onClick={close}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
          </button>
        </header>
        <div className="letter-player">
          <video poster={trailerMedia.poster} src={trailerMedia.src} controls={Boolean(trailerMedia.src)}
            preload="none" playsInline muted aria-hidden={!trailerMedia.src} aria-label={title + ' 예고편'} />
          {!trailerMedia.src && <span className="letter-media-status">예고편 준비 중</span>}
        </div>
        <a className="letter-cta" href={'#/' + letterRoute} onClick={close}>플레이 하러 가기</a>
      </div>
    </dialog>
  )
}

export function LetterDetail({ story }: { story: Extract<Story, { id: 'letter' }> }) {
  return (
    <article className="letter-detail">
      <a className="letter-return" href="#/scenarios"><span aria-hidden="true">←</span> 시나리오 목록</a>
      <img className="letter-cover" src={poster} alt="햇살이 비치는 마을 골목, 편지가 꽂힌 붉은 우체통" />
      <h1 tabIndex={-1}>{story.title}</h1>
      <p className="letter-intro">주소는 빗물에 번졌지만, 편지는 아직 누군가를 기다리고 있어요.</p>
      <p className="letter-synopsis">오래된 우체통에서 발견한 봉투에는 작은 골목 지도가 그려져 있습니다. 지도에 표시된 가게와 담벼락을 따라 걸으며 이웃들이 기억하는 하루를 되짚어 보세요. 흩어진 기억을 모으면 편지가 닿아야 할 곳을 알 수 있습니다.</p>
      <dl className="letter-facts">
        <div><dt>예상 플레이 시간</dt><dd>약 {story.time}</dd></div>
        <div><dt>난이도</dt><dd>{story.difficulty}</dd></div>
        <div><dt>진행 방식</dt><dd>{story.genre} · 골목 탐방</dd></div>
      </dl>
      <PlayLocation location={story.playLocation} />
      <a className="letter-start letter-cta" href={'#/' + firstVideo}>플레이 시작하기</a>
    </article>
  )
}
