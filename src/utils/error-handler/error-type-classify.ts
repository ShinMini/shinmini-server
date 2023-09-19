// Path: server/src/utils/error-handler/error-type-classify.ts
export const errorTypeClassify = (error: any) => {
  const { code, meta } = error
  const { target } = meta
  const name = [...target].reverse()[0]

  console.group('errorTypeClassify')
  console.log('code:', code)
  console.log('name:', name)
  console.groupEnd()

  switch (code) {
    case 'P2002':
      return {
        error: 'DUPLICATE_KEY',
        occurred: name,
      }
    default:
      return {
        error: 'UNKNOWN',
        occurred: 'UNKNOWN',
      }
  }
}
