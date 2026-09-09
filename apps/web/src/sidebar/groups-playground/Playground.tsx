import {
  isSelectorAvailable,
  useAppStore,
  useStoreSelect,
} from "@/store/react-bindings";
import { callUseCase } from "@/store/store";
import { setGranularity } from "@/core/network/set-granularity";
import * as Option from "@effect/data/Option";
import {
  ActionIcon,
  Blockquote,
  Box,
  Flex,
  Modal,
  Navbar,
  ScrollArea,
  Switch,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHelpCircle, IconInfoCircle } from "@tabler/icons-react";

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
  const state = useAppStore().getState();
  const visualizationSelector = useStoreSelect("ui", "visualization");

  if (!isSelectorAvailable(visualizationSelector)) {
    return null;
  }

  const groupedGraph = state.data.groupedGraph;
  const hasGroupedGraph =
    groupedGraph !== undefined && Object.keys(groupedGraph).length > 0;

  const granularity = visualizationSelector.value.granularity;
  const isGrouped =
    Option.isSome(granularity) && granularity.value === "group";

  function toggleGroupedGraph() {
    callUseCase(setGranularity)({
      granularity: isGrouped ? "module" : "group",
    });
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
              checked={isGrouped}
              disabled={!hasGroupedGraph}
              onChange={toggleGroupedGraph}
              labelPosition="left"
              label="Visualize"
            />
            {hasGroupedGraph ? null : "or... no grouped graph found"}
          </Flex>
        </Box>
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
