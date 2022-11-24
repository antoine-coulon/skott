/* eslint-disable max-depth */
import {
  compile as compileDom,
  TemplateChildNode,
  NodeTypes,
  ElementTypes,
  BlockStatement,
  JSChildNode
} from "@vue/compiler-dom";
import { SFCParseResult, parse, SFCDescriptor } from "@vue/compiler-sfc";

import type {
  ModuleWalker,
  ModuleWalkerConfig,
  ModuleWalkerResult
} from "../common.js";
import {
  TypeScriptModuleWalker,
  JavaScriptModuleWalker
} from "../ecmascript/index.js";

type VueSFCParseResult = SFCParseResult | SFCDescriptor;

const tagToRefAttrs: { [tagName: string]: string[] } = {
  img: ["src"]
};

function findVNodeResDeclarations(
  node: TemplateChildNode | JSChildNode | BlockStatement
): string[] {
  if (node.type === NodeTypes.ELEMENT) {
    if (node.tagType === ElementTypes.ELEMENT) {
      let attrs = tagToRefAttrs[node.tag];
      if (attrs) {
        attrs = [...attrs];

        const attrsResources = node.props
          .map((prop) => {
            if (prop.type === NodeTypes.ATTRIBUTE) {
              const foundIndexInAttrs = attrs.indexOf(prop.name);
              if (foundIndexInAttrs !== -1) {
                attrs.splice(foundIndexInAttrs, 1);

                return prop.value?.content;
              }
            }

            return undefined;
          })
          .filter((item): item is string => Boolean(item));

        const childrenResources = ([] as string[]).concat(
          ...node.children.map((child) => findVNodeResDeclarations(child))
        );

        return [...attrsResources, ...childrenResources];
      }
    }
  } else if (node.type === NodeTypes.IF) {
    return ([] as string[]).concat(
      ...node.branches.map((branch) =>
        ([] as string[]).concat(
          ...branch.children.map((child) => findVNodeResDeclarations(child))
        )
      )
    );
  } else if (node.type === NodeTypes.VNODE_CALL) {
    const { tag } = node;
    if (typeof tag === "string") {
      // unquote string;
      const unquoteTag: string = JSON.parse(tag);
      let attrs = tagToRefAttrs[unquoteTag];
      if (attrs) {
        const { props } = node;
        if (props && props.type === NodeTypes.JS_OBJECT_EXPRESSION) {
          attrs = [...attrs];
          const attrsResources = props.properties
            .map((prop) => {
              const foundIndex = attrs.indexOf(prop.key.loc.source);
              if (foundIndex !== -1) {
                attrs.splice(foundIndex, 1);

                return JSON.parse(prop.value.loc.source) as string;
              }

              return undefined;
            })
            .filter((res): res is string => Boolean(res));

          if (!node.children) {
            return attrsResources;
          }

          let childrenResources: string[] = [];
          if (Array.isArray(node.children)) {
            childrenResources = ([] as string[]).concat(
              ...node.children.map((child) => findVNodeResDeclarations(child))
            );
          } else {
            childrenResources = findVNodeResDeclarations(node.children);
          }

          return [...attrsResources, ...childrenResources];
        }
      }
    }

    return [];
  }

  return [];
}

export class VueModuleWorker implements ModuleWalker {
  public async walk(
    fileContent: string,
    config: ModuleWalkerConfig
  ): Promise<ModuleWalkerResult> {
    const moduleDeclarations: string[] = [];
    const sfcParseResult = parse(fileContent) as VueSFCParseResult;
    const sfcDescriptor =
      "descriptor" in sfcParseResult
        ? sfcParseResult.descriptor
        : sfcParseResult;
    let Walker: { new (): ModuleWalker };
    const {
      script: scriptBlock,
      template: templateBlock,
      scriptSetup: scriptSetupBlock
    } = sfcDescriptor;
    if (scriptBlock) {
      Walker =
        scriptBlock.lang === "ts"
          ? TypeScriptModuleWalker
          : JavaScriptModuleWalker;
      moduleDeclarations.push(
        ...(await new Walker().walk(scriptBlock.content, config))
          .moduleDeclarations
      );
    }
    if (scriptSetupBlock) {
      Walker =
        scriptSetupBlock.lang === "ts"
          ? TypeScriptModuleWalker
          : JavaScriptModuleWalker;
      moduleDeclarations.push(
        ...(await new Walker().walk(scriptSetupBlock.content, config))
          .moduleDeclarations
      );
    }
    Walker ??= JavaScriptModuleWalker;

    if (templateBlock) {
      // if (Walker === JavaScriptModuleWalker) {
      const compiledTemplate = compileDom(templateBlock.content);
      // TODO: Do only support javascript in template.

      moduleDeclarations.push(
        ...(
          await new JavaScriptModuleWalker().walk(compiledTemplate.code, {
            ...config,
            astParseOptions: {
              module: false,
              impliedStrict: false,
              globalReturn: true,
              ...config.astParseOptions
            }
          })
        ).moduleDeclarations,
        ...findVNodeResDeclarations(
          compiledTemplate.ast.codegenNode as TemplateChildNode
        )
      );
      // }
    }

    return {
      moduleDeclarations: new Set(moduleDeclarations)
    };
  }
}
