export const RoutePath = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  BASE: '/',
  TASKLIST: '/tasks',
  TASKDETAIL: '/task/:id',
  MEMBER: '/members',
}

export const navLinks = [
  {
    to: RoutePath.TASKLIST,
    name: '任務管理',
    icon: '📃',
    roles: [1, 2, 3]
  },
  {
    to: RoutePath.MEMBER,
    name: '人員管理',
    icon: '👩🏻‍💼',
    roles: [1, 2],
  },
]

export default RoutePath