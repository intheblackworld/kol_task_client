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
    name: 'ไปปๅ็ฎก็',
    icon: '๐',
    roles: [1, 2, 3]
  },
  {
    to: RoutePath.MEMBER,
    name: 'ไบบๅก็ฎก็',
    icon: '๐ฉ๐ปโ๐ผ',
    roles: [1, 2],
  },
]

export default RoutePath