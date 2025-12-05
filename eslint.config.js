// eslint.config.js
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import js from "@eslint/js"; // Recommended: Import the built-in ESLint rules

export default [
  // 1. ESLint Recommended Rules (for general JavaScript best practices)
  js.configs.recommended,

  // 2. TypeScript-specific Configuration
  {
    // Spread in the recommended rules from the TS plugin
    ...tseslint.configs.recommended,
    
    files: ["**/*.{ts,tsx}"], // Only apply TS rules to TS/TSX files
    
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // Crucial: Point ESLint to your tsconfig file for type-aware linting
        project: "./tsconfig.json", 
        // Note: 'ecmaFeatures' is obsolete and should be omitted
      }
    },
    // The plugin definition is no longer strictly needed here since we spread in the configs,
    // but it's good practice to keep it if you reference the rules below.
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // You can keep your overrides
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // ... other TS rules
    }
  },
  
  // 3. React Hooks Configuration
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "react-hooks": reactHooks
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  },

  // 4. Next.js Configuration
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    // The next plugin exposes the rules directly, no need to define a 'plugins' object 
    // for it unless you reference it by prefix (e.g. `next/no-img-element`).
    ...nextPlugin.configs["core-web-vitals"],
    
    // If you need additional rules from the plugin:
    plugins: {
        "next": nextPlugin
    },
    // Example Next.js rule:
    rules: {
        "next/no-img-element": "error"
    }
  },

  // 5. Ignores
  {
    ignores: [".next/**/*", "**/*.d.ts", "public/**/*.js", "node_modules/**/*"]
  }
];
