module.exports = {
    env: {
      node: true, // Define el entorno como Node.js
      browser: false, // Define el entorno como no relacionado al navegador
      es2021: true, // Habilita las características de ECMAScript 2021
    },
    extends: [
      'eslint:recommended', // Usa las reglas recomendadas de ESLint
      'plugin:prettier/recommended', // Usa Prettier para formateo y detecta conflictos de ESLint con Prettier
      'plugin:react/recommended', // Usa las reglas recomendadas para React
      'plugin:react/jsx-runtime', // Habilita el runtime automático de React para JSX
      'plugin:react-hooks/recommended', // Usa las reglas recomendadas para hooks de React
    ],
    plugins: ['react', 'prettier', 'import', '@typescript-eslint'], // Habilita los plugins para React, Prettier, import y TypeScript
    parser: '@typescript-eslint/parser', // Usa el parser de TypeScript para soportar sintaxis TypeScript
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // Habilita el parsing de JSX
      },
      ecmaVersion: 'latest', // Usa la última versión de ECMAScript
      sourceType: 'module', // Usa los módulos ECMAScript (import/export)
    },
    
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React
      },
    },
    // rules: {
    //   'react/display-name': 'off', // Desactiva la advertencia sobre nombres de display en componentes React
    //   'react/jsx-uses-react': 'off', // Desactiva la advertencia de React usado en JSX (no necesario en React 17+)
    //   'react/react-in-jsx-scope': 'off', // Desactiva la necesidad de importar React en archivos JSX (no necesario en React 17+)
    //   'react/jsx-uses-vars': 'error', // Previene que las variables usadas en JSX sean marcadas como no utilizadas
    //   'no-console': 'warn', // Emite una advertencia cuando se usa console.log u otros métodos de console
    //   'no-unused-vars': 'off', // Desactiva la regla estándar de no variables usadas para usar la específica de TypeScript
    //   '@typescript-eslint/no-unused-vars': [
    //     'warn', // Advierte sobre variables no utilizadas en TypeScript
    //     {
    //       args: 'after-used', // Permite argumentos sin usar si vienen después de los usados
    //       ignoreRestSiblings: false, // No ignora los hermanos de rest que no son usados
    //       argsIgnorePattern: '^_.*?$', // Ignora los argumentos que comienzan con un guion bajo
    //     },
    //   ],
    //   'react/prop-types': 'off', // Desactiva la verificación de prop-types en React
    //   'prettier/prettier': [
    //     'warn', // Marca como advertencia cualquier problema de formateo según Prettier
    //     {
    //       printWidth: 100, // Longitud máxima de línea: 100 caracteres
    //       trailingComma: 'all', // Coma al final de cada estructura que permita múltiples elementos
    //       tabWidth: 2, // Tamaño de tabulación: 2 espacios
    //       semi: false, // Usa punto y coma al final de las declaraciones
    //       singleQuote: true, // Usa comillas simples en lugar de dobles
    //       bracketSpacing: false, // Sin espacio entre llaves y el contenido
    //       arrowParens: 'always', // Siempre usa paréntesis en funciones de flecha
    //       endOfLine: 'auto', // Mantiene el final de línea según el entorno
    //     },
    //   ],
    //   'import/order': [
    //     'warn', // Advierte si el orden de las importaciones no es el correcto
    //     {
    //       groups: ['type', 'builtin', 'object', 'external', 'internal', 'parent', 'sibling', 'index'], // Define el orden de los grupos de importación
    //       pathGroups: [
    //         {
    //           pattern: '~/**', // Agrupa las rutas que empiezan con '~' en el grupo externo
    //           group: 'external', // Coloca estas rutas en el grupo de externas
    //           position: 'after', // Posiciona estas rutas después de las externas normales
    //         },
    //       ],
    //       'newlines-between': 'always', // Requiere una nueva línea entre grupos de importación
    //     },
    //   ],
    //   'react/self-closing-comp': 'warn', // Advierte si un componente sin hijos no se cierra automáticamente
    //   'react/jsx-sort-props': [
    //     'warn', // Advierte si las props de JSX no están ordenadas
    //     {
    //       callbacksLast: true, // Obliga a que los callbacks vayan al final
    //       shorthandFirst: true, // Obliga a las props en shorthand a ir al principio
    //       noSortAlphabetically: false, // No obliga a ordenar alfabéticamente
    //       reservedFirst: true, // Obliga a que las props reservadas vayan primero
    //     },
    //   ],
    //   'padding-line-between-statements': [
    //     'warn', // Advierte si no hay una línea en blanco entre ciertas declaraciones
    //     { blankLine: 'always', prev: '*', next: 'return' }, // Siempre agrega una línea en blanco antes de un `return`
    //     { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' }, // Siempre agrega una línea en blanco después de una declaración de variable
    //     { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }, // Permite o no línea en blanco entre declaraciones de variables continuas
    //   ],
    // },
  };
  