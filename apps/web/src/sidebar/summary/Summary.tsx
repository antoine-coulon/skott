import React from "react";
import {
  Navbar,
  Box,
  List,
  Group,
  ThemeIcon,
  Text,
  ScrollArea,
  Badge,
  Flex,
  RingProgress,
  Image,
  Paper,
} from "@mantine/core";
import {
  IconRefreshAlert,
  IconExclamationMark,
  IconBrandNodejs,
} from "@tabler/icons-react";

import { isJavaScriptModule, isTypeScriptModule } from "../../util.js";
import { useEventStore } from "../../EventChannels.js";
import { SkottStructureWithCycles } from "../../skott.js";
import { convertBytesToUserFriendlyUnit } from "./file-size.js";

export function Summary() {
  const eventStore = useEventStore();
  const [summary, setSummary] = React.useState({
    totalBytes: "0",
    numberOfFiles: 0,
    cycles: new Array<string[]>(),
    typescriptFiles: new Array<string>(),
    javascriptFiles: new Array<string>(),
    builtinRegistry: new Set<string>(),
    npmRegistry: new Set<string>(),
  });

  function computeSummary(data: SkottStructureWithCycles) {
    let bytesSize = 0;
    const typescriptFiles: string[] = [];
    const javascriptFiles: string[] = [];
    const builtinRegistry = new Set<string>();
    const npmRegistry = new Set<string>();

    for (const file of data.files) {
      if (isTypeScriptModule(file)) {
        typescriptFiles.push(file);
      }

      if (isJavaScriptModule(file)) {
        javascriptFiles.push(file);
      }
    }

    for (const node of Object.values(data.graph)) {
      node.body.thirdPartyDependencies.forEach((dep) => {
        npmRegistry.add(dep);
      });
      node.body.builtinDependencies.forEach((dep) => {
        builtinRegistry.add(dep);
      });
      bytesSize += node.body.size;
    }

    console.log({ bytesSize });

    setSummary({
      numberOfFiles: data.files.length,
      cycles: data.cycles,
      typescriptFiles,
      javascriptFiles,
      builtinRegistry,
      npmRegistry,
      totalBytes: convertBytesToUserFriendlyUnit(bytesSize),
    });
  }

  React.useEffect(() => {
    const subscription = eventStore.dataStore$.subscribe(computeSummary);

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
              {summary.numberOfFiles} files
            </Badge>
          </Flex>

          <Group position="center">
            <RingProgress
              size={100}
              thickness={12}
              label={
                <Text
                  size="xs"
                  align="center"
                  px="xs"
                  sx={{ pointerEvents: "none" }}
                >
                  TS
                </Text>
              }
              sections={[
                { value: 60, color: "#2d79c8", tooltip: "TypeScript - 60%" },
                { value: 40, color: "#f0dc4e", tooltip: "JavaScript - 40%" },
              ]}
            />
          </Group>

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
              {summary.typescriptFiles.length} files
            </Badge>
          </Flex>

          <Flex p="sm" justify="space-between" align="center" direction="row">
            <Image src={"./javascript.png"} width={25} fit="contain" />
            <Badge
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              size="lg"
            >
              {summary.javascriptFiles.length} files
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
              {summary.cycles.length} cycles
            </Badge>
          </Flex>
        </Paper>

        <Paper withBorder py={5} my={10}>
          <Group position="apart" px={10}>
            <Image src={"./npm.svg"} width={40} fit="contain" />
            <Badge size="lg">{summary.npmRegistry.size}</Badge>
          </Group>

          <Box p={10}>
            <List spacing="xs" size="sm" center>
              {[...summary.npmRegistry].map((dep, index) => {
                if (index % 2 === 0) {
                  return (
                    <List.Item
                      key={dep}
                      icon={
                        <ThemeIcon color="indigo" size={25} p={5} radius="xl">
                          <Text>9+</Text>
                        </ThemeIcon>
                      }
                    >
                      {dep}
                    </List.Item>
                  );
                }

                return (
                  <List.Item
                    key={dep}
                    icon={
                      <ThemeIcon color="orange" size={25} radius="xl">
                        <IconExclamationMark size="1rem" />
                      </ThemeIcon>
                    }
                  >
                    {dep}
                  </List.Item>
                );
              })}
            </List>
          </Box>
        </Paper>

        <Paper withBorder py={5} my={10}>
          <Group position="apart" px={10}>
            <IconBrandNodejs size={25} color="green" />
            <Badge size="lg">{summary.builtinRegistry.size}</Badge>
          </Group>

          <Box p={10}>
            <List spacing="xs" size="sm" center>
              {[...summary.builtinRegistry].map((dep) => {
                return (
                  <List.Item
                    key={dep}
                    icon={
                      <ThemeIcon color="indigo" size={25} p={5} radius="xl">
                        <Text>5</Text>
                      </ThemeIcon>
                    }
                  >
                    {dep}
                  </List.Item>
                );
              })}
            </List>
          </Box>
        </Paper>
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
