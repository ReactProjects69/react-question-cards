// Добавляем комментарий для ESLint, чтобы он знал, что это Node.js скрипт
/* eslint-env node */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Для работы с __dirname в ES модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Получаем имя компонента из аргументов командной строки
const componentName = process.argv[2];

if (!componentName) {
    console.error('Пожалуйста, укажите имя компонента');
    process.exit(1);
}

// Создаем директорию для компонента
const projectRoot = path.resolve(__dirname, '..');
const componentDir = path.join(projectRoot, 'src', 'components', componentName);

if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
    console.log(`Создана директория: ${componentDir}`);
}

// Создаем основной файл компонента (.tsx)
const componentContent = `import cls from './${componentName}.module.css';

export function ${componentName}() {
  return <></>;
}
`;

fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentContent);
console.log(`Создан файл: ${componentName}.tsx`);

// Создаем файл стилей (.module.css)
fs.writeFileSync(
    path.join(componentDir, `${componentName}.module.css`),
    `.${componentName.toLowerCase()} {\n  \n}\n`,
);
console.log(`Создан файл: ${componentName}.module.css`);

// Создаем индексный файл (index.tsx)
const indexContent = `export { ${componentName} } from './${componentName}';\n`;
fs.writeFileSync(path.join(componentDir, 'index.tsx'), indexContent);
console.log(`Создан файл: index.tsx`);

console.log(`Компонент ${componentName} успешно создан!`);
