import { GroupNode } from "./GroupNode";
import { useStoreSelect } from "@/store/react-bindings";
import * as Option from "@effect/data/Option";
import {
  ActionIcon,
  Badge,
  Blockquote,
  Box,
  Flex,
  Modal,
  Navbar,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHelpCircle, IconInfoCircle } from "@tabler/icons-react";
import { DiGraph } from "digraph-js";

/**
 * Not used yet, but will be once we enable the visualization for custom
 * grouped graphs
 */
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

export function Groups() {
  const maybeGraph = useStoreSelect("data", "graph");

  if (Option.isNone(maybeGraph)) {
    return null;
  }

  const rawGraph = maybeGraph.value;
  const digraph = DiGraph.fromRaw(rawGraph);

  return (
    <ScrollArea.Autosize mah="90vh" mx="auto">
      <Navbar.Section>
        <Box p="md">
          <Paper withBorder py={5} my={10}>
            <Flex p="sm" justify="space-between" align="center" direction="row">
              <Text> Groups visualization</Text>
              <Badge
                variant="gradient"
                gradient={{ from: "indigo", to: "blue" }}
                size="lg"
              >
                {Object.keys(rawGraph).length}
              </Badge>
            </Flex>
          </Paper>
        </Box>

        <Box p="md">
          {Object.values(rawGraph).map(({ id, adjacentTo }) => {
            return (
              <GroupNode
                key={id}
                id={id}
                adjacentTo={adjacentTo}
                graph={digraph}
              />
            );
          })}
        </Box>
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
