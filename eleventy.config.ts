import { YETI_NODE_TYPE, yetiPlugin, type YetiRootNode, type YetiElementNode, type PartialYetiConfig, } from 'yeti-js';
import type EleventyConfig from '@11ty/eleventy/UserConfig';

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

}