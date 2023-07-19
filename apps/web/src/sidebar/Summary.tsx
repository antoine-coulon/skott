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

import { fakeSkottData } from "../fake-data";
import { isJavaScriptModule, isTypeScriptModule } from "../util.js";

const data = fakeSkottData;

export function Summary() {
  const builtinRegistry = new Set<string>();
  const npmRegistry = new Set<string>();
  const typescriptFiles: string[] = [];
  const javascriptFiles: string[] = [];

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
  }

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
              {data.files.length} files
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
              218 KB
            </Badge>
          </Flex>

          <Flex p="sm" justify="space-between" align="center" direction="row">
            <Image src={"./typescript.png"} width={25} fit="contain" />
            <Badge
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              size="lg"
            >
              282 files
            </Badge>
          </Flex>

          <Flex p="sm" justify="space-between" align="center" direction="row">
            <Image src={"./javascript.png"} width={25} fit="contain" />
            <Badge
              variant="gradient"
              gradient={{ from: "indigo", to: "blue" }}
              size="lg"
            >
              120 files
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
              11 cycles
            </Badge>
          </Flex>
        </Paper>

        <Paper withBorder py={5} my={10}>
          <Group position="apart" px={10}>
            <Image src={"./npm.svg"} width={40} fit="contain" />
            <Badge size="lg">{npmRegistry.size}</Badge>
          </Group>

          <Box p={10}>
            <List spacing="xs" size="sm" center>
              {[...npmRegistry].map((dep, index) => {
                if (index % 2 === 0) {
                  return (
                    <List.Item
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
            <Badge size="lg">{builtinRegistry.size}</Badge>
          </Group>

          <Box p={10}>
            <List spacing="xs" size="sm" center>
              {[...builtinRegistry].map((dep) => {
                return (
                  <List.Item
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
