import { YETI_NODE_TYPE, yetiPlugin, type YetiRootNode, type YetiElementNode, type PartialYetiConfig, } from 'yeti-js';
import type EleventyConfig from '@11ty/eleventy/UserConfig';
import { writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ORIGIN } from './src/constants.ts';

export default function (eleventyConfig: EleventyConfig) {
  eleventyConfig.ignores.add("**/*.html");
  eleventyConfig.ignores.add("**/*.md");

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.addPassthroughCopy({ "./src/public": "/" });

  eleventyConfig.addPlugin(yetiPlugin, {
    html: {
      deriveBundleFilePath(bundleName) {
        if (bundleName === "icons") {
          return "/icons.svg";
        }

        return `/html/${bundleName}.html`;
      },
      deriveBundleTransformConfig(bundleName, defaultConfig) {
        if (bundleName === "icons") {
          /**
           * Add custom processing for the icons bundle to extract the inner SVG content and wrap it in a single <svg><defs> element. This allows us to use <symbol> elements for each icon,
           * which can then be referenced throughout the site with <use>. The original SVG files can have their own viewBox and id attributes, which we preserve in the resulting symbols.
           */
          return {
            ...defaultConfig,
            processNodeTree: (rawRootNode: YetiRootNode) => {
              const defsElement: YetiElementNode = {
                type: YETI_NODE_TYPE.ELEMENT,
                tagName: "defs",
                attributes: {},
                children: [],
              };

              for (const childNode of rawRootNode.children) {
                if (childNode.type === YETI_NODE_TYPE.ELEMENT && childNode.tagName === "svg") {
                  const { width, height, ...passThroughAttrs } = childNode.attributes || {};

                  defsElement.children!.push({
                    type: YETI_NODE_TYPE.ELEMENT,
                    tagName: "symbol",
                    attributes: passThroughAttrs,
                    children: childNode.children,
                  });
                }
              }

              return {
                type: YETI_NODE_TYPE.ROOT,
                children: [{
                  type: YETI_NODE_TYPE.ELEMENT,
                  tagName: "svg",
                  attributes: {
                    xmlns: "http://www.w3.org/2000/svg",
                  },
                  children: [defsElement],
                }],
              };
            },
          };
        }

        return defaultConfig;
      }
    },
  } satisfies PartialYetiConfig)

  // Generate sitemap.xml from the pages 11ty built
  eleventyConfig.on(
    "eleventy.after",
    async ({
      directories,
      results,
    }: {
      directories: { output: string };
      results: {
        inputPath: string;
        outputPath: string;
        url: string;
        content: string;
      }[];
    }) => {
      const pages = await Promise.all(
        results
          // Only include HTML pages
          .filter((result) => result.outputPath.endsWith(".html"))
          .map(async (result) => {
            // The results 11ty hands us don't include the page's data, so pull the
            // optional lastmod from the page module's own config export
            const { config } = (await import(
              pathToFileURL(resolve(result.inputPath)).href
            )) as { config?: { lastmod?: string } };

            return {
              loc: new URL(result.url, ORIGIN).toString(),
              lastmod: config?.lastmod,
            };
          }),
      );

      // Sort alphabetically
      pages.sort((a, b) => a.loc.localeCompare(b.loc));

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`).join("\n")}
</urlset>
`;

      await writeFile(join(directories.output, "sitemap.xml"), sitemap);
    },
  );
}