export const classNames = (
  ...classes: (string | boolean | null | undefined)[]
) => {
  const classesFiltered = classes.filter((c) => c).join(" ")
  return classesFiltered
}
