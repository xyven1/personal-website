// Squelch warnings of image imports from your assets dir
declare module '$lib/images/*' {
  const meta
  export default meta
}