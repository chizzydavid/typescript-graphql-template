
const operationEntityMap = {
  COMMENT: [
    'getComments',
    'addComment'
  ],
  MOVIES: [
    'getMovies',
    'addMovie'
  ]
}

export const isAllowedOperation = (operation: string): boolean => {
  return Object.values(operationEntityMap).flat().includes(operation);
}

export const getOperationEntity = (operation: string): string | undefined => {
  let entity = 'Unknown';
  for (const [key, value] of Object.entries(operationEntityMap)) {
    if (value.includes(operation)) entity = key;
  }
  return entity;
}

