import { useStoreSelect } from "@/store/react-bindings";
import * as Option from "@effect/data/Option";
import {
  ActionIcon,
  Blockquote,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Navbar,
  ScrollArea,
  Switch,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCirclePlus,
  IconHelpCircle,
  IconInfoCircle,
} from "@tabler/icons-react";

export function GroupedGraphDocumentation() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Documentation" size="xl">
        <Box m="lg">
          <Blockquote color="orange" icon={<IconInfoCircle />} mt="xl">
            A <u>grouped graph</u> can be created from the web application or
            from using the `groupBy` API configuration. This is often useful
            when you have a large graph and want to visualize it in a more
            compacted way, to improve the visualization and reduce loading time,
            without losing the ability to collect and visualize more granular
            information such as dependencies. A link to the `groupBy` API can be
            found there:{" "}
            <a
              target="_blank"
              href="https://github.com/antoine-coulon/skott/blob/36c36dfd5656b80d4f76051856543d732974cb54/packages/skott/examples/api.ts#L24"
            >
              skott's documentation
            </a>
          </Blockquote>
        </Box>
      </Modal>

      <ActionIcon
        variant="filled"
        aria-label="Settings"
        color="orange"
        onClick={open}
      >
        <IconHelpCircle stroke={1.5} />
      </ActionIcon>
    </>
  );
}

export function CustomGroupsPlayground() {
  const maybeGraph = useStoreSelect("data", "graph");

  if (Option.isNone(maybeGraph)) {
    return null;
  }

  return (
    <ScrollArea.Autosize mah="90vh" mx="auto">
      <Navbar.Section>
        <Box>
          <Flex p="sm" justify="space-between" align="center" direction="row">
            <Text size="md">Grouped Graph</Text>
            <GroupedGraphDocumentation />
          </Flex>
          <Flex p="sm" justify="center" align="center" direction="row">
            <Switch
              w="100%"
              size="md"
              checked={false}
              labelPosition="left"
              label="Visualize"
            />
            or... no grouped graph found
          </Flex>
        </Box>
        <Divider mt="lg" />
        <Box>
          <Flex p="sm" justify="space-between" align="center" direction="row">
            <Text size="md">Dynamic Groups</Text>
            <GroupedGraphDocumentation />
          </Flex>
          <Flex p="sm" justify="center" align="center" direction="row">
            <Button
              rightIcon={<IconCirclePlus stroke={1.5} />}
              variant="gradient"
            >
              Create dynamic group
            </Button>
          </Flex>
        </Box>
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
