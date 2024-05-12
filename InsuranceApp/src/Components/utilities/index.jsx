/**
 * Used to convert web based url entity names into database tables.
 *
 * @param {string} entityName - The name of the entity to convert (typically comes from actions).
 * @returns {string} A string converted so that we can query the proper table in context.
 */
export const entityNameToDBTable = (entityName) => {
  let convertedName = entityName.replace(/ /g, "-");
  convertedName = convertedName.replace(/-(.)/g, (_, letter) =>
    letter.toUpperCase()
  );
  return convertedName;
};
