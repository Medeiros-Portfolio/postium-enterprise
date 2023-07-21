export const rolesFormatter = (roles: string[] | string) => {
  if (typeof roles === 'string') {
    return desabbreviate(roles)
  }

  if (typeof roles === 'object') {
    return roles.map((role) => desabbreviate(role)).join(' | ')
  }
}

function desabbreviate(role) {
  return role
    .replace('admin', 'Administrator')
    .replace('writer', 'Writer')
    .replace('reader', 'Reader')
}
