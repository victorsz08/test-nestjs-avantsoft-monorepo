/**
 *
 * @param name Nome do produto
 * @returns Letra do alfabeto que não está presente no nome do produto ou "_" se não houver letras faltantes
 */

export function findFirstMissingLetter(name: string): string {
  const letterName = new Set(
    name
      .toLowerCase()
      .replace(/[^a-z]/g, '')
      .split(''),
  );

  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i);

    if (!letterName.has(letter)) {
      return letter;
    }
  }

  return '_';
}
