import eslint from "@eslint/js";
import prettierEslingPlugin from "eslint-plugin-prettier";
import globals from "globals";
import prettier from "prettier";
import tseslint from "typescript-eslint";

const prettierConfig = await prettier.resolveConfig("./.prettierrc");

export default tseslint.config(
	{
		ignores: ["eslint.config.mjs", "**/dist/**/*"],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		plugins: {
			prettier: prettierEslingPlugin,
		},
		rules: {
			"prettier/prettier": ["error", prettierConfig],
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
			sourceType: "commonjs",
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn",
			"@typescript-eslint/no-unsafe-assignment": "warn",
			"@typescript-eslint/no-unsafe-return": "warn",
			"@typescript-eslint/no-unsafe-member-access": "warn",
		},
	},
);
