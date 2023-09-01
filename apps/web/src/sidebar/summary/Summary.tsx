import React from "react";
import {
  Navbar,
  Text,
  ScrollArea,
  Badge,
  Flex,
  Image,
  Paper,
} from "@mantine/core";
import { IconRefreshAlert } from "@tabler/icons-react";

import { isJavaScriptModule, isTypeScriptModule } from "../../util";
import { SkottStructureWithCycles } from "../../skott";
import { convertBytesToUserFriendlyUnit, formatForm } from "./formatters";
import { LanguageRing } from "./LanguageRing";
import { Dependencies } from "./Dependencies";
import { useAppStore } from "../../store/react-bindings";

function safeSet(m: Map<string, string[]>, key: string, value: string) {
  if (m.has(key)) {
    const v = m.get(key);
    m.set(key, [...v!, value]);
  } else {
    m.set(key, [value]);
  }
}

export function Summary() {
  const appStore = useAppStore();
  const [summary, setSummary] = React.useState({
    totalBytes: "0",
    numberOfFiles: 0,
    cycles: new Array<string[]>(),
    files: new Map<string, string[]>(),
    builtinRegistry: new Map<string, number>(),
    npmRegistry: new Map<string, number>(),
  });

  function computeSummary(data: SkottStructureWithCycles) {
    let bytesSize = 0;
    const filesMap = new Map();
    const builtinRegistry = new Map<string, number>();
    const npmRegistry = new Map<string, number>();

    for (const file of data.files) {
      if (isTypeScriptModule(file)) {
        safeSet(filesMap, "ts", file);
      }

      if (isJavaScriptModule(file)) {
        safeSet(filesMap, "js", file);
      }
    }

    for (const node of Object.values(data.graph)) {
      node.body.thirdPartyDependencies.forEach((dep) => {
        npmRegistry.set(dep, (npmRegistry.get(dep) || 0) + 1);
      });
      node.body.builtinDependencies.forEach((dep) => {
        builtinRegistry.set(dep, (builtinRegistry.get(dep) || 0) + 1);
      });
      bytesSize += node.body.size;
    }

    setSummary({
      numberOfFiles: data.files.length,
      cycles: data.cycles,
      files: filesMap,
      builtinRegistry,
      npmRegistry,
      totalBytes: convertBytesToUserFriendlyUnit(bytesSize),
    });
  }

  function getLanguageFilesStats(type: "js" | "ts") {
    return summary.files.get(type)?.length || 0;
  }

  React.useEffect(() => {
    const subscription = appStore.dataState$.subscribe(computeSummary);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ScrollArea.Autosize mah="90vh" mx="auto">
      <Navbar.Section p="sm">
        <Paper withBorder py={5} my={10}>
          <Flex p="sm" justify="space-between" align="center" direction="row">
            <Text>Total</Text>
            <Badge
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              size="lg"
            >
              {formatForm(summary.numberOfFiles, "file")}
            </Badge>
          </Flex>

          <LanguageRing
            files={summary.files}
            numberOfFiles={summary.numberOfFiles}
          />

          <Flex p="sm" justify="space-between" align="center" direction="row">
            <Text>Files size</Text>
            <Badge
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              size="lg"
            >
              {summary.totalBytes}
            </Badge>
          </Flex>

          <Flex p="sm" justify="space-between" align="center" direction="row">
            <Image src={"./typescript.png"} width={25} fit="contain" />
            <Badge
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              size="lg"
            >
              {formatForm(getLanguageFilesStats("ts"), "file")}
            </Badge>
          </Flex>

          <Flex p="sm" justify="space-between" align="center" direction="row">
            <Image src={"./javascript.png"} width={25} fit="contain" />
            <Badge
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              size="lg"
            >
              {formatForm(getLanguageFilesStats("js"), "file")}
            </Badge>
          </Flex>

          <Flex p="sm" justify="space-between" align="center" direction="row">
            <IconRefreshAlert width={25} color="red" />
            <Badge
              variant="gradient"
              gradient={{ from: "red", to: "orange" }}
              size="lg"
              color="red"
            >
              {formatForm(summary.cycles.length, "cycle")}
            </Badge>
          </Flex>
        </Paper>

        <Dependencies
          registries={{
            npm: summary.npmRegistry,
            builtin: summary.builtinRegistry,
          }}
        />
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
