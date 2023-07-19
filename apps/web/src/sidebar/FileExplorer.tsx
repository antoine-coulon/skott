import {
  Navbar,
  Group,
  Tooltip,
  TextInput,
  Code,
  ThemeIcon,
  Text,
  ScrollArea,
  createStyles,
  rem,
  Checkbox,
  Title,
  Accordion,
} from "@mantine/core";
import {
  IconSearch,
  IconBrandTypescript,
  IconBrandJavascript,
} from "@tabler/icons-react";

import { fakeSkottData } from "../fake-data";
import { isJavaScriptModule, isTypeScriptModule } from "../util.js";

const data = fakeSkottData;

const useStyles = createStyles((theme) => ({
  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  collectionLink: {
    display: "block",
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export function FileExplorer() {
  const { classes } = useStyles();

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
    <Navbar.Section p="md">
      <TextInput
        placeholder="Search"
        size="xs"
        icon={<IconSearch size="0.8rem" stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>CMD + K</Code>}
        styles={{ rightSection: { pointerEvents: "none" } }}
        mb="sm"
      />

      <Accordion variant="default">
        <Accordion.Item value="js" pt="sm">
          <Accordion.Control
            icon={
              <ThemeIcon color="#f0dc4e" size={24} radius="xl">
                <IconBrandJavascript size={rem(20)} color="black" />
              </ThemeIcon>
            }
          />
          <Accordion.Panel>
            <ScrollArea.Autosize mah={250} mx="auto">
              <Group position="apart" mt="xs" mr="md">
                <Text truncate>lmao.js</Text>
                <Checkbox />
              </Group>
              <Group position="apart" mt="xs" mr="md">
                <Tooltip.Floating
                  label="src/lib/some-dir/some-folder/index.js"
                  position="top"
                >
                  <Text
                    lineClamp={1}
                    style={{
                      maxWidth: "calc(100% - 40px)",
                    }}
                  >
                    src/lib/some-dir/index.js
                  </Text>
                </Tooltip.Floating>
                <Checkbox />
              </Group>
            </ScrollArea.Autosize>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="ts">
          <Accordion.Control
            icon={<IconBrandTypescript size={rem(20)} color="#007acc" />}
          ></Accordion.Control>
          <Accordion.Panel>Content</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Navbar.Section>
  );
}
