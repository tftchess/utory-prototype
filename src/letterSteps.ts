export const firstVideo = 'scenarios/letter/play/video-1'
export const firstMission = 'scenarios/letter/play/mission-1'
export const secondVideo = 'scenarios/letter/play/video-2'

type VideoStep = { kind: 'video'; label: string; file: string | null; next?: typeof firstMission }
type MissionStep = {
  kind: 'mission'
  label: string
  description: string
  // Percentages on the illustrative map, independent of geographic coordinates.
  points: { kind: 'current' | 'target'; label: string; x: number; y: number }[]
  next: typeof secondVideo
}

export type PlayRoute = typeof firstVideo | typeof firstMission | typeof secondVideo
export const letterSteps: Record<PlayRoute, VideoStep | MissionStep> = {
  [firstVideo]: { kind: 'video', label: '영상 1', file: null, next: firstMission },
  [firstMission]: {
    kind: 'mission', label: '목표 위치로 이동하기',
    description: '표시된 목표 위치로 이동해 다음 이야기를 확인하세요.',
    points: [
      { kind: 'current', label: '현재 위치(예시)', x: 30, y: 69 },
      { kind: 'target', label: '미션 위치(예시)', x: 71, y: 31 },
    ],
    next: secondVideo,
  },
  [secondVideo]: { kind: 'video', label: '영상 2', file: null },
}
export type { VideoStep, MissionStep }
